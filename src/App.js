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
				const data = await response.json();

				if (data && data.data.length > 0) {
					setSensorData(data.data[0]);
				}
			} catch (error) {
				console.error("Error fetching sensor data:", error);
			}
		};

		fetchData();
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

		const readableFormat = date.toLocaleString("id-ID", {
			day: "numeric",
			month: "long",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});

		return readableFormat;
	};

	const displayData = sensorData || {
		suhu_tanah: 0,
		temperature: 0,
		ph_tanah: 0,
		ph: 0,
		kelembapan_tanah: 0,
		moisture: 0,
		konduktivitas: 0,
		conductivity: 0,
		nitrogen: 0,
		phosphor: 0,
		phospor: 0,
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
					<div className="flex flex-col items-center">
						<Gauge
							width={gaugeSize.width}
							height={gaugeSize.height}
							value={displayData.suhu_tanah}
							valueMax={100}
							cornerRadius="50%"
							sx={{
								"& text": { fill: "white" },
								[`& .${gaugeClasses.valueText}`]: {
									fontSize: window.innerWidth <= 640 ? 30 : 40,
									fontWeight: 700,
								},
								[`& .${gaugeClasses.valueArc}`]: {
									fill: "#ff5733",
								},
							}}
						/>
						<p className="text-white font-medium text-xl sm:text-2xl text-center">
							{displayData.temperature} &deg;C
						</p>
						<p className="text-slate-300 text-base sm:text-lg font-medium text-center">
							Temperature
						</p>
					</div>

					{/* pH Gauge */}
					<div className="flex flex-col items-center">
						<Gauge
							width={gaugeSize.width}
							height={gaugeSize.height}
							value={displayData.ph_tanah}
							valueMax={14}
							cornerRadius="50%"
							sx={{
								"& text": { fill: "white" },
								[`& .${gaugeClasses.valueText}`]: {
									fontSize: window.innerWidth <= 640 ? 30 : 40,
									fontWeight: 700,
								},
								[`& .${gaugeClasses.valueArc}`]: {
									fill: "#33aaff",
								},
							}}
						/>
						<p className="text-white font-medium text-xl sm:text-2xl text-center">
							{displayData.ph}
						</p>
						<p className="text-slate-300 text-base sm:text-lg font-medium text-center">
							pH
						</p>
					</div>

					{/* Moisture Gauge */}
					<div className="flex flex-col items-center">
						<Gauge
							width={gaugeSize.width}
							height={gaugeSize.height}
							value={displayData.kelembapan_tanah}
							valueMax={100}
							cornerRadius="50%"
							sx={{
								"& text": { fill: "white" },
								[`& .${gaugeClasses.valueText}`]: {
									fontSize: window.innerWidth <= 640 ? 30 : 40,
									fontWeight: 700,
								},
								[`& .${gaugeClasses.valueArc}`]: {
									fill: "#a832a6",
								},
							}}
						/>
						<p className="text-white font-medium text-xl sm:text-2xl text-center">
							{displayData.moisture}
						</p>
						<p className="text-slate-300 text-base sm:text-lg font-medium text-center">
							Moisture
						</p>
					</div>

					{/* Conductivity Gauge */}
					<div className="flex flex-col items-center">
						<Gauge
							width={gaugeSize.width}
							height={gaugeSize.height}
							value={displayData.konduktivitas}
							valueMax={100}
							cornerRadius="50%"
							sx={{
								"& text": { fill: "white" },
								[`& .${gaugeClasses.valueText}`]: {
									fontSize: window.innerWidth <= 640 ? 30 : 40,
									fontWeight: 700,
								},
								[`& .${gaugeClasses.valueArc}`]: {
									fill: "#52b202",
								},
							}}
						/>
						<p className="text-white font-medium text-xl sm:text-2xl text-center">
							{displayData.conductivity} µS/cm
						</p>
						<p className="text-slate-300 text-base sm:text-lg font-medium text-center">
							Conductivity
						</p>
					</div>
				</div>

				{/* Additional Sensor Gauges */}
				<div className="mt-4 sm:mt-10">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-10">
						{/* Nitrogen Gauge */}
						<div className="flex flex-col items-center">
							<Gauge
								width={gaugeSize.width}
								height={gaugeSize.height}
								value={displayData.nitrogen}
								valueMax={100}
								cornerRadius="50%"
								sx={{
									"& text": { fill: "white" },
									[`& .${gaugeClasses.valueText}`]: {
										fontSize: window.innerWidth <= 640 ? 30 : 40,
										fontWeight: 700,
									},
									[`& .${gaugeClasses.valueArc}`]: {
										fill: "#ff8c00",
									},
								}}
							/>
							<p className="text-white font-medium text-xl sm:text-2xl text-center">
								{displayData.nitrogen} mg/l
							</p>
							<p className="text-slate-300 text-base sm:text-lg font-medium text-center">
								Nitrogen
							</p>
						</div>

						{/* Phosphor Gauge */}
						<div className="flex flex-col items-center">
							<Gauge
								width={gaugeSize.width}
								height={gaugeSize.height}
								value={displayData.phosphor}
								valueMax={100}
								cornerRadius="50%"
								sx={{
									"& text": { fill: "white" },
									[`& .${gaugeClasses.valueText}`]: {
										fontSize: window.innerWidth <= 640 ? 30 : 40,
										fontWeight: 700,
									},
									[`& .${gaugeClasses.valueArc}`]: {
										fill: "#ff006e",
									},
								}}
							/>
							<p className="text-white font-medium text-xl sm:text-2xl text-center">
								{displayData.phospor} mg/l
							</p>
							<p className="text-slate-300 text-base sm:text-lg font-medium text-center">
								Phosphor
							</p>
						</div>

						{/* Kalium Gauge */}
						<div className="flex flex-col items-center">
							<Gauge
								width={gaugeSize.width}
								height={gaugeSize.height}
								value={displayData.kalium}
								valueMax={100}
								cornerRadius="50%"
								sx={{
									"& text": { fill: "white" },
									[`& .${gaugeClasses.valueText}`]: {
										fontSize: window.innerWidth <= 640 ? 30 : 40,
										fontWeight: 700,
									},
									[`& .${gaugeClasses.valueArc}`]: {
										fill: "#00bfae",
									},
								}}
							/>
							<p className="text-white font-medium text-xl sm:text-2xl text-center">
								{displayData.kalium} mg/l
							</p>
							<p className="text-slate-300 text-base sm:text-lg font-medium text-center">
								Kalium
							</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default App;
