import React, { useState } from "react";
import { BASE_URL, PROXY_URL } from "../constants";
import axios from "axios";

export function GetPlaces() {
  const [places, setPlaces] = useState();
  //   const posturl =
  //     "https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Crating%2Cformatted_phone_number&place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&key=AIzaSyDcKFQbJJzSsVFHIz7ev1tXZh02TXL4wn8";

//   const posturl = `${BASE_URL}/showDefaultPlaces`;

  const opt = {
    method: "GET",
    // url: PROXY_URL + posturl,
    url: BASE_URL,
    // data: {
    //   max_num_display: 3,
    // },
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios(opt)
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

export default GetPlaces;
