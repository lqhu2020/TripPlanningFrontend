/* global google */
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { useMemo, useState, useEffect } from "react";
import PlaceList from "./PlaceList";
import { Grid } from "antd";
import useStyles from "../styles/PlanMapStyle.js";

import {
  GOOGLE_MAP_API_KEY,
  CENTER_CITY,
  BASE_URL,
  PROXY_URL,
  PLACES,
} from "../constants";

import axios from "axios";
import { message } from "antd";

function PlanMap({ placeArr, setPlaceClicked }) {
  const classes = useStyles();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
  });

  // const [places, setPlaces] = useState();
  const [numPlaces, setNumPlaces] = useState(3);
  const places = { ...PLACES };

  // useEffect(() => {
  //   fetchPlaces(numPlaces);
  //   //renderPlaces();
  // }, [numPlaces]);

  // async function fetchPlaces(numPlaces) {
  //   const opt = {
  //     method: "GET",
  //     // url: PROXY_URL + posturl,
  //     url: BASE_URL,
  //     // data: {
  //     //   max_num_display: 3,
  //     // },
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   await axios(opt)
  //     .then((res) => {
  //       console.log(res.status);
  //       if (res.status === 200) {
  //         setPlaces(res.data);
  //         console.log(places);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  const [mapRef, setMapRef] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();

  const onMapLoad = (map) => {
    setMapRef(map);
    const bounds = new google.maps.LatLngBounds();
    placeArr?.forEach(({ latitude, longitude }) =>
      bounds.extend({ lat: latitude, lng: longitude })
    );
    map.fitBounds(bounds);
  };

  const handleMarkerClick = (index, id, name, lat, lng, address) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ index, id, name, address });
    setIsOpen(true);
  };

  return (
    <div className="Map">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          // center={CENTER_CITY}
          // zoom={10}
          onLoad={onMapLoad}
          onClick={() => setIsOpen(false)}
        >
          {placeArr.map((p, index) => (
            <Marker
              key={p.id}
              position={{ lat: p.latitude, lng: p.longitude }}
              onClick={() => {
                handleMarkerClick(
                  index,
                  p.id,
                  p.name,
                  p.latitude,
                  p.longitude,
                  p.address
                );
                setPlaceClicked(index);
              }}
            >
              {isOpen && infoWindowData?.index === index && (
                <InfoWindow
                  onCloseClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <h3>{infoWindowData.name}</h3>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      )}
    </div>
  );
}

export default PlanMap;
