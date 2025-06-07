import React, { useState, useEffect } from "react"; // Import the hooks
import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, Calendar, CircleChevronUp, CircleChevronDown, Sprout, LoaderCircle, AlertTriangle } from "lucide-react";
import { AddNewCropDialog } from "@/components/crops/AddNewCropDialog";
// --- Best Practice: Define a TypeScript type for your data ---
// This should match the structure of the data coming from your backend API.
// Note: In your Mongoose model, the ID is `_id`.
type CropType = {
  _id: string; // MongoDB uses _id
  name: string;
  stage: 'Seedling' | 'Growing' | 'Mature' | 'Harvesting';
  waterNeeds: 'Low' | 'Medium' | 'Medium-High' | 'High';
  plantedDate: string; // Dates from an API are typically strings
  nextWatering: string;
};

// --- The Reusable CropCard component ---
// We've updated it to accept the new CropType and format the dates properly.
const CropCard = ({ crop }: { crop: CropType }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Helper function to format date strings (e.g., "2025-05-15T00:00:00.000Z") into a readable format.
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getWaterNeedsColor = (needs: string) => {
    // ... (this function remains the same as your original)
    switch(needs) {
      case "Low": return "bg-green-100 text-green-800";
      case "Medium": return "bg-blue-100 text-blue-800";
      case "Medium-High": return "bg-indigo-100 text-indigo-800";
      case "High": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStageColor = (stage: string) => {
    // ... (this function remains the same as your original)
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
                  <Sprout className="h-4 w-4 text-irrigation-green mr-2" />
                  <span>{formatDate(crop.plantedDate)}</span>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm text-gray-500">Next Watering</h4>
                <div className="flex items-center">
                  <Droplet className="h-4 w-4 text-irrigation-blue mr-2" />
                  <span>{formatDate(crop.nextWatering)}</span>
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
              {/* This section remains the same */}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};


// --- The Main Crops Page Component ---
const Crops = () => {
  // --- STATE MANAGEMENT ---
  // State for storing the list of crops from the backend
  const [crops, setCrops] = useState<CropType[]>([]);
  // State to handle loading UI
  const [loading, setLoading] = useState<boolean>(true);
  // State to handle potential errors during fetch
  const [error, setError] = useState<string | null>(null);

  // --- DATA FETCHING ---
  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        // The Vite proxy will forward this request to http://localhost:5001/api/crops
        const response = await fetch("/api/crops");
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          setCrops(data.data); // Update state with the fetched crop data
        } else {
          throw new Error(data.message || "Failed to fetch crops.");
        }
      } catch (err: any) {
        setError(err.message); // Set error state if fetch fails
      } finally {
        setLoading(false); // Set loading to false in both success and error cases
      }
    };

    fetchCrops();
  }, []); // The empty dependency array [] ensures this effect runs only once


  // --- CALLBACK FUNCTION ---
  // This function will be passed to the dialog.
  // It updates the state with the newly added crop without a page reload.
  const handleCropAdded = (newCrop: CropType) => {
    setCrops((prevCrops) => [newCrop, ...prevCrops]);
  };

  // --- CONDITIONAL RENDERING ---
  // A helper function to render content based on loading/error state
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <LoaderCircle className="animate-spin h-8 w-8 text-irrigation-green" />
          <p className="ml-4 text-gray-600">Loading your crops...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center h-64 bg-red-50 border border-red-200 rounded-lg">
          <AlertTriangle className="h-8 w-8 text-red-500" />
          <p className="ml-4 text-red-700">Error: {error}</p>
        </div>
      );
    }
    
    if (crops.length === 0) {
        return (
            <div className="text-center h-64 flex flex-col justify-center items-center bg-gray-100 rounded-lg">
                <Sprout className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700">No Crops Found</h3>
                <p className="text-gray-500 mt-1">Get started by adding your first crop!</p>
            </div>
        );
    }

    return (
      <div className="space-y-6">
        {crops.map((crop) => (
          // Use the `_id` from MongoDB as the unique key
          <CropCard key={crop._id} crop={crop} />
        ))}
      </div>
    );
  };

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
              
              {/* --- Use the new dialog component --- */}
              <AddNewCropDialog onCropAdded={handleCropAdded} />

            </div>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Crops;