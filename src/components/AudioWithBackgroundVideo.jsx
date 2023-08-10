import React, { useCallback, useImperativeHandle, useRef } from "react";
import meditateVideo from "../assets/videos/meditate_video.mp4";

const AudioWithBackgroundVideo = (props, ref) => {
  const audioRef = useRef(null);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []); // Empty dependency array indicates that the function won't change

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []); // Empty

  useImperativeHandle(
    ref,
    () => {
      return {
        play,
        pause,
      };
    },
    [play, pause]
  );

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video
          className="object-cover w-full h-full"
          autoPlay
          loop
          muted
          playsInline
          src={meditateVideo}
          type="video/mp4"
        ></video>
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Audio */}
      <div className="relative z-10">
        <audio
          ref={audioRef}
          className="block mx-auto mt-16 p-4 bg-white rounded-lg shadow-lg"
          autoPlay
          loop={false}
          style={{ visibility: "hidden" }}
        >
          <source src={props.audioUrl} type="audio/mpeg" />
          {/* Add more audio source formats for cross-browser compatibility */}
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default React.forwardRef(AudioWithBackgroundVideo);
