import { useEffect, useState } from "react";
import { weatherCodes } from "../../assets/weatherCodes";

const WeatherIcon = ({ iconType, id, size }) => {
  const [path, setPath] = useState(false);
  const [iconCode, setIconCode] = useState("");

  function getIconName(iconType, id) {
    let iconName;
    switch (true) {
      case iconType.includes("d"):
        iconName = weatherCodes.day[id];
        break;
      case iconType.includes("n"):
        iconName = weatherCodes.night[id];
        break;
      default: // set a default value
        console.log("Invalid icon type");
        icon = "default-icon";
        break;
    }
    return iconName;
  }

  useEffect(() => {
    const icon = getIconName(iconType, id);
    setIconCode(icon);
    const importIcon = async () => {
      try {
        const { default: _path } = await import(
          `../../assets/icons/wi_${icon}.svg`
        );
        setPath(_path);
      } catch (err) {
        console.error(err);
      }
    };
    importIcon();
  }, [iconType]);

  return (
    <>
      {path && (
        <img
          src={path}
          alt={iconCode}
          className={`w-${size} h-${size} will-change-auto`}
          loading="lazy"
        />
      )}
    </>
  );
};

export default WeatherIcon;
