import React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

function App() {
	const [sensorData, setSensorData] = React.useState(null);

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					"http://localhost:1337/api/data-sensors?sort[0]=createdAt:desc&pagination[limit]=1"
				);
				const result = await response.json();

				if (result && result.data.length > 0) {
					const raw = result.data[0];
					setSensorData({
						temperature: Number(raw.temperature) || 0,
						ph: Number(raw.ph) || 0,
						moisture: Number(raw.moisture) || 0,
						conductivity: Number(raw.conductivity) || 0,
						nitrogen: Number(raw.nitrogen) || 0,
						phosphor: Number(raw.phosphor) || 0,
						kalium: Number(raw.kalium) || 0,
						createdAt: raw.createdAt || null,
					});
				}
			} catch (error) {
				console.error("Error fetching sensor data:", error);
			}
		};

		fetchData(); 
		const intervalId = setInterval(fetchData, 2000);

		return () => clearInterval(intervalId);
	}, []);

	const useGaugeSize = () => {
		const [size, setSize] = React.useState({ width: 200, height: 200 });

		React.useEffect(() => {
			const updateSize = () => {
				if (window.innerWidth <= 640) {
					setSize({ width: 150, height: 150 });
				} else {
					setSize({ width: 200, height: 200 });
				}
			};

			window.addEventListener("resize", updateSize);
			updateSize();
			return () => window.removeEventListener("resize", updateSize);
		}, []);

		return size;
	};

	const gaugeSize = useGaugeSize();

	const formatDateTime = (isoString) => {
		if (!isoString) return "Loading...";
		const date = new Date(isoString);

		return date.toLocaleString("id-ID", {
			day: "numeric",
			month: "long",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const displayData = sensorData || {
		temperature: 0,
		ph: 0,
		moisture: 0,
		conductivity: 0,
		nitrogen: 0,
		phosphor: 0,
		kalium: 0,
		createdAt: null,
	};

	const formatedDateTime = formatDateTime(displayData.createdAt);

	return (
		<main className="bg-[#232937] min-h-screen px-4 sm:px-10 py-4 sm:py-8 flex justify-center items-center">
			<div className="bg-[#282F3F] p-4 sm:p-10 rounded-xl shadow-2xl w-full max-w-7xl">
				<div className="text-center md:flex md:items-center md:justify-between">
					<p className="text-white text-2xl sm:text-4xl font-semibold mb-4 sm:mb-10">
						Sensor Values
					</p>
					<p className="text-white text-lg font-semibold mb-4 sm:mb-10">
						Data terakhir: {formatedDateTime}
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-10">
					{/* Temperature Gauge */}
					<GaugeCard
						title="Temperature"
						unit="°C"
						value={displayData.temperature}
						max={100}
						color="#ff5733"
						gaugeSize={gaugeSize}
					/>
					{/* pH Gauge */}
					<GaugeCard
						title="pH"
						unit=""
						value={displayData.ph}
						max={14}
						color="#33aaff"
						gaugeSize={gaugeSize}
					/>
					{/* Moisture Gauge */}
					<GaugeCard
						title="Moisture"
						unit="%"
						value={displayData.moisture}
						max={100}
						color="#a832a6"
						gaugeSize={gaugeSize}
					/>
					{/* Conductivity Gauge */}
					<GaugeCard
						title="Conductivity"
						unit="µS/cm"
						value={displayData.conductivity}
						max={100}
						color="#52b202"
						gaugeSize={gaugeSize}
					/>
				</div>

				{/* Additional Sensors */}
				<div className="mt-4 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-10">
					<GaugeCard
						title="Nitrogen"
						unit="mg/l"
						value={displayData.nitrogen}
						max={100}
						color="#ff8c00"
						gaugeSize={gaugeSize}
					/>
					<GaugeCard
						title="Phosphor"
						unit="mg/l"
						value={displayData.phosphor}
						max={100}
						color="#ff006e"
						gaugeSize={gaugeSize}
					/>
					<GaugeCard
						title="Kalium"
						unit="mg/l"
						value={displayData.kalium}
						max={100}
						color="#00bfae"
						gaugeSize={gaugeSize}
					/>
				</div>
			</div>
		</main>
	);
}

// Reusable gauge component
function GaugeCard({ title, unit, value, max, color, gaugeSize }) {
	return (
		<div className="flex flex-col items-center">
			<Gauge
				width={gaugeSize.width}
				height={gaugeSize.height}
				value={value}
				valueMax={max}
				cornerRadius="50%"
				sx={{
					"& text": { fill: "white" },
					[`& .${gaugeClasses.valueText}`]: {
						fontSize: window.innerWidth <= 640 ? 30 : 40,
						fontWeight: 700,
					},
					[`& .${gaugeClasses.valueArc}`]: { fill: color },
				}}
			/>
			<p className="text-white font-medium text-xl sm:text-2xl text-center">
				{value} {unit}
			</p>
			<p className="text-slate-300 text-base sm:text-lg font-medium text-center">
				{title}
			</p>
		</div>
	);
}

export default App;
