declare module "@/data/sites.geojson" {
  const value: import("geojson").FeatureCollection<
    import("../lib/types").SiteFeature["geometry"],
    import("../lib/types").SiteFeature["properties"]
  >;
  export default value;
}

declare module "@/data/time_series.json" {
  const value: import("../lib/types").SiteTimeSeries[];
  export default value;
}

declare module "*.geojson" {
  const value: import("geojson").FeatureCollection;
  export default value;
}
