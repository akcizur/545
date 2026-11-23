import { useCallback, useEffect, useState } from 'react'
import MaterialCard from './components/MaterialCard'
import SearchOverlay from './components/SearchOverlay'
import SiteHeader from './components/SiteHeader'
import type { MaterialVariant } from './config/materials'
import { MATERIAL_STUDIES } from './data/materials'
import { useTheme } from './hooks/useTheme'

const INITIAL_COUNTS: Record<MaterialVariant, number> = {
  glass: 0,
  glow: 0,
}

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const [actionCounts, setActionCounts] =
    useState<Record<MaterialVariant, number>>(INITIAL_COUNTS)
  const [searchOpen, setSearchOpen] = useState(false)

  const openSearch = useCallback(() => setSearchOpen(true), [])

  const closeSearch = useCallback(() => {
    setSearchOpen(false)
    window.requestAnimationFrame(() => {
      document.getElementById('search-trigger')?.focus()
    })
  }, [])

  useEffect(() => {
    const handleGlobalShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        openSearch()
      }
    }

    window.addEventListener('keydown', handleGlobalShortcut)
    return () => window.removeEventListener('keydown', handleGlobalShortcut)
  }, [openSearch])

  const registerInteraction = (id: MaterialVariant) => {
    setActionCounts((current) => ({
      ...current,
      [id]: current[id] + 1,
    }))
  }

  return (
    <>
      <div className="app-shell" id="top">
        <SiteHeader
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenSearch={openSearch}
        />

        <main className="page-content">
          <section className="hero" aria-labelledby="page-title">
            <p className="eyebrow">INTERFACE MATERIALS <span>/</span> VOL. 01</p>
            <h1 id="page-title">Interaction,<br />distilled.</h1>
            <p className="hero-copy">
              A small library of tactile button surfaces. Two studies, one restrained visual language.
            </p>
            <div className="hero-meta">
              <span>02 MATERIALS</span>
              <span>LIVE INTERACTION</span>
              <span>CSS + REACT</span>
            </div>
          </section>

          <section className="studies" id="studies" aria-labelledby="studies-title">
            <div className="section-heading">
              <div>
                <p className="eyebrow">THE COLLECTION</p>
                <h2 id="studies-title">Material studies</h2>
              </div>
              <span className="section-count">01—02</span>
            </div>

            <div className="study-list">
              {MATERIAL_STUDIES.map((material) => (
                <MaterialCard
                  key={material.id}
                  material={material}
                  actionCount={actionCounts[material.id]}
                  onActivate={registerInteraction}
                />
              ))}
            </div>
          </section>

          <section className="principle" aria-label="Design principle">
            <span className="eyebrow">THE PRINCIPLE</span>
            <p>Less decoration. More <span>response.</span></p>
          </section>
        </main>

        <footer className="site-footer">
          <div className="site-footer__inner">
            <span>545 <span className="footer-divider">/</span> MATERIAL STUDIES</span>
            <span>BUILT TO BE FELT, NOT NOTICED.</span>
          </div>
        </footer>
      </div>

      {searchOpen && <SearchOverlay onClose={closeSearch} />}
    </>
  )
}
