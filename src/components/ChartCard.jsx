import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import dayjs from 'dayjs';

function ChartCard() {
  const [data, setData] = useState([]);

  // Initialize with 20 points for smooth start
  useEffect(() => {
    const initialData = Array.from({ length: 20 }, (_, i) => ({
      timestamp: Date.now() + i * 1000,
      power: 50 + Math.sin(i / 2) * 20 + Math.random() * 5, // smooth wave + small noise
      time: dayjs(Date.now() + i * 1000).format('hh:mm:ss A'),
    }));
    setData(initialData);
  }, []);

  // Add new data every second
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const lastPower = prev.length ? prev[prev.length - 1].power : 50;
        const newPower = Math.max(
          0,
          lastPower + (Math.random() * 10 - 5) // small random change
        );
        const newPoint = {
          timestamp: Date.now(),
          power: newPower,
          time: dayjs().format('hh:mm:ss A'),
        };
        const updated = [...prev, newPoint];
        if (updated.length > 20) updated.shift(); // keep last 20 points for moving effect
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white bg-opacity-10 rounded-3xl backdrop-blur-md shadow-[0_0_30px_rgba(0,255,255,0.25)] p-8 border border-white border-opacity-20">
      <h2 className="text-2xl font-bold tracking-wide text-white mb-6">
        Power Trend (Live Stream)
      </h2>
      <div className="bg-white bg-opacity-5 rounded-2xl p-4" style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="gradientLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00C49F" stopOpacity={1}/>
                <stop offset="100%" stopColor="#00F0FF" stopOpacity={1}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#A3E6FF" opacity={0.7} />
            <YAxis stroke="#A3E6FF" opacity={0.7} domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                color: '#fff',
                backdropFilter: 'blur(5px)'
              }}
              itemStyle={{ color: '#00C49F' }}
            />
            <Line
              type="monotone"
              dataKey="power"
              stroke="url(#gradientLine)"
              strokeWidth={4}
              dot={false}
              isAnimationActive={true}
              animationDuration={1000} // smooth 1-second transition
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ChartCard;
