import type { SiteFeature } from "../lib/types";

interface SiteFeatureCollection {
  type: "FeatureCollection";
  features: SiteFeature[];
}

declare module "*.geojson" {
  const value: SiteFeatureCollection;
  export default value;
}

declare module "@/data/*.geojson" {
  const value: SiteFeatureCollection;
  export default value;
}
