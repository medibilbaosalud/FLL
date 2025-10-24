import type { FeatureCollection } from "geojson";
import type { SiteTimeSeries } from "./lib/types";

declare module "@/data/sites.geojson" {
  const value: FeatureCollection;
  export default value;
}

declare module "@/data/time_series.json" {
  const value: SiteTimeSeries[];
  export default value;
}

declare module "*.geojson" {
  const value: FeatureCollection;
  export default value;
}
