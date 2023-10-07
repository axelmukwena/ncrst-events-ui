import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import React, { FC } from "react";

import { GOOGLE_MAPS_API_KEY } from "@/utilities/constants";

const containerStyle = {
  width: "70vw",
  height: "50vh",
  borderRadius: "10px",
};

interface GoogleMapsProps {
  lat: number;
  lng: number;
}

const GoogleMaps: FC<GoogleMapsProps> = ({ lat, lng }) => {
  console.log("MapComponent");
  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat, lng }}
        zoom={15}
      >
        <MarkerF position={{ lat, lng }} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMaps;
