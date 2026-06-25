import './Why.css'

export default function Why({ t }) {
  const icons = [
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>,
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  ]

  return (
    <section className="section why" id="why">
      <div className="container">
        <div className="why__header">
          <p className="eyebrow">{t.why.eyebrow}</p>
          <h2 className="section-headline">{t.why.headline}</h2>
        </div>
        <div className="why__grid">
          {t.why.items.map((item, i) => (
            <div key={i} className="why-card">
              <div className="why-card__icon">{icons[i]}</div>
              <h3 className="why-card__title">{item.title}</h3>
              <p className="why-card__desc">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="why__cta-row">
          <a href="#contact" className="btn btn-primary">{t.contact.submit}</a>
        </div>
      </div>
    </section>
  )
}
