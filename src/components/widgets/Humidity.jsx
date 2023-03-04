import { useSelector } from "react-redux";
import { WiHumidity } from "react-icons/wi";
import { useGetCurrentWeatherQuery } from "../../services/WeatherAPI";

function Humidity() {
  //   Access to RTX Query cashed data
  const { lat, lng } = useSelector((state) => state.geolocation.geolocation);
  const { data, isSuccess } = useGetCurrentWeatherQuery({
    lat,
    lng,
  });

  function getHumidityMessage(humidity) {
    switch (true) {
      case humidity < 30:
        return "The air is dry.";
      case humidity < 60:
        return "The humidity is at a comfortable level.";
      default:
        return "It's very humid. It might feel uncomfortable.";
    }
  }
  return (
    <>
      {isSuccess && (
        <div className="flex h-40 w-full flex-col items-stretch overflow-hidden rounded-3xl bg-white p-4 shadow-lg dark:bg-neutral-800">
          {/* TITLE */}
          <div className="flex flex-row gap-1">
            <WiHumidity className="h-5 w-5" />
            <div className="text-xs font-semibold">HUMIDITY</div>
          </div>
          <div className="mt-2 h-full">
            <div className="text-2xl font-semibold">{data.main.humidity}%</div>
          </div>
          <div className="text-xs">
            {getHumidityMessage(data.main.humidity)}
          </div>
        </div>
      )}
    </>
  );
}

export default Humidity;
