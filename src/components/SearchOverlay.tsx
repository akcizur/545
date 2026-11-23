import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, Search, X } from 'lucide-react'
import { MATERIAL_VARIANTS } from '../config/materials'
import { MATERIAL_STUDIES } from '../data/materials'

type SearchOverlayProps = {
  onClose: () => void
}

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export default function SearchOverlay({ onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => {
    const needle = normalize(query)

    if (!needle) return MATERIAL_STUDIES

    return MATERIAL_STUDIES.filter((study) => {
      const searchable = [
        study.title,
        study.description,
        study.buttonLabel,
        study.note,
        ...study.specs.flatMap((spec) => [spec.label, spec.value]),
        MATERIAL_VARIANTS[study.id].label,
      ]
      return searchable.some((value) => normalize(value).includes(needle))
    })
  }, [query])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    inputRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'input:not([disabled]), button:not([disabled]), a[href]',
      )
      if (!focusable?.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const handleBackdropMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <div
      className="search-overlay"
      role="presentation"
      onMouseDown={handleBackdropMouseDown}
    >
      <section
        className="search-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-title"
        ref={dialogRef}
      >
        <div className="search-dialog__top">
          <div>
            <p className="eyebrow">545 <span>/</span> QUICK FIND</p>
            <h2 id="search-title">Search materials</h2>
          </div>
          <button
            className="icon-button search-close"
            type="button"
            onClick={onClose}
            aria-label="Close search"
            title="Close search"
          >
            <X size={17} strokeWidth={1.8} />
          </button>
        </div>

        <label className="search-field">
          <Search size={18} strokeWidth={1.8} aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try glass, glow, surface, motion…"
            aria-label="Search materials and properties"
            autoComplete="off"
            spellCheck="false"
          />
          {query && (
            <button
              className="search-clear"
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              Clear
            </button>
          )}
        </label>

        <div className="search-results">
          <div className="search-results__heading">
            <span>{query.trim() ? 'RESULTS' : 'BROWSE MATERIALS'}</span>
            <span>{String(results.length).padStart(2, '0')}</span>
          </div>

          {results.length > 0 ? (
            <div className="search-results__list">
              {results.map((study) => (
                <a
                  className="search-result"
                  href={`#${study.id}`}
                  key={study.id}
                  onClick={onClose}
                >
                  <span className="search-result__index">
                    {MATERIAL_VARIANTS[study.id].index}
                  </span>
                  <span className="search-result__content">
                    <strong>{study.title}</strong>
                    <span>{study.description}</span>
                  </span>
                  <ArrowUpRight
                    className="search-result__arrow"
                    size={17}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          ) : (
            <div className="search-empty" role="status">
              <span>No matching material</span>
              <p>Try another term or clear the search.</p>
            </div>
          )}
        </div>

        <div className="search-dialog__footer">
          <span>SEARCH ACROSS MATERIALS & PROPERTIES</span>
          <span><kbd>ESC</kbd> TO CLOSE</span>
        </div>
      </section>
    </div>
  )
}
