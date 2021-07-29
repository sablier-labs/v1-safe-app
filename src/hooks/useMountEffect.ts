import { EffectCallback, useEffect } from "react";

// See https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once
function useMountEffect(func: EffectCallback): void {
  useEffect(func, [func]);
}
export default useMountEffect;
