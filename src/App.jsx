import { useLanguage } from './hooks/useLanguage';
import useMqtt from "./hooks/useMqtt";
import MetricCard from "./components/MetricCard";
import ChartCard from "./components/ChartCard";

// Simplified metric definitions (key matches locales.metrics, no unused label)
const METRIC_DEFINITIONS = [
  ["input_voltage", "V", "voltage"],
  ["input_current", "A", "current"],
  ["output_voltage", "V", "voltage"],
  ["output_current", "A", "current"],
  ["soc", "%", "soc"],
  ["soh", "%", "soh"],
  ["temperature", "°C", "temp"],
  ["irradiance", "W/m²", "irradiance"],
  ["panel_temp", "°C", "panel_temp"]
];

function App() {
  const { locales, lang, setLang } = useLanguage();
  const { metrics, chartData } = useMqtt("odisha");

  if (!locales) {
    return <div className="p-8 text-center text-white">Loading...</div>;
  }

  return (
    <div
      className="p-8 min-h-screen font-sans"
      style={{
        background: "radial-gradient(circle at 10% 20%, rgb(44, 150, 169) 0%, rgb(174, 237, 219) 90.1%)",
        backgroundAttachment: "fixed",
      }}
    >
      <header className="text-center mb-12">
        <h1 className="text-6xl font-extrabold tracking-wide drop-shadow-lg text-white">
          {locales.dashboard_title}
        </h1>
        <p className="text-xl mt-3 text-white text-opacity-80">
          {locales.dashboard_subtitle}
        </p>
        <div className="mt-4">
          <button
            onClick={() => setLang(lang === 'en' ? 'or' : 'en')}
            className="px-4 py-2 rounded-full text-'#00C49F' bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors duration-200"
          >
            {lang === 'en' ? 'Odia' : 'English'}
          </button>
        </div>
      </header>

      <main className="mx-auto">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {METRIC_DEFINITIONS.map(([metricKey, unit, type]) => (
            <MetricCard
              key={metricKey}
              label={locales.metrics[metricKey]}
              value={metrics[metricKey]}
              unit={unit}
              type={type}
              lang={lang}
            />
          ))}
        </div>

        {/* Chart */}
        <ChartCard data={chartData} />
      </main>

      <footer className="text-center text-sm mt-20 text-white text-opacity-80">
        <p className="drop-shadow">{locales.footer}</p>
      </footer>
    </div>
  );
}

export default App;
