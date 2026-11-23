import type { PointerEvent } from 'react'
import type { MaterialVariant } from '../config/materials'

type MaterialButtonProps = {
  variant: MaterialVariant
  label: string
  onActivate: () => void
}

export default function MaterialButton({
  variant,
  label,
  onActivate,
}: MaterialButtonProps) {
  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return

    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`)
  }

  return (
    <button
      className={`material-button material-button--${variant}`}
      type="button"
      onClick={onActivate}
      onPointerMove={handlePointerMove}
      aria-label={label}
      data-variant={variant}
    >
      <span className="material-button__face">
        <span className="material-button__label">{label}</span>
      </span>
    </button>
  )
}
