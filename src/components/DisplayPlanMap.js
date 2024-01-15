// src/DirectionMap.js
import React from "react";
import {
  useLoadScript,
  GoogleMap,
  DirectionsService,
} from "@react-google-maps/api";
import { CENTER_CITY } from "../constants";
import { GOOGLE_MAP_API_KEY } from "../constants";

const DisplayPlanMap = ({ waypoints }) => {
  const mapContainerStyle = {
    height: "60vh",
    width: "40vw",
  };

  const isLoaded = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
  });

  const directionsCallback = (response) => {
    if (response !== null && response.status === "OK") {
      // Handle the directions response here
      console.log(response);
    } else {
      // Handle errors
      console.error("Error fetching directions:", response);
    }
  };

  return (
    <div>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={CENTER_CITY}
          zoom={10}
        >
          <DirectionsService
            options={{
              destination: "40.644625, -73.779703",
              origin: CENTER_CITY,
              travelMode: "DRIVING",
            }}
            callback={directionsCallback}
          />
        </GoogleMap>
      )}
    </div>
  );
};

export default DisplayPlanMap;
