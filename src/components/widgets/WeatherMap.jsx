import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function WeatherMap() {
  const { lat, lng } = useSelector((state) => state.geolocation.geolocation);

  const mapRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current, {
      center: [lat, lng],
      zoom: 6,
      layers: [
        L.tileLayer(
          "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        ),
      ],
    });
    map.zoomControl.remove();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();

    // add weather layer to map and apply style to it
    const precipitationLayer = L.tileLayer(
      "https://maps.openweathermap.org/maps/2.0/weather/{op}/{z}/{x}/{y}?appid={API_KEY}",
      {
        op: "PR0",
        API_KEY: "06d993a12ed23f678bfb54004bb0ad42",
        attribution: "Map data © OpenWeatherMap contributors",
      }
    );

    // add precipitation layer to map
    precipitationLayer.addTo(map);

    // clean up function
    return () => {
      // remove map when component unmounts
      map.remove();
    };
  }, [lat, lng]);

  return (
    <div className="mr-3 flex h-[47rem] w-full flex-col items-stretch gap-4 rounded-3xl dark:bg-black">
      {/* TITLE */}
      <div className="ml-2 flex flex-row gap-1">
        {/* <BsUmbrellaFill className="h-3 w-3" /> */}
        <div className="text-lg font-semibold">Precipitation map</div>
      </div>

      <div className="flex-1">
        <div
          ref={mapRef}
          className="z-0 h-full w-full rounded-3xl shadow-lg dark:hue-rotate-180 dark:invert"
        />
      </div>
    </div>
  );
}

export default WeatherMap;
