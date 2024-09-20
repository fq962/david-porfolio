import React from "react";

const ExternalLinkIcon: React.FC = () => {
  return (
    <div className="group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`
          group-hover:text-primary
          text-muted-foreground
          h-[26px]
          w-[26px]
          transform
          text-[#a8b2d1]
          transition-transform
          duration-150
          ease-in-out hover:text-[#9DBA96] group-hover:-translate-y-1`}
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
        <path d="M11 13l9 -9" />
        <path d="M15 4h5v5" />
      </svg>
    </div>
  );
};

export default ExternalLinkIcon;
