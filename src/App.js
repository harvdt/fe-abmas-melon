import React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

function App() {
	const [sensorData, setSensorData] = React.useState(null);

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://188.166.184.17:3000/sensor-data/");
				const data = await response.json();

				if (data && data.data.length > 0) {
					const latestData = data.data.sort(
						(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
					)[0];
					setSensorData(latestData);
				}
			} catch (error) {
				console.error("Error fetching sensor data:", error);
			}
		};

		fetchData();
	}, []);

	if (!sensorData) {
		return (
			<div className="bg-[#232937] h-screen px-10 py-8 flex justify-center items-center text-5xl text-white font-bold">
				Loading...
			</div>
		);
	}

	return (
		<main className="bg-[#232937] h-screen px-10 py-8 flex justify-center items-center">
			<div className="bg-[#282F3F] p-10 rounded-xl shadow-2xl">
				<p className="text-white text-4xl text-center font-semibold">
					Sensor Values
				</p>

				<div className="grid grid-cols-4 gap-10 my-10 justify-center justify-items-center">
					{sensorData && (
						<>
							{/* Temperature Gauge */}
							<div>
								<Gauge
									width={200}
									height={200}
									value={sensorData.temperature}
									valueMax={100}
									cornerRadius="50%"
									sx={{
										"& text": { fill: "white" },
										[`& .${gaugeClasses.valueText}`]: {
											fontSize: 40,
											fontWeight: 700,
										},
										[`& .${gaugeClasses.valueArc}`]: {
											fill: "#ff5733",
										},
									}}
								/>
								<p className="text-white font-medium text-2xl text-center">
									{sensorData.temperature} &deg;C
								</p>
								<p className="text-slate-300 text-lg font-medium text-center">
									Temperature
								</p>
							</div>

							{/* pH Gauge */}
							<div>
								<Gauge
									width={200}
									height={200}
									value={sensorData.ph}
									valueMax={14}
									cornerRadius="50%"
									sx={{
										"& text": { fill: "white" },
										[`& .${gaugeClasses.valueText}`]: {
											fontSize: 40,
											fontWeight: 700,
										},
										[`& .${gaugeClasses.valueArc}`]: {
											fill: "#33aaff",
										},
									}}
								/>
								<p className="text-white font-medium text-2xl text-center">
									{sensorData.ph}
								</p>
								<p className="text-slate-300 text-lg font-medium text-center">
									pH
								</p>
							</div>

							{/* Moisture Gauge */}
							<div>
								<Gauge
									width={200}
									height={200}
									value={sensorData.moisture}
									valueMax={100}
									cornerRadius="50%"
									sx={{
										"& text": { fill: "white" },
										[`& .${gaugeClasses.valueText}`]: {
											fontSize: 40,
											fontWeight: 700,
										},
										[`& .${gaugeClasses.valueArc}`]: {
											fill: "#a832a6",
										},
									}}
								/>
								<p className="text-white font-medium text-2xl text-center">
									{sensorData.moisture}
								</p>
								<p className="text-slate-300 text-lg font-medium text-center">
									Moisture
								</p>
							</div>

							{/* Conductivity Gauge */}
							<div>
								<Gauge
									width={200}
									height={200}
									value={sensorData.conductivity}
									valueMax={100}
									cornerRadius="50%"
									sx={{
										"& text": { fill: "white" },
										[`& .${gaugeClasses.valueText}`]: {
											fontSize: 40,
											fontWeight: 700,
										},
										[`& .${gaugeClasses.valueArc}`]: {
											fill: "#52b202",
										},
									}}
								/>
								<p className="text-white font-medium text-2xl text-center">
									{sensorData.conductivity} µS/cm
								</p>
								<p className="text-slate-300 text-lg font-medium text-center">
									Conductivity
								</p>
							</div>

							{/* Additional Sensor Gauges */}
							<div className="col-span-4 flex justify-center gap-10">
								{/* Nitrogen Gauge */}
								<div>
									<Gauge
										width={200}
										height={200}
										value={sensorData.nitrogen}
										valueMax={100}
										cornerRadius="50%"
										sx={{
											"& text": { fill: "white" },
											[`& .${gaugeClasses.valueText}`]: {
												fontSize: 40,
												fontWeight: 700,
											},
											[`& .${gaugeClasses.valueArc}`]: {
												fill: "#ff8c00",
											},
										}}
									/>
									<p className="text-white font-medium text-2xl text-center">
										{sensorData.nitrogen} mg/l
									</p>
									<p className="text-slate-300 text-lg font-medium text-center">
										Nitrogen
									</p>
								</div>

								{/* Phosphor Gauge */}
								<div>
									<Gauge
										width={200}
										height={200}
										value={sensorData.phospor}
										valueMax={100}
										cornerRadius="50%"
										sx={{
											"& text": { fill: "white" },
											[`& .${gaugeClasses.valueText}`]: {
												fontSize: 40,
												fontWeight: 700,
											},
											[`& .${gaugeClasses.valueArc}`]: {
												fill: "#ff006e",
											},
										}}
									/>
									<p className="text-white font-medium text-2xl text-center">
										{sensorData.phospor} mg/l
									</p>
									<p className="text-slate-300 text-lg font-medium text-center">
										Phosphor
									</p>
								</div>

								{/* Kalium Gauge */}
								<div>
									<Gauge
										width={200}
										height={200}
										value={sensorData.kalium}
										valueMax={100}
										cornerRadius="50%"
										sx={{
											"& text": { fill: "white" },
											[`& .${gaugeClasses.valueText}`]: {
												fontSize: 40,
												fontWeight: 700,
											},
											[`& .${gaugeClasses.valueArc}`]: {
												fill: "#00bfae",
											},
										}}
									/>
									<p className="text-white font-medium text-2xl text-center">
										{sensorData.kalium} mg/l
									</p>
									<p className="text-slate-300 text-lg font-medium text-center">
										Kalium
									</p>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</main>
	);
}

export default App;
