/// Helper function to resolve CSS variables
export function getCSSVariable(varName: string, fallback: string): string {
  if (typeof window !== 'undefined' && typeof window.getComputedStyle !== 'undefined') {
    const root = document.documentElement
    const value = getComputedStyle(root).getPropertyValue(varName).trim()
    return value || fallback
  }
  return fallback
}
