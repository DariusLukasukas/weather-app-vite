import { useSelector } from "react-redux";
import { BiTime } from "react-icons/bi";
import WeatherIcon from "../common/WeatherIcon";
import { useGetHourlyForecastQuery } from "../../services/WeatherAPI";

function HourlyForecast() {
  const { lat, lng } = useSelector((state) => state.geolocation.geolocation);
  const { data, isSuccess } = useGetHourlyForecastQuery({
    lat,
    lng,
  });

  function convertToHour(dt, timezone) {
    let utc_time = new Date(dt * 1000);
    let local_time = new Date(utc_time.getTime() + timezone * 1000);
    let local_time_format = local_time
      .toLocaleTimeString("en-US", {
        timeZone: "UTC",
        hour12: false,
        hour: "numeric",
      })
      .replace("AM", "")
      .replace("PM", "");
    return local_time_format;
  }

  return (
    <>
      {isSuccess && (
        <div className="flex w-full flex-col overflow-hidden rounded-3xl bg-white p-4 shadow-lg hover:overflow-x-auto dark:bg-neutral-800 md:h-40">
          {/* TITLE */}
          <div className="flex flex-row gap-1">
            <BiTime className="h-4 w-4" />
            <div className="text-xs font-semibold">HOURLY FORECAST</div>
          </div>

          <div className="mt-2 flex h-full flex-row justify-items-center gap-4 ">
            {/* NOW */}

            {/* Hourly */}
            {data.list.slice(0, 12).map((list, i) => (
              <div key={i} className="flex flex-col justify-center text-center">
                <div className="text-md p-1 font-semibold text-neutral-400 md:text-sm">
                  {convertToHour(list.dt, data.city.timezone)}
                </div>
                <div className="h-14 w-14">
                  <WeatherIcon
                    iconType={list.weather[0].icon}
                    id={list.weather[0].id}
                    // size={36}
                  />
                </div>
                <div className="text-md p-1 font-semibold md:text-sm">
                  {Math.round(list.main.temp)}&deg;
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default HourlyForecast;
