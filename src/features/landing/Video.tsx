"use client";

import { useEffect, useState } from "react";

export const Video = () => {
  const [screenWidth, setScreenWidth] = useState(1280); // Default width
  const [screenHeight, setScreenHeight] = useState(720); // Default height
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Update the width and height with the actual size of the window
    const updateWindowDimensions = () => {
      setScreenWidth(window.innerWidth * 0.8);
      setScreenHeight(window.innerWidth * 0.8 * 0.5625);
    };

    // Set initial size
    updateWindowDimensions();

    // Add event listener to resize
    window.addEventListener("resize", updateWindowDimensions);

    // Cleanup function to remove event listener
    setIsLoading(false);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  return (
    <div className="mt-24 flex justify-center ">
      {isLoading == false && (
        <iframe
          width={screenWidth}
          height={screenHeight}
          src="https://www.youtube.com/embed/kFRf-h4eMb4?si=ZqYTULYfdb7OQQVj"
          title="Baraque Trailer"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      )}
    </div>
  );
};
