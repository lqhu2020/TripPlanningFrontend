/*global google*/
import React, { useEffect, useState } from "react";
import {
  useLoadScript,
  GoogleMap,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import { CENTER_CITY } from "../constants";
import { GOOGLE_MAP_API_KEY } from "../constants";
import { Button, message } from "antd";

// const google = window.google;

function DisplayPlanMap({ trip }) {
  const mapContainerStyle = {
    height: "60vh",
    width: "40vw",
  };

  // const colors = ["#1976D2", "#12afed", "24adef", "0a14ae"];

  const isLoaded = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
  });

  const onMapLoad = (map) => {
    // setMapRef(map);
    const bounds = new google.maps.LatLngBounds();
    trip?.forEach(({ latitude, longitude }) =>
      bounds.extend({ lat: latitude, lng: longitude })
    );
    map.fitBounds(bounds);
  };
  const [directions, setDirections] = useState();

  const tmpTrip = trip;
  console.log("trip length in display plan map is");
  console.log(tmpTrip.length);

  useEffect(() => {
    console.log("effect");

    if (tmpTrip.length > 1) {
      const tmp1 = tmpTrip.at(0).name;
      const tmp2 = tmpTrip.at(tmpTrip.length - 1).name;

      const alist = tmpTrip.map((p, i) => ({ location: p.name })).slice(1, -1);

      const service = new google.maps.DirectionsService();

      service.route(
        {
          origin: tmp1,
          destination: tmp2,
          waypoints: alist,
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
            message.error("hard to find a proper plan for these places !");
          }
        }
      );
    } else {
      setDirections();
    }
  }, [trip]);

  console.log("directions");
  console.log(directions);

  return (
    <div>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          // center={CENTER_CITY}
          // zoom={10}
          onLoad={onMapLoad}
        >
          {trip.length <= 1 ? (
            trip.map((p, index) => (
              <Marker
                key={index}
                position={{ lat: p.latitude, lng: p.longitude }}
              ></Marker>
            ))
          ) : (
            <DirectionsRenderer directions={directions} />
          )}
        </GoogleMap>
      )}
    </div>
  );
}

export default DisplayPlanMap;
