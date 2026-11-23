export type MaterialVariant = 'glass' | 'glow'

export const MATERIAL_VARIANTS: Record<MaterialVariant, { label: string; index: string }> = {
  glass: { label: 'Glass surface', index: '01' },
  glow: { label: 'Glow edge', index: '02' },
}
