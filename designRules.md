# Design Rules

## 1. Design intent

545 is a compact interface-material laboratory.

The visual language combines:

- restrained editorial layout,
- monochromatic color,
- tactile glass surfaces,
- precise animated edges,
- generous whitespace,
- small technical metadata.

The effects are the subject. The surrounding interface should stay quiet.

## 2. Color

Use neutral grayscale only.

### Light

- Canvas: #e9eaed
- Main text: #1c1d20
- Secondary text: #666a70
- Faint text: #a4a8ae
- Borders: translucent charcoal
- Glass: translucent white
- Glow: graphite face with silver rim

### Dark

- Canvas: #111214
- Main text: #f0f0f1
- Secondary text: #a0a2a6
- Faint text: #55585e
- Borders: translucent white
- Glass: restrained translucent highlights
- Glow: lifted graphite face with a silver rim

Do not introduce saturated brand accents. Hierarchy comes from contrast, opacity, spacing and typography.

## 3. Layout

- Main content width: 768px.
- Header height: 58px.
- Header and footer share the main content alignment.
- Desktop content uses a two-column study row.
- Mobile content stacks study copy above the live preview.
- Keep the article-like canvas open; do not wrap the whole page in a dashboard card.

Whitespace is intentional. Do not fill it with extra controls or decoration.

## 4. Typography

### Google Sans

Use for headings, body copy, buttons, navigation and labels.

### Fragment Mono

Use for index numbers, category labels, technical metadata, status lines and footer notes.

Metadata is secondary and should not compete with the study title.

## 5. Glass surface

The glass treatment uses:

- translucent neutral fill,
- a thin refractive edge,
- two restrained inset highlights,
- low shadow,
- small backdrop blur,
- a slow hover response,
- a compressed active state.

Avoid strong blur, large diffuse shadows or white highlights that erase text contrast.

## 6. Glow edge

The glow treatment uses:

- dark inset face,
- one narrow animated monochrome rim,
- a subtle pointer-following highlight,
- a slow rotation,
- compact press feedback.

No neon, hue cycling, external color interpolation or large ambient halo.

## 7. Motion

Motion should feel deliberate rather than busy.

- Use eased transitions.
- Keep hover movement to a small displacement.
- Keep the rotating rim slow.
- Use a direct press response.
- Do not add permanent animation to unrelated page elements.
- Respect prefers-reduced-motion.

Touch devices must remain usable without hover.

## 8. Interaction

- Use semantic buttons for actions.
- Keep the visible label readable above decorative layers.
- Keep pointer tracking scoped to the button.
- Show a truthful local confirmation after activation.
- Do not imply a network operation or external service where none exists.
- Preserve keyboard focus visibility.

## 9. Component rules

Every new component should define its role, visual variant, interaction behavior, mobile behavior, theme behavior, keyboard behavior and reduced-motion behavior.

Prefer one shared component with explicit variants over duplicated button implementations.

## 10. Anti-patterns

Avoid saturated gradients, neon glows, heavy glass blur, nested cards, full-width dashboard layouts, excessive pills, decorative badge clusters, high-frequency animation, large shadow stacks and controls without a real action.

## 11. Review checklist

- [ ] Monochrome in both themes
- [ ] Content width remains disciplined
- [ ] Glass remains translucent, not opaque
- [ ] Glow rim remains narrow and subtle
- [ ] Pointer light tracks the active control only
- [ ] Press feedback is visible
- [ ] Focus-visible is clear
- [ ] Reduced motion is respected
- [ ] Mobile layout stacks cleanly
- [ ] No fake network or generation state
