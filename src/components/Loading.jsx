import React, { useEffect, useState } from "react";

const Loading = () => {
  const [loading, setLoading] = useState(true);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      // Mostra o logo quase imediatamente
      setTimeout(() => setShowLogo(true), 100);
      // Finaliza o loading após 1.5s
      setTimeout(() => setLoading(false), 1500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  if (!loading) return null;

  return (
    <div
      id="loading"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        overflow: "hidden",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      {/* Loading circular verde */}
      <div className="spinner" />

      {/* Logo */}
      {showLogo && (
        <img
          src="https://newandrews.com.br/image-andrews/logo_five.png"
          alt="Logo"
          style={{
            width: "300px",
            opacity: 0,
            animation: "fadeInOut 1.5s ease-in-out forwards",
          }}
        />
      )}

      <style>{`
        /* Spinner circular */
        .spinner {
          width: 60px;
          height: 60px;
          border: 6px solid rgba(0, 255, 0, 0.2);
          border-top: 6px solid #00ff4c;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Logo fade-in / fade-out */
        @keyframes fadeInOut {
          0% { opacity: 0; transform: scale(0.85); }
          20% { opacity: 1; transform: scale(1); }
          80% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default Loading;
