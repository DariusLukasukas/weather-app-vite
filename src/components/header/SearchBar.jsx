import { useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import {
  saveLocation,
  updateSearchValue,
} from "../../features/search/searchSlice";
import { saveGeoCode } from "../../features/geolocation/geolocationSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SearchBar() {
  const {
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({
    callbackName: "",
    requestOptions: {
      types: ["(cities)"],
    },
    debounce: 300,
  });

  const dispatch = useDispatch();
  const selectedValue = useSelector((state) => state.search.searchValue);

  const handleInput = (event) => {
    setValue(event.target.value);
  };

  const handleChange = (selectedValue) => {
    const parts = selectedValue.split(",");
    const city = parts[0];
    const country = parts[parts.length - 1];
    const cityAndCountry = `${city},${country}`;
    dispatch(updateSearchValue(selectedValue));
    dispatch(saveLocation(cityAndCountry));
  };

  useEffect(() => {
    selectedValue.length &&
      getGeocode({ address: selectedValue })
        .then((results) => {
          const { lat, lng } = getLatLng(results[0]);
          dispatch(saveGeoCode({ lat, lng }));
          dispatch(updateSearchValue(""));
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
  }, [selectedValue, dispatch]);

  return (
    <>
      <Combobox
        as="div"
        onChange={handleChange}
        value={selectedValue}
        className="relative w-full max-w-lg"
        nullable
      >
        <div className="relative">
          <MagnifyingGlassIcon
            className="pointer-events-none absolute top-2 left-5 h-6 w-6 text-gray-900 text-opacity-40 dark:text-gray-400"
            aria-hidden="true"
          />
          <Combobox.Input
            type="text"
            autoComplete="off"
            onChange={handleInput}
            placeholder="Search city..."
            className="w-full rounded-lg bg-neutral-50 py-2.5 pl-14 text-gray-900 placeholder-gray-500 outline-none focus:ring-0 dark:bg-neutral-900 dark:text-gray-100 dark:placeholder-gray-400 sm:text-sm"
          />
        </div>
        <Combobox.Options className="absolute -mb-2 -mt-1.5 max-h-72 w-full max-w-lg origin-top scroll-py-2 rounded-b-lg bg-white text-sm text-gray-800">
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <Combobox.Option
                key={place_id}
                value={description}
                className={({ active }) =>
                  classNames(
                    "cursor-default select-none rounded-lg px-4 py-2",
                    active && "bg-neutral-200 text-black first:rounded-t-none"
                  )
                }
              >
                {description}
              </Combobox.Option>
            ))}
        </Combobox.Options>
      </Combobox>
    </>
  );
}

export default SearchBar;
