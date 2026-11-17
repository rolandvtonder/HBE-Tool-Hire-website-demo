import {useEffect, type RefObject} from 'react';
import {clamp} from '../lib/math';
import {onFrame} from '../lib/scroll';

/**
 * The hero "camera pull-back": as the section scrolls away, its stage drifts
 * down, shrinks slightly, blurs and dims. Also pauses the hero film once it
 * is fully off screen so it stops decoding.
 */
export function useRecede(
  root: RefObject<HTMLElement | null>,
  stage: RefObject<HTMLElement | null>,
  video?: RefObject<HTMLVideoElement | null>,
) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let offscreenPaused = false;
    return onFrame(() => {
      const el = root.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const h = r.height || window.innerHeight;
      const p = clamp(-r.top / h);
      const v = video?.current;
      if (v) {
        // Pause off screen so it stops decoding; resume only what we paused.
        if (p >= 0.98 && !v.paused) {
          v.pause();
          offscreenPaused = true;
        } else if (p < 0.98 && offscreenPaused) {
          offscreenPaused = false;
          void v.play().catch(() => {});
        }
      }
      const s = stage.current;
      if (!s || reduced) return;
      s.style.transform = `translate3d(0, ${(p * h * 0.45).toFixed(1)}px, 0) scale(${(1 - p * 0.08).toFixed(4)})`;
      s.style.filter = p > 0.01 ? `blur(${(p * 14).toFixed(1)}px) brightness(${(1 - p * 0.5).toFixed(3)})` : 'none';
    });
  }, [root, stage, video]);
}
