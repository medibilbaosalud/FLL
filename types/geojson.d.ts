import type { FeatureCollection } from "geojson";

declare module "*.geojson" {
  const value: FeatureCollection;
  export default value;
}

declare module "@/data/*.geojson" {
  const value: FeatureCollection;
  export default value;
}

declare module "@/data/sites.geojson" {
  const value: FeatureCollection;
  export default value;
}
