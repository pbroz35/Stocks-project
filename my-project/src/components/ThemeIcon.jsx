import React from "react";
import { MoonIcon } from "@heroicons/react/solid";

const ThemeIcon = () => {
  return (
    <button
      className={`bg-gray-700 rounded-lg border-neutral-300 p-2 absolute right-8 xl:right-5 shadow-md shadow-grey-100 `}
    >
      <MoonIcon className="h-8 w-8 cursor-pointer stroke-1 fill-yellow-400 stroke-yellow-400"></MoonIcon>
    </button>
  );
};

export default ThemeIcon;
