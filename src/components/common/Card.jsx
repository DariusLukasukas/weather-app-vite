function Card({ width, height, icon, title, children }) {
  // Re-usable card components gets passed in props from the parent component the following props: width, height, titleIcon, title children, icon
  // The children prop is the content that will be displayed inside the card
  // The width and height props are used to set the width and height of the card
  // The title prop is used to set the title of the card

  return (
    <div
      className={`w-${width} h-${height} bg-white dark:bg-gray-500 rounded-md shadow-md`}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-row justify-between items-center p-4">
          <div className="flex flex-row items-center gap-2">
            {icon}
            <div className="text-2xl font-bold">{title}</div>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Card;
