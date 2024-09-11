import React, { useState } from "react";
import { KEYS_FOR_ICONS } from "../../interfaces/keysForIcons";

interface SkillIconProps {
  tag: string;
  iconKey?: string;
}

const searchIconByKey = (iconKey?: string | null) => {
  if (!iconKey) {
    return null;
  }

  const keyAsUpperCase = iconKey.toUpperCase();

  if (keyAsUpperCase in KEYS_FOR_ICONS) {
    return KEYS_FOR_ICONS[keyAsUpperCase as keyof typeof KEYS_FOR_ICONS];
  }

  return null;
};

const Tag: React.FC<SkillIconProps> = ({ tag, iconKey }) => {
  return (
    <>
      <span
        key={tag}
        className=" me-2 flex items-center justify-center gap-2 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 hover:text-blue-900 dark:hover:text-blue-100"
      >
        {searchIconByKey(iconKey) && (
          <img
            src={searchIconByKey(iconKey) as string}
            alt={tag}
            className="w-4"
          />
        )}
        {tag}
      </span>
    </>
  );
};

export default Tag;
