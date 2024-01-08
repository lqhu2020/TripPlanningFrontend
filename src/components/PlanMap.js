import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo, useState, useEffect } from "react";
import {
  GOOGLE_MAP_API_KEY,
  CENTER_CITY,
  BASE_URL,
  PROXY_URL,
} from "../constants";

import axios from "axios";
import { message } from "antd";
import { PlaceList } from "./PlaceList";

function PlanMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
  });

  const [places, setPlaces] = useState();
  const [numPlaces, setNumPlaces] = useState(3);

  useEffect(() => {
    fetchPlaces(numPlaces);
    //renderPlaces();
  }, [numPlaces]);

  async function fetchPlaces(numPlaces) {
    const opt = {
      method: "GET",
      // url: PROXY_URL + posturl,
      url: `https://cors-anywhere.herokuapp.com/http://34.82.85.194:8080/showDefaultPlaces?max_num_display=${numPlaces}`,
      // data: {
      //   max_num_display: 3,
      // },
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios(opt)
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          setPlaces(res.data);
          console.log(places);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="Map">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={CENTER_CITY}
          zoom={10}
        >
          <Marker position={CENTER_CITY} />
        </GoogleMap>
      )}

      <PlaceList places={places} />
    </div>
  );
}

export default PlanMap;
