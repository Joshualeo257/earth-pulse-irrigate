
import React from "react";
import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, Calendar, CircleChevronUp, CircleChevronDown } from "lucide-react";

// Sample crop data
const crops = [
  {
    id: 1,
    name: "Cabbage",
    stage: "Growing",
    waterNeeds: "Medium",
    plantedDate: "Mar 15, 2025",
    nextWatering: "May 5, 2025",
    image: "/public/lovable-uploads/b0735f91-ec63-408c-b911-5429c80a4acc.png",
    expanded: true
  },
  {
    id: 2,
    name: "Tomatoes",
    stage: "Seedling",
    waterNeeds: "High",
    plantedDate: "Apr 1, 2025",
    nextWatering: "May 3, 2025",
    image: "/public/lovable-uploads/b0735f91-ec63-408c-b911-5429c80a4acc.png",
    expanded: false
  },
  {
    id: 3,
    name: "Cactus",
    stage: "Mature",
    waterNeeds: "Low",
    plantedDate: "Jan 10, 2025",
    nextWatering: "May 15, 2025",
    image: "/public/lovable-uploads/b0735f91-ec63-408c-b911-5429c80a4acc.png",
    expanded: false
  },
  {
    id: 4,
    name: "Lettuce",
    stage: "Harvesting",
    waterNeeds: "Medium-High",
    plantedDate: "Feb 20, 2025",
    nextWatering: "May 4, 2025",
    image: "/public/lovable-uploads/b0735f91-ec63-408c-b911-5429c80a4acc.png",
    expanded: false
  }
];

const CropCard = ({ crop }) => {
  const [isExpanded, setIsExpanded] = React.useState(crop.expanded);

  const getWaterNeedsColor = (needs) => {
    switch(needs) {
      case "Low": return "bg-green-100 text-green-800";
      case "Medium": return "bg-blue-100 text-blue-800";
      case "Medium-High": return "bg-indigo-100 text-indigo-800";
      case "High": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStageColor = (stage) => {
    switch(stage) {
      case "Seedling": return "bg-green-100 text-green-800";
      case "Growing": return "bg-blue-100 text-blue-800";
      case "Mature": return "bg-amber-100 text-amber-800";
      case "Harvesting": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center">
          <div className="mr-3 w-12 h-12 rounded-full bg-irrigation-green flex items-center justify-center text-white text-lg font-bold">
            {crop.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-medium text-lg">{crop.name}</h3>
            <div className="flex gap-2">
              <span className={`text-xs px-2 py-1 rounded-full ${getStageColor(crop.stage)}`}>
                {crop.stage}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${getWaterNeedsColor(crop.waterNeeds)}`}>
                {crop.waterNeeds} Water
              </span>
            </div>
          </div>
        </div>
        {isExpanded ? 
          <CircleChevronUp className="text-gray-400" /> : 
          <CircleChevronDown className="text-gray-400" />
        }
      </div>
      
      {isExpanded && (
        <CardContent className="border-t pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm text-gray-500">Planted Date</h4>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-irrigation-green mr-2" />
                  <span>{crop.plantedDate}</span>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm text-gray-500">Next Watering</h4>
                <div className="flex items-center">
                  <Droplet className="h-4 w-4 text-irrigation-blue mr-2" />
                  <span>{crop.nextWatering}</span>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm text-gray-500">Irrigation Schedule</h4>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`h-3 w-3 rounded-full ${crop.nextWatering.includes("May 3") || crop.nextWatering.includes("May 4") ? "bg-irrigation-blue" : "bg-gray-200"}`}></div>
                  <div className={`h-3 w-3 rounded-full ${crop.nextWatering.includes("May 5") ? "bg-irrigation-blue" : "bg-gray-200"}`}></div>
                  <div className="h-3 w-3 rounded-full bg-gray-200"></div>
                  <div className="h-3 w-3 rounded-full bg-gray-200"></div>
                  <div className={`h-3 w-3 rounded-full ${crop.nextWatering.includes("May 15") ? "bg-irrigation-blue" : "bg-gray-200"}`}></div>
                  <div className="h-3 w-3 rounded-full bg-gray-200"></div>
                  <div className="h-3 w-3 rounded-full bg-gray-200"></div>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="bg-white">
                  Edit Crop
                </Button>
                <Button size="sm" className="bg-irrigation-green hover:bg-irrigation-green/90">
                  Water Now
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-md p-4 flex items-center justify-center">
              <div className="text-center">
                <h4 className="font-medium mb-1">Water Requirements</h4>
                <div className="flex justify-center">
                  {Array(crop.waterNeeds === "Low" ? 1 : crop.waterNeeds === "Medium" ? 2 : crop.waterNeeds === "Medium-High" ? 3 : 4).fill(0).map((_, i) => (
                    <Droplet key={i} className="h-5 w-5 text-irrigation-blue" />
                  ))}
                  {Array(4 - (crop.waterNeeds === "Low" ? 1 : crop.waterNeeds === "Medium" ? 2 : crop.waterNeeds === "Medium-High" ? 3 : 4)).fill(0).map((_, i) => (
                    <Droplet key={i} className="h-5 w-5 text-gray-300" />
                  ))}
                </div>
                <p className="text-sm mt-2">
                  {crop.waterNeeds === "Low" ? "Minimal water needed, drought-resistant" :
                   crop.waterNeeds === "Medium" ? "Regular watering required" :
                   crop.waterNeeds === "Medium-High" ? "Needs consistent moisture" :
                   "High water demands, keep soil moist"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

const Crops = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 hidden md:block">
          <Sidebar />
        </aside>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Crops</h1>
                <p className="text-gray-600">Manage your crops and irrigation settings</p>
              </div>
              <Button className="bg-irrigation-green hover:bg-irrigation-green/90">
                Add New Crop
              </Button>
            </div>
            
            <div className="space-y-6">
              {crops.map((crop) => (
                <CropCard key={crop.id} crop={crop} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Crops;
