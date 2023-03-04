import { useGetCurrentWeatherQuery } from "../../services/WeatherAPI";
import { saveGeoCode } from "../../features/geolocation/geolocationSlice";

import { useDispatch } from "react-redux";
import City from "./City";
import { saveLocation } from "../../features/search/searchSlice";

function OtherCities() {
  const dispatch = useDispatch();

  const cities = [
    {
      city: "New York",
      country: "United States",
      geolocation: { lat: "40.7128", lng: "-74.0060" },
    },
    {
      city: "London",
      country: "United Kingdom",
      geolocation: { lat: "51.5074", lng: "-0.1278" },
    },
    {
      city: "Tokyo",
      country: "Japan",
      geolocation: { lat: "35.6895", lng: "139.6917" },
    },
    {
      city: "Paris",
      country: "France",
      geolocation: { lat: "48.8566", lng: "2.3522" },
    },
  ];

  const data = cities.map((city) => {
    const { data, isSuccess } = useGetCurrentWeatherQuery({
      lat: city.geolocation.lat,
      lng: city.geolocation.lng,
    });
    return { data, isSuccess };
  });

  const handleClick = (item) => {
    // Save geolocation to redux store
    dispatch(
      saveGeoCode({
        lat: item.data.coord.lat,
        lng: item.data.coord.lon,
      })
    );
    // save location to redux store
    dispatch(saveLocation(item.data.name, item.data.sys.country));

    // scroll to top of page
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-lg font-semibold">Other large cities</div>
      {data.map((item, i) => (
        <div key={i} onClick={() => handleClick(item)}>
          <City
            city={cities[i].city}
            country={cities[i].country}
            data={item.data}
          />
        </div>
      ))}
    </div>
  );
}

export default OtherCities;
