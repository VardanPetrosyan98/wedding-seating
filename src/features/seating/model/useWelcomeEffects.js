import { useEffect, useRef } from "react";

const hearts = ["❤", "♡", "💗"];
const musicUrl =
  "https://cdn7.sefon.pro/prev/RyWNZ1PUlul5KtTFFAIJWg/1776126077/16/Johann%20Pachelbel%20-%20Canon%20In%20D%20Major%20%28192kbps%29.mp3";

export const useWelcomeEffects = ({ enabled }) => {
  const backgroundRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(musicUrl);
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    const tryPlay = () => {
      audio.play().catch(() => {});
    };

    tryPlay();
    window.addEventListener("pointerdown", tryPlay, { once: true });
    window.addEventListener("keydown", tryPlay, { once: true });

    return () => {
      window.removeEventListener("pointerdown", tryPlay);
      window.removeEventListener("keydown", tryPlay);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    if (!enabled || !backgroundRef.current) {
      return undefined;
    }

    const container = backgroundRef.current;
    const spawnHeart = () => {
      const heart = document.createElement("span");
      heart.className = "pointer-events-none absolute select-none text-rose-400";
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.top = "-10vh";
      heart.style.fontSize = `${12 + Math.random() * 22}px`;
      heart.style.opacity = "0";
      container.appendChild(heart);

      const driftX = (Math.random() - 0.5) * 20;
      const rotation = (Math.random() - 0.5) * 180;
      const duration = 5000 + Math.random() * 5000;

      const animation = heart.animate(
        [
          { transform: "translate3d(0, -10vh, 0) rotate(0deg)", opacity: 0 },
          { opacity: 0.45, offset: 0.15 },
          { transform: `translate3d(${driftX}vw, 110vh, 0) rotate(${rotation}deg)`, opacity: 0 },
        ],
        { duration, easing: "linear", iterations: 1 },
      );

      animation.onfinish = () => heart.remove();
    };

    for (let index = 0; index < 14; index += 1) {
      spawnHeart();
    }

    const intervalId = window.setInterval(spawnHeart, 600);
    return () => window.clearInterval(intervalId);
  }, [enabled]);

  return { backgroundRef };
};
