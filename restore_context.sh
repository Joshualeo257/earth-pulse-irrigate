#!/bin/bash

# This script gathers a complete snapshot of the project's key files
# to fully restore the AI's context and prevent data loss.

# --- Configuration ---
OUTPUT_FILE="project_snapshot.txt"
FILES_TO_DUMP=(
    # --- Backend Configuration ---
    "backend/package.json"
    "backend/server.js"

    # --- Backend Models (The Data Structure) ---
    "backend/models/Crop.js"
    "backend/models/Irrigation.js"
    "backend/models/Sensor.js"

    # --- Backend Services (The Business Logic) ---
    "backend/services/irrigationService.js"
    "backend/services/sensorService.js"
    "backend/services/weatherService.js"  # Especially important for the restored feature

    # --- Backend Routes (The API Endpoints) ---
    "backend/routes/crops.js"
    "backend/routes/irrigation.js"
    "backend/routes/sensors.js"
    "backend/routes/weather.js"

    # --- Frontend Configuration ---
    "vite.config.ts"
    "package.json" # The root package.json for frontend dependencies

    # --- Key Frontend Components (The UI Integration Points) ---
    "src/pages/Crops.tsx"
    "src/components/dashboard/WeatherForecast.tsx"
    "src/components/dashboard/IrrigationRecommendations.tsx"
    "src/components/dashboard/SoilMoistureChart.tsx"
)
# --- End Configuration ---


# Start with a clean output file
> "$OUTPUT_FILE"

echo "Creating full project snapshot at: $OUTPUT_FILE"
echo "This will be used to restore the AI's context."
echo "------------------------------------------------"

# Loop through the array of files and append their content to the output file
for FILE in "${FILES_TO_DUMP[@]}"; do
    if [ -f "$FILE" ]; then
        echo "Appending: $FILE"
        echo "====================================================================" >> "$OUTPUT_FILE"
        echo "==== FILE: $FILE ====" >> "$OUTPUT_FILE"
        echo "====================================================================" >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
        cat "$FILE" >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
    else
        echo "Skipping: $FILE (Not Found)"
        echo "====================================================================" >> "$OUTPUT_FILE"
        echo "==== FILE: $FILE (NOT FOUND) ====" >> "$OUTPUT_FILE"
        echo "====================================================================" >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
    fi
done

echo "------------------------------------------------"
echo "✅ Snapshot created successfully!"
echo "Please copy the entire content of '$OUTPUT_FILE' and paste it in your response."