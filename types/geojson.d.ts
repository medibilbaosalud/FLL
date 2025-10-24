import type { SiteFeature } from "@/lib/types";

declare module "*.geojson" {
  export interface SiteFeatureCollection {
    type: "FeatureCollection";
    features: SiteFeature[];
  }

  const value: SiteFeatureCollection;
  export default value;
}
