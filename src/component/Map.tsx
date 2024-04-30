import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { generateGridOnCenter } from "../helper/polygonHelper";
import { MAP_CENTER } from "../constats/map";
import { LatLngExpression } from "leaflet";

export const Map = () => {
  const [areaGrid, setAreaGrid] = useState<any>(null);

  useEffect(() => {
    setAreaGrid(generateGridOnCenter(MAP_CENTER[0], MAP_CENTER[1]));
  }, []);

  return (
    <MapContainer
      center={MAP_CENTER as LatLngExpression}
      zoom={16}
      scrollWheelZoom={false}
      style={{ height: window.innerHeight * 0.9 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {areaGrid}
    </MapContainer>
  );
};
