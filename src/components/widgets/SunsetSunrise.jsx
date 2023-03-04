import { BsSunriseFill, BsSunsetFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useGetCurrentWeatherQuery } from "../../services/WeatherAPI";

const SunsetSunrise = () => {
  //   Access to RTX Query cashed data
  const { lat, lng } = useSelector((state) => state.geolocation.geolocation);
  const { data, isSuccess } = useGetCurrentWeatherQuery({
    lat,
    lng,
  });

  function getLocalTime(timezone, dt, boolean) {
    let utc_time = new Date(dt * 1000);
    let local_time = new Date(utc_time.getTime() + timezone * 1000);
    let local_time_format = local_time.toLocaleTimeString("en-US", {
      timeZone: "UTC",
      hour12: boolean,
      hour: "numeric",
      minute: "numeric",
    });
    return local_time_format;
  }

  const TitleFormating = (data) => {
    const sunset = getLocalTime(data.timezone, data.sys.sunset, false);
    const sunrise = getLocalTime(data.timezone, data.sys.sunrise, false);
    const currentTime = getLocalTime(data.timezone, data.dt, false);

    let result;
    if (currentTime >= sunrise && currentTime < sunset) {
      result = "DAY";
    } else {
      result = "NIGHT";
    }
    return result;
  };

  return (
    <>
      {isSuccess && (
        <div className="flex h-40 w-full flex-col items-stretch overflow-hidden rounded-3xl bg-white p-4 shadow-lg dark:bg-neutral-800">
          {/* TITLE */}
          {TitleFormating(data) === "DAY" ? (
            <div className="flex flex-row gap-1">
              <BsSunriseFill />
              <div className="text-xs font-semibold">Sunset</div>
            </div>
          ) : (
            <div className="flex flex-row gap-1">
              <BsSunsetFill />
              <div className="text-xs font-semibold">Sunrise</div>
            </div>
          )}
          {/* CONTENT */}
          <div className="mt-2 h-full">
            <div className="text-2xl font-semibold">
              {TitleFormating(data) === "DAY"
                ? // format pm and am time
                  getLocalTime(data.timezone, data.sys.sunset, true)
                : getLocalTime(data.timezone, data.sys.sunrise, true)}
            </div>
          </div>
          <div className="text-xs">
            {TitleFormating(data) === "DAY" ? (
              <div>
                Sunrise {getLocalTime(data.timezone, data.sys.sunrise, true)}
              </div>
            ) : (
              <div>
                Sunset {getLocalTime(data.timezone, data.sys.sunset, true)}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SunsetSunrise;
