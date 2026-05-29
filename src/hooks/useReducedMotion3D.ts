import { useEffect, useState } from "react";

/**
 * Decide whether to render full 3D Canvas scenes.
 * Returns true when the user prefers reduced motion or is on a small screen.
 */
export function useReducedMotion3D() {
  const [shouldReduce, setShouldReduce] = useState(false);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqSmall = window.matchMedia("(max-width: 640px)");
    const update = () => setShouldReduce(mqReduce.matches || mqSmall.matches);
    update();
    mqReduce.addEventListener("change", update);
    mqSmall.addEventListener("change", update);
    return () => {
      mqReduce.removeEventListener("change", update);
      mqSmall.removeEventListener("change", update);
    };
  }, []);

  return shouldReduce;
}
