import { useSelector } from "react-redux";
import { MdVisibility } from "react-icons/md";
import { useGetCurrentWeatherQuery } from "../../services/WeatherAPI";

function Visibility() {
  //   Access to RTX Query cashed data
  const { lat, lng } = useSelector((state) => state.geolocation.geolocation);
  const { data, isSuccess } = useGetCurrentWeatherQuery({
    lat,
    lng,
  });

  function distanceFormating(distance) {
    if (distance >= 1000) {
      const distanceValue = distance / 1000;
      return distanceValue + " km";
    } else {
      return distance + " m";
    }
  }

  function dataProcessor(visibilityValue) {
    let visibility = visibilityValue / 1000;
    let result;
    switch (true) {
      case visibility === 10:
        result = "It's perfectly clear right now.";
        break;
      case visibility < 10:
        result = "Light haze is affecting visibility.";
        break;
      default:
        result = "Invalid visibility value";
        break;
    }
    return result;
  }

  return (
    <>
      {isSuccess && (
        <div className="flex h-40 w-full flex-col items-stretch overflow-hidden rounded-3xl bg-white p-4 shadow-lg dark:bg-neutral-800">
          {/* TITLE */}
          <div className="flex flex-row gap-1">
            <MdVisibility className="h-4 w-4" />
            <div className="text-xs font-semibold">VISIBILITY</div>
          </div>
          <div className="mt-2 h-full">
            <div className="text-2xl font-semibold">
              {distanceFormating(data.visibility)}
            </div>
          </div>
          <div className="text-xs">{dataProcessor(data.visibility)}</div>
        </div>
      )}
    </>
  );
}

export default Visibility;
