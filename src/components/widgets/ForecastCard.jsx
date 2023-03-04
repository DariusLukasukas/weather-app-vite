import { useSelector } from "react-redux";
import { useGetForecastDailyQuery } from "../../services/WeatherAPI";
import WeatherIcon from "../common/WeatherIcon";

function ForecastCard() {
  const { lat, lng } = useSelector((state) => state.geolocation.geolocation);
  const { data, isSuccess } = useGetForecastDailyQuery({
    lat,
    lng,
  });

  function convertToDate(dt) {
    let utc_time = new Date(dt * 1000);
    let local_time_Day = utc_time.toLocaleString("en-us", {
      weekday: "short",
    });
    return local_time_Day;
  }
  isSuccess && console.log(data);
  return (
    <>
      {isSuccess &&
        [data.list].map((item) =>
          item.slice(1, 11).map((forecast, i) => (
            <div
              key={i}
              className="flex w-full flex-row items-center justify-between overflow-hidden rounded-3xl px-6 shadow-lg dark:bg-neutral-800 md:h-full md:flex-col md:py-4"
            >
              <div className="font-GilroyBold w-auto text-2xl font-semibold">
                {convertToDate(forecast.dt)}
              </div>

              <div className="w-28">
                <WeatherIcon
                  iconType={forecast.weather[0].icon}
                  id={forecast.weather[0].id}
                  size="36"
                />
              </div>
              <div className="w-auto pb-1">
                <div className="flex flex-row gap-1">
                  <div className="font-KardustBold text-3xl">
                    {Math.round(forecast.temp.day)}&deg;
                  </div>
                  <div className="font-KardustBold text-3xl text-gray-400">
                    {Math.round(forecast.temp.night)}&deg;
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
    </>
  );
}
export default ForecastCard;
