import './Products.css'

export default function Products({ t }) {
  // Gallery of soap bars to display
  const gallery = [
    { src: '/soap-bar-hero.webp',   alt: 'Marigold & Oat bar' },
    { src: '/soap-rosemary.webp',   alt: 'Charcoal & Rosemary bars' },
    { src: '/soap-oat.webp',        alt: 'Oat & Honey bar' },
    { src: '/soap-speckled.webp',   alt: 'Speckled goat milk bar' },
    { src: '/soap-green.webp',      alt: 'Green clay bar' },
    { src: '/soap-floral.webp',     alt: 'Honey floral bar' },
  ]

  return (
    <section className="section products" id="products">
      <div className="container">
        <div className="products__header">
          <p className="eyebrow">{t.products.eyebrow}</p>
          <h2 className="section-headline">{t.products.headline}</h2>
          <p className="body-lg">{t.products.body}</p>
        </div>

        <div className="products__layout">
          {/* Left: image gallery grid */}
          <div className="products__gallery">
            {gallery.map((img, i) => (
              <div key={i} className={`products__gallery-item products__gallery-item--${i}`}>
                <img src={img.src} alt={img.alt} />
              </div>
            ))}
          </div>

          {/* Right: info panel */}
          <div className="products__info">
            <div className="products__coming">
              <div className="products__coming-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="9" y1="9" x2="9" y2="21"/>
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
                <span>Origin</span>
                <span>North America</span>
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
                <span>Pricing</span>
                <span>Available upon inquiry</span>
              </div>
            </div>
            <a href="#contact" className="btn btn-primary products__cta">{t.products.cta}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
