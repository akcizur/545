import { Moon, Sun } from 'lucide-react'
import type { Theme } from '../hooks/useTheme'

type SiteHeaderProps = {
  theme: Theme
  onToggleTheme: () => void
}

export default function SiteHeader({ theme, onToggleTheme }: SiteHeaderProps) {
  const ThemeIcon = theme === 'dark' ? Sun : Moon

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#top" aria-label="545 home">
          <span className="brand__mark">545</span>
          <span className="brand__descriptor">MATERIAL STUDIES</span>
        </a>

        <nav className="header-actions" aria-label="Main navigation">
          <button
            className="icon-button"
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
          >
            <ThemeIcon size={16} strokeWidth={1.8} />
          </button>
          <a
            className="icon-button"
            href="https://github.com/akcizur/545"
            target="_blank"
            rel="noreferrer"
            aria-label="Open 545 on GitHub"
            title="GitHub repository"
          >
            <span className="repo-mark" aria-hidden="true">GH</span>
          </a>
        </nav>
      </div>
    </header>
  )
}
