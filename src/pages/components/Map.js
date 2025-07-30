
"use client";

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpcHVsdWsiLCJhIjoiY21kOGtzbDJpMDFodzJyc2doNDh3MWk4byJ9.LtmI-dBS2zvOPigPwPw1EQ';

const Map = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [28.341816, -15.336932],
      zoom: 12,
    });

    mapRef.current = map;

    // When map is fully loaded
    map.on('load', () => {
      setMapReady(true);
    });

    return () => map.remove();
  }, []);

  // Show user location **after map is ready**
  useEffect(() => {
    if (!mapReady || !mapRef.current) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userCoords = [position.coords.longitude, position.coords.latitude];
        mapRef.current.setCenter(userCoords);

        new mapboxgl.Marker({ color: 'blue' })
          .setLngLat(userCoords)
          .setPopup(new mapboxgl.Popup().setText("You're here"))
          .addTo(mapRef.current);
      });
    }
  }, [mapReady]);

  return (
    <div
      ref={mapContainerRef}
      style={{ width: '100%', height: '100vh', border: '2px solid green' }}
    />
  );
};

export default Map;
