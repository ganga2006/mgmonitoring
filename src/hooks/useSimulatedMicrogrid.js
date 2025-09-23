import { useState, useEffect, useRef } from "react";

const getRandomValue = (base, noise) => Math.random() * noise - noise / 2 + base;
const getSinusoidalValue = (timeInHours, amplitude, phaseShift = 0) => {
  const period = 24;
  const angle = ((timeInHours - phaseShift) / period) * 2 * Math.PI;
  return Math.max(0, Math.sin(angle) * amplitude);
};

const generateInitialData = () => {
  const data = [];
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);

  for (let i = 0; i < 1440; i++) {
    const hours = i / 60;
    const timestamp = new Date(startOfDay.getTime() + i * 60 * 1000);
    data.push({
      timestamp: timestamp.getTime(),
      input_voltage: getRandomValue(230, 5),
      input_current: getRandomValue(10, 1),
      output_voltage: getRandomValue(230, 5),
      output_current: getRandomValue(10, 1),
      soc: getRandomValue(80, 5),
      soh: getRandomValue(98, 1),
      temperature: getRandomValue(25, 5),
      irradiance: getSinusoidalValue(hours, 1000, 6),
      panel_temp: getSinusoidalValue(hours, 50, 6) + 20,
      power: getRandomValue(2000, 500),
    });
  }

  return data;
};

const useSimulatedMicrogrid = () => {
  const [metrics, setMetrics] = useState(generateInitialData()[0]);
  const [chartData, setChartData] = useState(generateInitialData());
  const chartRef = useRef(chartData); // Keep a stable reference

  useEffect(() => {
    chartRef.current = chartData;
  }, [chartData]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeInHours = now.getHours() + now.getMinutes() / 60;

      const newMetrics = {
        input_voltage: getRandomValue(230, 3),
        input_current: getRandomValue(10, 0.5),
        output_voltage: getRandomValue(230, 3),
        output_current: getRandomValue(10, 0.5),
        soc: Math.max(0, Math.min(100, (metrics.soc || 80) + getRandomValue(0, 0.3))),
        soh: Math.max(0, Math.min(100, (metrics.soh || 98) + getRandomValue(0, 0.01))),
        temperature: getSinusoidalValue(timeInHours, 10, 6) + 25 + getRandomValue(0, 2),
        irradiance: getSinusoidalValue(timeInHours, 1000, 6) + getRandomValue(0, 50),
        panel_temp: getSinusoidalValue(timeInHours, 50, 6) + 20 + getRandomValue(0, 3),
        power: getRandomValue(2000, 500),
        timestamp: now.getTime(),
      };

      setMetrics(newMetrics);

      // Update chartData safely
      setChartData(prevData => {
        const updated = [...prevData, newMetrics];
        return updated.slice(-1440); // Keep last 1440 points
      });

    }, 2000);

    return () => clearInterval(interval);
  }, [metrics]); // Only depends on metrics

  return { metrics, chartData };
};

export default useSimulatedMicrogrid;
