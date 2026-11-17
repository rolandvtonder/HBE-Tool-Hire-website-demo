import {useEffect, useRef} from 'react';

/**
 * Watches every `[data-reveal]` and `[data-group]` element inside the returned
 * ref's element and adds `.is-in` the first time each one is seen.
 *
 * `[data-group]` exists for children that start translated off-screen (the
 * home panels): they can never intersect themselves, so their in-view parent
 * triggers them instead.
 *
 * The hidden states only apply under `html.js`, so the prerendered HTML reads
 * fine for crawlers and anyone without JavaScript.
 */
export function useReveals<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      },
      {rootMargin: '0px 0px -10% 0px', threshold: 0.01},
    );

    const watch = () =>
      root.querySelectorAll('[data-reveal]:not(.is-in), [data-group]:not(.is-in)').forEach((el) => io.observe(el));
    watch();

    const mo = new MutationObserver(watch);
    mo.observe(root, {childList: true, subtree: true});

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return ref;
}
