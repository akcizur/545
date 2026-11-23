import type { MaterialVariant } from '../config/materials'

export type MaterialSpec = {
  label: string
  value: string
}

export type MaterialStudy = {
  id: MaterialVariant
  title: string
  description: string
  buttonLabel: string
  note: string
  specs: MaterialSpec[]
}

export const MATERIAL_STUDIES: MaterialStudy[] = [
  {
    id: 'glass',
    title: 'Glass surface',
    description:
      'A translucent, light-catching surface with a soft edge, restrained depth and a physical response on press.',
    buttonLabel: 'Generate',
    note: 'Refraction is suggested through layered highlights, not a heavy blur.',
    specs: [
      { label: 'Surface', value: 'Translucent' },
      { label: 'Edge', value: 'Refractive highlight' },
      { label: 'Motion', value: 'Press / release' },
    ],
  },
  {
    id: 'glow',
    title: 'Glow edge',
    description:
      'A dark inset surface surrounded by a slow monochrome rim. The local highlight follows the pointer.',
    buttonLabel: 'Activate',
    note: 'The animated rim stays quiet; the pointer light provides the interaction cue.',
    specs: [
      { label: 'Surface', value: 'Dark inset' },
      { label: 'Edge', value: 'Rotating silver rim' },
      { label: 'Motion', value: 'Continuous / pointer' },
    ],
  },
]
