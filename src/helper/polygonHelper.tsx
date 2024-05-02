import { LatLngExpression } from "leaflet";
import { v4 } from "uuid";
import { Polygon } from "react-leaflet";
import { GRID_SIZE, OFFSET, RECTANGLE_SIZE } from "../constats/map";
import GridPolygon from "../component/GridPolygon";

/**
 * Creates a grid over the given center point
 * @returns Array of leaflet polygons wrapped in GridPolygon (interactable object with own state)
 */
export const generateGridOnCenter = (
  centerLat: number,
  centerLng: number,
  setLastUpdateKey: (key: string) => void
) => {
  const rectangles = [];
  const halfDistance = (GRID_SIZE / 2) * RECTANGLE_SIZE;
  const startLat = centerLat - halfDistance;
  const startLng = centerLng - halfDistance;

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let column = 0; column < GRID_SIZE; column++) {
      const rectangle = [
        [startLat + row * RECTANGLE_SIZE, startLng + column * RECTANGLE_SIZE],
        [
          startLat + (row + 1) * RECTANGLE_SIZE + OFFSET,
          startLng + column * RECTANGLE_SIZE,
        ],
        [
          startLat + (row + 1) * RECTANGLE_SIZE + OFFSET,
          startLng + (column + 1) * RECTANGLE_SIZE + OFFSET,
        ],
        [
          startLat + row * RECTANGLE_SIZE,
          startLng + (column + 1) * RECTANGLE_SIZE + OFFSET,
        ],
      ];
      rectangles.push(rectangle);
    }
  }

  return rectangles.map((coords, index) => (
    <GridPolygon
      key={v4()}
      positions={coords as LatLngExpression[]}
      setLastUpdateKey={setLastUpdateKey}
    />
  ));
};

export const mapSafeLevelToColor = (level: number): string => {
  // Define the color range
  const colors: [number, number, number][] = [
    [144, 238, 144], // Light Green
    [0, 191, 255], // Blue
    [255, 0, 0], // Red
  ];

  // Calculate the index in the color range based on the level
  const index = Math.round((level / 10) * (colors.length - 1));

  // Interpolate between adjacent colors
  const color1 = colors[Math.max(index - 1, 0)];
  const color2 = colors[Math.min(index, colors.length - 1)];
  const ratio =
    (level / 10 - (index - 1) / (colors.length - 1)) * (colors.length - 1);
  const color = colorInterpolate(color1, color2, ratio);

  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
};

// Helper function to interpolate between two colors
const colorInterpolate = (
  color1: [number, number, number],
  color2: [number, number, number],
  ratio: number
): [number, number, number] => {
  return [
    Math.round(color1[0] + (color2[0] - color1[0]) * ratio),
    Math.round(color1[1] + (color2[1] - color1[1]) * ratio),
    Math.round(color1[2] + (color2[2] - color1[2]) * ratio),
  ];
};
