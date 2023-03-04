import { MapPinIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

function Location() {
  const selectedLocation = useSelector((state) => state.search.location);

  return (
    <>
      {selectedLocation && (
        <div className="flex w-fit flex-row content-center justify-start gap-2 py-2">
          <MapPinIcon className="h-6 flex-none" />
          <div className="h-6 overflow-hidden text-ellipsis">
            {selectedLocation}
          </div>
        </div>
      )}
    </>
  );
}
export default Location;
