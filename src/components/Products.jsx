import './Products.css'

export default function Products({ t }) {
  return (
    <section className="section products" id="products">
      <div className="container">
        <div className="products__header">
          <p className="eyebrow">{t.products.eyebrow}</p>
          <h2 className="section-headline">{t.products.headline}</h2>
          <p className="body-lg">{t.products.body}</p>
        </div>

        <div className="products__showcase">
          <div className="products__image-wall">
            <div className="products__img-large">
              <img src="/soap-label-front.jpg" alt="NUPROZ Milk and Honey Soap" />
              <div className="products__img-tag">Milk &amp; Honey</div>
            </div>
            <div className="products__img-stack">
              <div className="products__img-sm">
                <img src="/soap-label-back.jpg" alt="Soap ingredients list" />
              </div>
              <div className="products__img-sm products__img-sm--dark">
                <img src="/soap-ingredients.jpg" alt="Natural ingredients" />
              </div>
            </div>
          </div>

          <div className="products__info">
            <div className="products__coming">
              <div className="products__coming-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="9" x2="9" y2="21"/>
                  <line x1="15" y1="9" x2="15" y2="21"/>
                </svg>
              </div>
              <p className="products__coming-text">{t.products.coming}</p>
            </div>

            <div className="products__details">
              <div className="products__detail-row">
                <span>Format</span>
                <span>4 oz bar · 113g</span>
              </div>
              <div className="products__detail-row">
                <span>Process</span>
                <span>Cold-process</span>
              </div>
              <div className="products__detail-row">
                <span>Label</span>
                <span>Custom available</span>
              </div>
              <div className="products__detail-row">
                <span>Certifications</span>
                <span>Cruelty-free · Sensitive skin</span>
              </div>
              <div className="products__detail-row">
                <span>Origin</span>
                <span>Rouyn-Noranda, QC, Canada</span>
              </div>
            </div>
            <a href="#contact" className="btn btn-primary products__cta">{t.products.cta}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
