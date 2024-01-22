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
import { Button } from "antd";

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

  const [directions, setDirections] = useState();
  const [waypts, setWaypts] = useState([]);
  const [startPlace, setStartPlace] = useState();
  const [endPlace, setEndPlace] = useState();
  const [tmpTrip, setTmpTrip] = useState(trip);

  console.log("trip length in display plan map is");
  console.log(tmpTrip.length);

  useEffect(() => {
    setTmpTrip(trip);

    console.log("effect");
    // console.log(typeof trip[0].name);
    const tmp1 = tmpTrip.at(0).name;
    const tmp2 = tmpTrip.at(tmpTrip.length - 1).name;
    setStartPlace(tmp1);
    setEndPlace(tmp2);

    console.log(startPlace);
    console.log(endPlace);

    if (tmpTrip.length >= 3) {
      // const tmp = tmpTrip.slice(1, -1);

      const alist = tmpTrip.map((p, i) => ({ location: p.name })).slice(1, -1);
      setWaypts(alist);
    } else {
      setWaypts([]);
    }

    console.log("waypts");
    console.log(waypts);

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: startPlace,
        destination: endPlace,
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
  }, [trip]);

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
          {trip.length <= 1
            ? trip.map((p, index) => (
                <Marker
                  position={{ lat: p.latitude, lng: p.longitude }}
                ></Marker>
              ))
            : directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      )}
    </div>
  );
}

export default DisplayPlanMap;
