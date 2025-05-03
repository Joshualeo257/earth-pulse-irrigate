
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet } from "lucide-react";

// Sample recommendation data
const recommendations = [
  { crop: "Cabbage", action: "Water in 2 days" },
  { crop: "Cactus", action: "No watering needed" },
  { crop: "Tomatoes", action: "Water tomorrow" },
  { crop: "Lettuce", action: "Water today" },
];

const IrrigationRecommendations: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Irrigation Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center p-3 rounded-md bg-white border border-gray-100"
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-6 rounded-full ${rec.action.includes('No') ? 'bg-gray-300' : 'bg-irrigation-green'}`}></div>
                <span>{rec.crop}</span>
              </div>
              <div className="flex items-center">
                {!rec.action.includes('No') && (
                  <Droplet className={`h-4 w-4 mr-1 ${rec.action.includes('today') ? 'text-irrigation-blue' : 'text-gray-400'}`} />
                )}
                <span className="text-sm">{rec.action}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default IrrigationRecommendations;
