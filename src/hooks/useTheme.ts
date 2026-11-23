import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  try {
    const savedTheme = window.localStorage.getItem('545-theme')
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.style.colorScheme = theme

    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    if (themeColor) themeColor.content = theme === 'dark' ? '#111214' : '#e9eaed'

    try {
      window.localStorage.setItem('545-theme', theme)
    } catch {
      // Theme remains available for the current session.
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggleTheme }
}
