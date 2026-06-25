import './Ingredients.css'

export default function Ingredients({ t }) {
  return (
    <section className="section ingredients" id="ingredients">
      <div className="container">
        <div className="ingredients__header">
          <p className="eyebrow">{t.ingredients.eyebrow}</p>
          <h2 className="section-headline">{t.ingredients.headline}</h2>
          <p className="body-lg">{t.ingredients.body}</p>
        </div>
        <div className="ingredients__grid">
          {t.ingredients.list.map((item, i) => (
            <div key={i} className="ingredient-card">
              <div className="ingredient-card__num">{String(i + 1).padStart(2, '0')}</div>
              <div className="ingredient-card__body">
                <h3 className="ingredient-card__name">{item.name}</h3>
                <p className="ingredient-card__desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
