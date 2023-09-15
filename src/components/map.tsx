import styles from "./map.module.css";
import { useEffect } from "preact/hooks";

declare global {
  interface Window {
    initMapKit: typeof initMapKit;
  }
}

export function Map() {
  useEffect(() => {
    loadMap();
  }, []);

  return <div id={styles.map}></div>;
}

function loadMap() {
  window.initMapKit = initMapKit;

  const script = document.createElement("script");
  script.src = "https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.core.js";
  script.crossOrigin = "anonymous";
  script.async = true;
  script.dataset.callback = "initMapKit";
  script.dataset.libraries = "map,annotations";

  document.body.appendChild(script);
}

function initMapKit() {
  window.mapkit.init({
    authorizationCallback: async (done: (str: string) => void) => {
      const res = await fetch("/api/map/token");
      const token = await res.text();
      done(token);
    }
  });

  const map = new window.mapkit.Map(styles.map, {
    mapType: mapkit.Map.MapTypes.Hybrid,
    showsCompass: mapkit.FeatureVisibility.Hidden,
    showsZoomControl: false,
    showsMapTypeControl: false,
    showsScale: mapkit.FeatureVisibility.Hidden,
    colorScheme: mapkit.Map.ColorSchemes.Light,
    isScrollEnabled: true,
    showsPointsOfInterest: false,
    showsUserLocation: false,
    tracksUserLocation: false,
    showsUserLocationControl: false
  });

  map.cameraDistance = 3000000;
}
