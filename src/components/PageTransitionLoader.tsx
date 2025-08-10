import { useEffect, useRef } from "react";

const PageTransitionLoader = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.volume = 1;
      video.play().catch((err) => {
        console.error("Autoplay failed:", err);
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        src="/video.mp4"
        autoPlay
        playsInline
        controls={false}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default PageTransitionLoader;
