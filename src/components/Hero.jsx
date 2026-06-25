import './Hero.css'

export default function Hero({ t }) {
  return (
    <section className="hero" id="home">
      <div className="hero__bg">
        <img src="/soap-hero.jpg" alt="NUPROZ Goat Milk Soap" className="hero__img" />
        <div className="hero__overlay" />
      </div>
      <div className="hero__content">
        <div className="hero__text">
          <p className="eyebrow hero__eyebrow">{t.hero.eyebrow}</p>
          <h1 className="hero__headline">{t.hero.headline}</h1>
          <p className="hero__subhead">{t.hero.subhead}</p>
          <p className="hero__body">{t.hero.body}</p>
          <div className="hero__actions">
            <a href="#contact" className="btn btn-primary">{t.hero.cta}</a>
            <a href="#products" className="btn btn-outline hero__btn-outline">{t.hero.cta2}</a>
          </div>
        </div>
        <div className="hero__soap-visual">
          <div className="hero__soap-card">
            <img src="/soap-label-front.jpg" alt="NUPROZ Milk and Honey Soap" className="hero__soap-img" />
            <div className="hero__soap-badge">
              <span>4 oz · 113g</span>
              <span>Handcrafted</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
