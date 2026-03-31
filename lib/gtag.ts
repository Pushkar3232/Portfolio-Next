export const GA_MEASUREMENT_ID = "G-4S7RB3EFT8"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export const pageview = (url: string): void => {
  if (!window.gtag) return

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  })
}
