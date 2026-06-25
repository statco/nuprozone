import './About.css'

export default function About({ t }) {
  return (
    <section className="section about" id="about">
      <div className="container about__grid">
        <div className="about__images">
          <div className="about__img-main">
            <img src="/soap-floral.webp" alt="NUPROZ honey floral soap bar" />
          </div>
          <div className="about__img-secondary">
            <img src="/soap-herb.webp" alt="NUPROZ herbal soap bar" />
          </div>
        </div>
        <div className="about__content">
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2 className="section-headline">{t.about.headline}</h2>
          <p className="body-lg" style={{marginBottom: '20px'}}>{t.about.body1}</p>
          <p className="body-lg">{t.about.body2}</p>
          <div className="about__stats">
            <div className="about__stat">
              <span className="about__stat-num">{t.about.stat1}</span>
              <span className="about__stat-label">{t.about.stat1label}</span>
            </div>
            <div className="about__stat-divider" />
            <div className="about__stat">
              <span className="about__stat-num">{t.about.stat2}</span>
              <span className="about__stat-label">{t.about.stat2label}</span>
            </div>
            <div className="about__stat-divider" />
            <div className="about__stat">
              <span className="about__stat-num">{t.about.stat3}</span>
              <span className="about__stat-label">{t.about.stat3label}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
