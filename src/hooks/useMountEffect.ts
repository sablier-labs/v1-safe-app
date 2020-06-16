import { useEffect, EffectCallback } from "react";

/* See https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once */
function useMountEffect(func: EffectCallback) {
  useEffect(func, []);
}
export default useMountEffect;
