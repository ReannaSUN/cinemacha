'use client'

import App from '../src/App'
import { I18nProvider } from '../src/i18n/I18nProvider'

export default function HomePage() {
  return (
    <I18nProvider>
      <App />
    </I18nProvider>
  )
}
