import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import './App.css';
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const socket = io("http://localhost:5000");

function App() {
  const [stats, setStats] = useState({
    sent: 0,
    dropped: 0,
    received: 0,
    jitter_ms: 0,
    packet_loss: 0,
  });

  const [history, setHistory] = useState({
    labels: [],
    sentData: [],
    droppedData: [],
    receivedData: [],
  });

  useEffect(() => {
    socket.on("stats", (data) => {
      setStats(data);
      setHistory((prev) => {
        const newLabels = [...prev.labels, new Date().toLocaleTimeString()];
        const newSent = [...prev.sentData, data.sent];
        const newDropped = [...prev.droppedData, data.dropped];
        const newReceived = [...prev.receivedData, data.received];

        if (newLabels.length > 20) {
          newLabels.shift();
          newSent.shift();
          newDropped.shift();
          newReceived.shift();
        }

        return {
          labels: newLabels,
          sentData: newSent,
          droppedData: newDropped,
          receivedData: newReceived,
        };
      });
    });

    return () => {
      socket.off("stats");
    };
  }, []);

  const chartData = {
    labels: history.labels,
    datasets: [
      { label: "Sent Packets", data: history.sentData, borderColor: "rgba(75,192,192,1)", fill: false },
      { label: "Dropped Packets", data: history.droppedData, borderColor: "rgba(255,99,132,1)", fill: false },
      { label: "Received Packets", data: history.receivedData, borderColor: "rgba(54,162,235,1)", fill: false },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>VoIP Simulator Dashboard</h1>
      <p>Packet Loss: {(stats.packet_loss * 100).toFixed(2)}%</p>
      <p>Jitter: {stats.jitter_ms} ms</p>
      <Line data={chartData} />
    </div>
  );
}

export default App;
