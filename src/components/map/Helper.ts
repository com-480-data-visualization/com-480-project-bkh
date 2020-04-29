import * as turf from "@turf/turf";
import { thresholdSturges } from "d3";

function getTriangleArea(
  triangle: [turf.Position, turf.Position, turf.Position]
): number {
  const [a, b, c] = triangle;

  return 0.5 * ((b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]));
}

export function generateDistribution(
  triangles: Array<[turf.Position, turf.Position, turf.Position]>
) {
  const totalArea = triangles.reduce(
    (sum, triangle) => sum + getTriangleArea(triangle),
    0
  );
  const cumulativeDistribution = [];

  for (let i = 0; i < triangles.length; i++) {
    const lastValue: number = cumulativeDistribution[i - 1] || 0;
    const nextValue: number =
      lastValue + getTriangleArea(triangles[i]) / totalArea;
    cumulativeDistribution.push(nextValue);
  }
  // [area1, area1 + aera2, area1 + area2 + area3, ...]
  return cumulativeDistribution;
}

export function selectRandomTriangleFromDistribution(
  cumulativeDistribution: number[]
): number {
  const rnd = Math.random();
  const index = cumulativeDistribution.findIndex(v => v > rnd);

  return index;
}

function selectRandomTriangle(
  triangles: Array<[turf.Position, turf.Position, turf.Position]>
): [turf.Position, turf.Position, turf.Position] {
  const cumulativeDistribution = generateDistribution(triangles);
  const rnd = Math.random();
  const index = cumulativeDistribution.findIndex(v => v > rnd);

  return triangles[index];
}

export function calcRandomPoint(
  triangle: [turf.Position, turf.Position, turf.Position]
): [number, number] {
  let wb = Math.random();
  let wc = Math.random();

  // point will be outside of the triangle, invert weights
  if (wb + wc > 1) {
    wb = 1 - wb;
    wc = 1 - wc;
  }

  const [a, b, c] = triangle.map(coords => ({ x: coords[0], y: coords[1] }));

  const rbX = wb * (b.x - a.x);
  const rbY = wb * (b.y - a.y);
  const rcX = wc * (c.x - a.x);
  const rcY = wc * (c.y - a.y);

  const rX = rbX + rcX + a.x;
  const rY = rbY + rcY + a.y;

  return [rX, rY];
  // const center = turf.centerOfMass(turf.lineString(triangle));
  // if(center.geometry)
  //   return [center.geometry?.coordinates[0], center.geometry?.coordinates[1]];
  // return [0,0]
}
