
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for soil moisture
const data = [
  { time: '00:00', moisture: 35 },
  { time: '04:00', moisture: 32 },
  { time: '08:00', moisture: 28 },
  { time: '12:00', moisture: 25 },
  { time: '16:00', moisture: 30 },
  { time: '20:00', moisture: 34 },
  { time: '24:00', moisture: 37 },
];

const SoilMoistureChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Soil Moisture</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="moisture" 
              stroke="#4CAF50" 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SoilMoistureChart;
