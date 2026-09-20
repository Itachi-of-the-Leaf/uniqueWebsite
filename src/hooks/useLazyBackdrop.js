import { useEffect } from 'react'
import LazyLoad from 'vanilla-lazyload'

/**
 * Mounts a single LazyLoad instance scoped to elements matching
 * `selector` and tears it down on unmount. On any change to
 * `depend`, .update() is called so newly-rendered images register
 * with the existing IntersectionObserver.
 *
 * Used for backdrop <img> elements that we render with
 * `data-src` + `data-srcset` instead of `src`/`srcset`. Once the
 * element scrolls near the viewport, vanilla-lazyload copies the
 * data-* attrs to the real `src`/`srcset` and the browser fetches
 * the image.
 *
 * Why not native `loading="lazy"`?
 *   - Native lazy has no native `srcset` switching based on
 *     viewport width — it loads whatever's in `srcset` once.
 *   - Native lazy has no LQIP-friendly callback hook.
 *   - Native lazy can't be tuned per-image (root margins, etc.).
 *   For 6-8 large backdrop JPEGs on a phone with 3G, the bigger
 *   win is responsive `srcset` switching.
 *
 * The hook deliberately passes `threshold: 200` so images start
 * loading 200px before they enter the viewport, hiding network
 * latency on slow connections.
 *
 * @param {string} selector - CSS selector for images to lazy-load
 *   (default: '.lazy-bg')
 * @param {unknown[]} depend - dependency list; re-init when
 *   contents change
 */
export function useLazyBackdrop(selector = '.lazy-bg', depend = []) {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const instance = new LazyLoad({
      elements_selector: selector,
      threshold: 200,
      callback_loaded: (el) => {
        // Fade-in once the image actually paints so the transition
        // doesn't happen while the bytes are still in flight.
        el.classList.add('is-loaded')
      },
    })
    return () => instance.destroy()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, ...depend])
}
