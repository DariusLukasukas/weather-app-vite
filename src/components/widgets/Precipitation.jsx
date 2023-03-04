import { useSelector } from "react-redux";
import { IoWaterSharp } from "react-icons/io5";
import { useGetCurrentWeatherQuery } from "../../services/WeatherAPI";

function Precipitation() {
  //   Access to RTX Query cashed data
  const { lat, lng } = useSelector((state) => state.geolocation.geolocation);
  const { data, isSuccess } = useGetCurrentWeatherQuery({
    lat,
    lng,
  });

  return (
    <>
      {isSuccess && (
        <div className="flex h-40 w-full flex-col items-stretch overflow-hidden rounded-3xl bg-white p-4 shadow-lg dark:bg-neutral-800">
          {/* TITLE */}
          <div className="flex flex-row gap-1">
            <IoWaterSharp className="h-4 w-4" />
            <div className="text-xs font-semibold">PRECIPITATION</div>
          </div>
          {/* CONTENT */}
          <div className="mt-3 h-full">
            <div className="text-2xl font-semibold">
              {data.rain ? data.rain["3h"] : data.snow ? data.snow["3h"] : 0} mm
            </div>
            <div className="font-semibold">in last 3 hours</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Precipitation;
