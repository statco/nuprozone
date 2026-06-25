import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import About from './components/About'
import Ingredients from './components/Ingredients'
import Products from './components/Products'
import Why from './components/Why'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { translations } from './i18n'
import './App.css'

function App() {
  const [lang, setLang] = useState('en')
  const t = translations[lang]
  const toggleLang = () => setLang(l => l === 'en' ? 'fr' : 'en')

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <div className="app">
      <Nav t={t} lang={lang} toggleLang={toggleLang} />
      <main>
        <Hero t={t} />
        <TrustBar t={t} />
        <About t={t} />
        <Ingredients t={t} />
        <Products t={t} />
        <Why t={t} />
        <Contact t={t} lang={lang} />
      </main>
      <Footer t={t} />
    </div>
  )
}

export default App
