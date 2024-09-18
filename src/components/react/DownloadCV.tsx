import React from "react";

export const ButtonDownloadCV: React.FC = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "static/cv/DavidQuintanilla_CV.pdf";
    link.download = "DavidQuintanilla_CV.pdf";
    link.click();
  };

  return (
    <>
      <div className="bg-hover:bg-botoncito_2 mb-2 mr-2 inline-flex cursor-pointer flex-row items-center gap-x-2 rounded-lg bg-botoncito px-5 py-2.5 text-center font-medium text-white opacity-90 transition-all duration-200 ease-in-out hover:scale-110 hover:opacity-100  hover:shadow-lg focus:outline-none focus:ring-4">
        <button onClick={handleDownload}>Descargar CV</button>
      </div>
    </>
  );
};
