import { useSelector } from "react-redux";
import { WiBarometer } from "react-icons/wi";
import { useGetCurrentWeatherQuery } from "../../services/WeatherAPI";

function Pressure() {
  //   Access to RTX Query cashed data
  const { lat, lng } = useSelector((state) => state.geolocation.geolocation);
  const { data, isSuccess } = useGetCurrentWeatherQuery({
    lat,
    lng,
  });

  function getPressureMessage(pressure) {
    switch (true) {
      case pressure <= 1000:
        return "Low pressure";
      case pressure <= 1013:
        return "Normal pressure";
      case pressure <= 1020:
        return "High pressure";
      default:
        return "Very high pressure";
    }
  }

  return (
    <>
      {isSuccess && (
        <div className="flex h-40 w-full flex-col items-stretch overflow-hidden rounded-3xl bg-white p-4 shadow-lg dark:bg-neutral-800">
          {/* TITLE */}
          <div className="flex flex-row gap-1">
            <WiBarometer className="h-5 w-5" />
            <div className="text-xs font-semibold">PRESSURE</div>
          </div>
          <div className="mt-2 h-full">
            <div className="text-2xl font-semibold">
              {data.main.pressure} hPa
            </div>
          </div>
          <div className="text-xs">
            {getPressureMessage(data.main.pressure)}
          </div>
        </div>
      )}
    </>
  );
}

export default Pressure;
