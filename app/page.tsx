"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar si es móvil
    const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    setIsMobile(mobile);

    if (!mobile) {
      // En PC: autoplay directo
      setShowVideo(true);
    }
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !showVideo) return;

    if (isMobile) {
      // Móvil: el usuario tocó play, reproducir con sonido
      v.muted = false;
      v.currentTime = 0;
      v.play().catch(() => {
        v.muted = true;
        v.play();
      });
    } else {
      // PC: autoplay muted primero, luego sonido al primer click
      v.muted = true;
      v.play().catch(() => {});

      const enableSound = () => {
        if (v) v.muted = false;
        document.removeEventListener("click", enableSound);
      };
      document.addEventListener("click", enableSound, { once: true });
    }
  }, [showVideo, isMobile]);

  const handlePlay = () => {
    setShowVideo(true);
    // Esperar a que el video principal se muestre y reproducirlo con sonido
    setTimeout(() => {
      const v = videoRef.current;
      if (v) {
        v.muted = false;
        v.currentTime = 0;
        v.play().catch(() => {
          v.muted = true;
          v.play();
        });
      }
    }, 100);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Contenido centrado */}
      <div className="flex flex-1 flex-col items-center justify-center px-4">
        {/* Video con overlay play solo en móvil */}
        <div className="relative w-full max-w-2xl">
          {/* Video real (siempre visible en desktop, o después de tocar play en móvil) */}
          <video
            ref={videoRef}
            autoPlay={showVideo}
            loop
            muted
            playsInline
            preload="metadata"
            className={`w-full ${!showVideo ? "hidden sm:block" : ""}`}
          >
            <source src="/logo ectyre.mp4" type="video/mp4" />
          </video>

          {/* Thumbnail con play para móvil */}
          {!showVideo && (
            <button
              onClick={handlePlay}
              className="relative flex w-full items-center justify-center sm:hidden cursor-pointer"
              aria-label="Reproducir video"
            >
              {/* Primer frame como poster */}
              <video
                className="w-full pointer-events-none"
                preload="metadata"
                playsInline
                muted
              >
                <source src="/logo ectyre.mp4#t=0.5" type="video/mp4" />
              </video>
              {/* Botón play con efecto video */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-xl">
                  <svg
                    className="ml-1 h-7 w-7 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  {/* Anillo animado tipo "video" */}
                  <div className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping" />
                </div>
              </div>
            </button>
          )}
        </div>

        {/* Texto */}
        <h1
          className="mt-10 px-6 text-center text-xl tracking-tight text-gray-600 sm:mt-12 sm:text-4xl"
          style={{ fontFamily: "var(--font-geist-sans), sans-serif", fontWeight: 300 }}
        >
          Estamos construyendo algo increíble
        </h1>
        <p className="mt-1 px-6 text-center text-sm text-gray-500 sm:text-lg">
          Muy pronto estaremos listos. ¡Mantente atento!
        </p>
      </div>
    </div>
  );
}
