/*global google*/
import React, { useState } from "react";
import {
  useLoadScript,
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { CENTER_CITY } from "../constants";
import { GOOGLE_MAP_API_KEY } from "../constants";
import { Button } from "antd";

const google = window.google;

function DisplayPlanMap() {
  const mapContainerStyle = {
    height: "60vh",
    width: "40vw",
  };

  const isLoaded = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
  });

  const [directions, setDirections] = useState();

  const waypts = [
    {
      location: "JFK Airport",
      stopover: true,
    },
    {
      location: "Radiocity Music Hall",
      stopover: true,
    },
  ];

  const fetchDirections = () => {
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: "Tenement Museum",
        destination: "Central park",
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: "DRIVING",
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
          console.log(status);
          console.log(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  return (
    <div>
      <Button onClick={fetchDirections}> Display Directions</Button>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={CENTER_CITY}
          zoom={10}
        >
          {directions && (
            <DirectionsRenderer directions={directions}></DirectionsRenderer>
          )}
        </GoogleMap>
      )}
    </div>
  );
}

export default DisplayPlanMap;
