import { useState, useEffect } from "react";
import mqtt from "mqtt"; // ✅ default import works in Vite/browser

const brokerUrl = "wss://broker.hivemq.com:8000/mqtt"; // WebSocket URL
const options = { clientId: `mqttjs_${Math.random().toString(16).substr(2, 8)}` };

const getRandomValue = (base, noise) => Math.random() * noise - noise / 2 + base;

const useMqtt = (topic) => {
  const [metrics, setMetrics] = useState({
    input_voltage: 0,
    input_current: 0,
    output_voltage: 0,
    output_current: 0,
    soc: 0,
    soh: 0,
    temperature: 0,
    irradiance: 0,
    panel_temp: 0,
  });

  useEffect(() => {
    let client;
    let interval;

    try {
      client = mqtt.connect(brokerUrl, options);

      client.on("connect", () => {
        console.log("Connected to MQTT broker");
        client.subscribe(topic);
      });

      client.on("message", (_, msg) => {
        const data = JSON.parse(msg.toString());
        setMetrics(data);
      });

      // Fallback simulated data
      interval = setInterval(() => {
        setMetrics({
          input_voltage: getRandomValue(230, 5),
          input_current: getRandomValue(10, 0.5),
          output_voltage: getRandomValue(230, 5),
          output_current: getRandomValue(10, 0.5),
          soc: getRandomValue(80, 5),
          soh: getRandomValue(98, 1),
          temperature: getRandomValue(25, 5),
          irradiance: getRandomValue(500, 300),
          panel_temp: getRandomValue(40, 10),
        });
      }, 2000);
    } catch (err) {
      console.warn("MQTT failed, using simulation only", err);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (client) client.end();
    };
  }, [topic]);

  return { metrics };
};

export default useMqtt;
