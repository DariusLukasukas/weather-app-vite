import { useSelector } from "react-redux";
import { GiAbstract053 } from "react-icons/gi";
import { useGetCurrentAirPollutionQuery } from "../../services/WeatherAPI";

function AirPollution() {
  //   Access to RTX Query cashed data
  const { lat, lng } = useSelector((state) => state.geolocation.geolocation);
  const { data, isSuccess } = useGetCurrentAirPollutionQuery({
    lat,
    lng,
  });

  function describeAirQuality(aqi, showPrevention = false) {
    const airQualityLevels = {
      1: {
        description: "Good air quality",
        prevention: "Enjoy outdoor activities!",
      },
      2: {
        description: "Fair air quality",
        prevention:
          "Limit prolonged outdoor exertion if you are sensitive to air pollution.",
      },
      3: {
        description: "Moderate air quality",
        prevention:
          "Reduce prolonged or heavy exertion. Take more breaks, do less intense activities.",
      },
      4: {
        description: "Poor air quality",
        prevention:
          "Avoid prolonged or heavy exertion. Move activities indoors or reschedule.",
      },
      5: {
        description: "Very poor air quality",
        prevention:
          "Avoid all outdoor activities. Move activities indoors or reschedule.",
      },
    };

    if (airQualityLevels[aqi]) {
      if (showPrevention) {
        return airQualityLevels[aqi].prevention;
      } else {
        return airQualityLevels[aqi].description;
      }
    } else {
      return "Invalid AQI value";
    }
  }

  return (
    <>
      {isSuccess && (
        <div className="flex h-40 flex-col overflow-hidden rounded-3xl bg-white p-4 shadow-lg dark:bg-neutral-800">
          {/* TITLE */}
          <div className="flex flex-row gap-1">
            <GiAbstract053 className="h-4 w-4" />
            <div className="text-xs font-semibold">Air Pollution</div>
          </div>
          {/* MAIN CONTENT */}
          <div className="mt-2 flex h-full flex-col">
            <div className="text-2xl font-semibold">
              {describeAirQuality(data.list[0].main.aqi, false)}
            </div>

            {/* RANGE SLIDER */}
            <div className="">
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={data.list[0].main.aqi}
                onChange={() => {}}
                className="slider-thumb h-[10px] w-full appearance-none overflow-hidden rounded-md"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(58,110,180,1) 0%, rgba(126,212,87,1) 20%, rgba(248,212,73,1) 40%, rgba(235,77,96,1) 60%, rgba(180,96,231,1) 80%, rgba(178,34,34,1) 100%)",
                }}
              />
            </div>
          </div>
          <div className="text-xs">
            {describeAirQuality(data.list[0].main.aqi, true)}
          </div>
        </div>
      )}
    </>
  );
}

export default AirPollution;
