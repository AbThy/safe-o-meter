import { Polygon } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useContext, useEffect, useState } from "react";
import { mapSafeLevelToColor } from "../helper/polygonHelper";
import { v4 } from "uuid";
import { HOVER_COLOR } from "../constats/map";
import { PolyRefreshContext } from "./Map";

const GridPolygon = ({
  positions,
  key,
  setLastUpdateKey,
}: {
  positions: LatLngExpression[];
  key: string;
  setLastUpdateKey: (key: string) => void;
}) => {
  const [polygonKey, setPolygonKey] = useState(key);
  const [safeLevel, setSafeLevel] = useState(10);
  const [color, setColor] = useState(mapSafeLevelToColor(safeLevel));
  const lastPolyRefresher = useContext(PolyRefreshContext);

  const updatePolygon = (newId: string) => setPolygonKey(newId);

  useEffect(() => {
    const newId = v4();
    updatePolygon(newId);
    color === HOVER_COLOR && setLastUpdateKey(newId);
  }, [color]);

  useEffect(() => {
    setColor(mapSafeLevelToColor(safeLevel));
  }, [safeLevel]);

  useEffect(() => {
    if (lastPolyRefresher !== polygonKey && color === HOVER_COLOR) {
      setColor(mapSafeLevelToColor(safeLevel));
    }
  }, [lastPolyRefresher]);

  const handleMouseOver = () => {
    setColor(HOVER_COLOR);
    console.log("x");
  };

  return (
    <Polygon
      key={polygonKey}
      positions={positions}
      color={color}
      weight={1}
      fillOpacity={0.4}
      eventHandlers={{
        mouseover: (e) => handleMouseOver(),
      }}
    />
  );
};
export default GridPolygon;
