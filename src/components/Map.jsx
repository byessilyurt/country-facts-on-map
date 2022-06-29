import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import styles from "./styles.module.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const secondsPerRevolution = 80;
const maxSpinZoom = 5;
const slowSpinZoom = 3;
let userInteracting = false;
let spinEnabled = true;

function spinGlobe(map) {
  const zoom = map.current.getZoom();
  if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
    let distancePerSecond = 360 / secondsPerRevolution;
    if (zoom > slowSpinZoom) {
      // Slow spinning at higher zooms
      const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
      distancePerSecond *= zoomDif;
    }
    const center = map.current.getCenter();
    center.lng -= distancePerSecond;
    map.current.easeTo({ center, duration: 1000, easing: (n) => n });
  }
}

const MapBox = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(34);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.6);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      projection: "globe",
      style: "mapbox://styles/mapbox/satellite-streets-v11",
      center: [lng, lat],
      zoom: zoom,
      layer: "none",
    });
    map.current.on("mousedown", () => {
      userInteracting = true;
    });
    map.current.on("mouseup", () => {
      userInteracting = false;
      spinGlobe(map);
    });
    map.current.on("dragend", () => {
      userInteracting = false;
      spinGlobe(map);
    });
    map.current.on("pitchend", () => {
      userInteracting = false;
      spinGlobe(map);
    });
    map.current.on("rotateend", () => {
      userInteracting = false;
      spinGlobe(map);
    });

    map.current.on("moveend", () => {
      spinGlobe(map);
    });
  });

  return (
    <>
      <div ref={mapContainer} className={styles.mapContainer} />
    </>
  );
};

export default MapBox;
