import React, { createContext, useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { generateGridOnCenter } from "../helper/polygonHelper";
import { MAP_CENTER } from "../constats/map";
import { LatLngExpression } from "leaflet";
import { v4 } from "uuid";

export const PolyRefreshContext = createContext("");

export const Map = () => {
  const [areaGrid, setAreaGrid] = useState<any>(null);
  const [mapKey, setMapKey] = useState(v4());
  const [lastUpdateKey, setLastUpdateKey] = useState("");

  const updateMap = () => setMapKey(v4());

  useEffect(() => {
    setAreaGrid(
      generateGridOnCenter(MAP_CENTER[0], MAP_CENTER[1], setLastUpdateKey)
    );
  }, []);

  return (
    <PolyRefreshContext.Provider value={lastUpdateKey}>
      <MapContainer
        key={mapKey}
        center={MAP_CENTER as LatLngExpression}
        zoom={16}
        scrollWheelZoom={true}
        style={{ height: window.innerHeight * 0.9 }}
        minZoom={14}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {areaGrid}
      </MapContainer>
    </PolyRefreshContext.Provider>
  );
};
