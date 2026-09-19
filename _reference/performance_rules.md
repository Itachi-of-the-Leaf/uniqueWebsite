# UI Performance & Hardware Acceleration Guidelines

### 1. Compositor-Only Animation Rules
- Never animate layout properties: `top`, `left`, `bottom`, `right`, `width`, `height`, `margin`, `padding`.
- Never animate expensive paint properties during scroll: `box-shadow`, `filter`, `backdrop-filter`, `border-radius`.
- Restrict all continuous scroll and hover transitions strictly to:
  * `transform: translate3d(x, y, 0)`
  * `transform: scale()`
  * `transform: rotate()` / `rotateX()` / `rotateY()`
  * `opacity`

### 2. GPU Layer Promotion & Paint Isolation
- Promote sticky viewports, pinned cards, and moving overlays to their own compositor layer:
  ```css
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;