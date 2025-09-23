import React from 'react';

// Dynamic color based on metric type and value
const getValueColor = (type, value) => {
  if (type === 'voltage' || type === 'current' || type === 'power') return value > 0 ? 'text-green-400' : 'text-gray-400';
  if (type === 'soc') return value > 80 ? 'text-cyan-400' : value > 50 ? 'text-sky-400' : 'text-amber-400';
  if (type === 'soh') return value > 90 ? 'text-emerald-400' : 'text-rose-400';
  if (type === 'temp' || type === 'panel_temp') return value > 60 ? 'text-red-400' : value > 45 ? 'text-orange-400' : 'text-blue-300';
  if (type === 'irradiance') return value > 800 ? 'text-yellow-300' : value > 300 ? 'text-yellow-400' : 'text-gray-400';
  return 'text-white';
};

function MetricCard({ label, value, unit, type, lang }) {
  const formattedValue = value ? value.toFixed(2) : '0.00';
  const valueColorClass = getValueColor(type, value);
  const labelColorClass = lang === 'or' ? 'text-black' : 'text-white';

  return (
    <div className={`flex flex-col items-center text-center p-8 rounded-3xl backdrop-blur-md border border-white border-opacity-20 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] bg-gradient-to-tr from-white/10 to-white/5`}>
      <h2 className={`text-lg font-medium tracking-wide ${labelColorClass} text-opacity-80 mb-2`}>{label}</h2>
      <p className={`text-5xl font-extrabold ${valueColorClass} drop-shadow-md`}>
        {formattedValue}
        <span className={`text-xl font-normal ml-2 ${labelColorClass} text-opacity-80`}>{unit}</span>
      </p>
      <div className={`mt-2 h-1 w-16 rounded-full bg-gradient-to-r ${valueColorClass} animate-pulse`}></div>
    </div>
  );
}

export default MetricCard;
