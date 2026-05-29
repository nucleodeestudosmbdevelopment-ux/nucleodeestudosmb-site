import { useEffect, useState } from "react";

/**
 * Decides whether to render reduced 3D motion.
 * Returns true only when the user prefers reduced motion.
 */
export function useReducedMotion3D() {
  const [shouldReduce, setShouldReduce] = useState(false);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setShouldReduce(mqReduce.matches);
    update();
    mqReduce.addEventListener("change", update);
    return () => {
      mqReduce.removeEventListener("change", update);
    };
  }, []);

  return shouldReduce;
}
