import { Polygon } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useState } from "react";
import { mapSafeLevelToColor } from "../helper/polygonHelper";

const GridPolygon = ({
  positions,
  key,
}: {
  positions: LatLngExpression[];
  key: string;
}) => {
  const [safeLevel, setSafeLevel] = useState(1);

  const showSafetyOvertlay = () => {
    // TODO show safety data, hide other safety data
  };

  return (
    <div onMouseOver={() => showSafetyOvertlay()}>
      <Polygon
        key={key}
        positions={positions}
        color={mapSafeLevelToColor(safeLevel)}
        weight={1}
      />
    </div>
  );
};
export default GridPolygon;
