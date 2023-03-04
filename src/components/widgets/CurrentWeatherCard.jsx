import { useSelector } from "react-redux";
import { useGetCurrentWeatherQuery } from "../../services/WeatherAPI";
import WeatherIcon from "../common/WeatherIcon";

function CurrentWeatherCard() {
  const { lat, lng } = useSelector((state) => state.geolocation.geolocation);
  const { data, isSuccess } = useGetCurrentWeatherQuery({
    lat,
    lng,
  });

  function convertToDate(timezone, dt) {
    let utc_time = new Date(dt * 1000);
    let local_time = new Date(utc_time.getTime() + timezone * 1000);
    let local_time_Day = local_time.toLocaleString("en-us", {
      timeZone: "UTC",
      weekday: "long",
    });
    return local_time_Day;
  }

  function convertToHMin(dt) {
    let time = new Date(dt * 1000).toLocaleTimeString("en-US", {
      timeZone: "UTC",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });
    return time;
  }

  function getLocalTime(timezone, dt) {
    let utc_time = new Date(dt * 1000);
    let local_time = new Date(utc_time.getTime() + timezone * 1000);
    let local_time_format = local_time.toLocaleTimeString("en-US", {
      timeZone: "UTC",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });
    return local_time_format;
  }

  isSuccess && console.log(data);
  return (
    <>
      {isSuccess &&
        [data].map((item, i) => (
          <div
            key={i}
            className="flex h-[21rem] w-[24rem] flex-col overflow-hidden rounded-3xl shadow-lg dark:bg-neutral-800"
          >
            <div className="flex flex-row justify-between bg-neutral-50 p-6 dark:bg-neutral-900">
              <div className="text-xl font-semibold">
                {convertToDate(item.timezone, item.dt)}
              </div>
              <div className="font-KardustBold text-xl">
                {getLocalTime(item.timezone, item.dt)}
              </div>
            </div>
            <div className="px-4 pb-6">
              <div className="flex flex-row items-center justify-between">
                <div className="font-KardustBold text-6xl">
                  {Math.round(item.main.temp)}&deg;
                </div>
                <div className="h-28 w-28">
                  <WeatherIcon
                    iconType={item.weather[0].icon}
                    id={item.weather[0].id}
                    size={36}
                  />
                </div>
              </div>
              <div className="mt-4 flex flex-row justify-between">
                {/* <div>{item.weather[0].description}</div>
                <div className="flex flex-row gap-1">
                  <div>H:{Math.round(item.main.temp_max)}&deg;</div>
                  <div>L:{Math.round(item.main.temp_min)}</div>
                </div> */}

                <div>
                  <div className="flex flex-row gap-1">
                    <div>Real Feel</div>
                    <div className="font-KardustBold">
                      {Math.round(item.main.feels_like)}&deg;
                    </div>
                  </div>
                  <div className="flex flex-row gap-1">
                    <div>Wind</div>
                    <div className="font-KardustBold">
                      {Math.round(item.wind.speed)} m/s
                    </div>
                  </div>

                  <div className="flex flex-row gap-1">
                    <div>Humidity</div>
                    <div className="font-KardustBold">
                      {item.main.humidity}%
                    </div>
                  </div>
                </div>
                <div className="ml-1 self-end">
                  <div className="flex flex-row gap-1">
                    <div>Sunrise</div>
                    <div className="font-KardustBold">
                      {getLocalTime(item.timezone, item.sys.sunrise)}
                    </div>
                  </div>
                  <div className="flex flex-row gap-1">
                    <div>Sunset</div>
                    <div className="font-KardustBold">
                      {getLocalTime(item.timezone, item.sys.sunset)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
export default CurrentWeatherCard;
