import { useState } from 'react'
import './Contact.css'

const FORMSPREE_ID = 'xwvdolgq'

export default function Contact({ t, lang }) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    volume: '',
    productInterest: '',
    heardAbout: '',
    message: ''
  })
  const [status, setStatus] = useState('idle')

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          ...form,
          _language: lang,
          _replyto: form.email,
          _subject: `NUPROZ Wholesale Inquiry — ${form.company} (${form.country})`
        })
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name:'', company:'', email:'', phone:'', country:'', volume:'', productInterest:'', heardAbout:'', message:'' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section contact" id="contact">
      <div className="container contact__grid">

        {/* Left info panel */}
        <div className="contact__info">
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2 className="section-headline">{t.contact.headline}</h2>
          <p className="body-lg">{t.contact.body}</p>

          <div className="contact__details">
            <div className="contact__detail">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <a href="mailto:info@groupecomint.com">info@groupecomint.com</a>
            </div>
            <div className="contact__detail">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <span>nuprozone.com</span>
            </div>
          </div>

          <div className="contact__response-time">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>{t.contact.responseTime}</span>
          </div>

          <div className="contact__image">
            <img src="/soap-stack.webp" alt="NUPROZ soap collection" />
          </div>
        </div>

        {/* Right form panel */}
        <div className="contact__form-wrap">
          {status === 'success' ? (
            <div className="contact__success">
              <div className="contact__success-icon">✓</div>
              <h3 className="contact__success-title">{t.contact.successTitle}</h3>
              <p>{t.contact.success}</p>
              <p className="contact__success-sub">{t.contact.successSub}</p>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit} noValidate>

              {/* Row 1: Name + Company */}
              <div className="form-row form-row--2">
                <div className="form-field">
                  <label>{t.contact.name} <span className="req">*</span></label>
                  <input type="text" value={form.name} onChange={set('name')} required />
                </div>
                <div className="form-field">
                  <label>{t.contact.company} <span className="req">*</span></label>
                  <input type="text" value={form.company} onChange={set('company')} required />
                </div>
              </div>

              {/* Row 2: Email + Phone */}
              <div className="form-row form-row--2">
                <div className="form-field">
                  <label>{t.contact.email} <span className="req">*</span></label>
                  <input type="email" value={form.email} onChange={set('email')} required />
                </div>
                <div className="form-field">
                  <label>{t.contact.phone}</label>
                  <input type="tel" value={form.phone} onChange={set('phone')} />
                </div>
              </div>

              {/* Row 3: Country + Volume */}
              <div className="form-row form-row--2">
                <div className="form-field">
                  <label>{t.contact.country} <span className="req">*</span></label>
                  <input type="text" value={form.country} onChange={set('country')} required />
                </div>
                <div className="form-field">
                  <label>{t.contact.volume} <span className="req">*</span></label>
                  <select value={form.volume} onChange={set('volume')} required>
                    <option value="">{t.contact.volumeSelect}</option>
                    {t.contact.volumeOptions.map((o, i) => (
                      <option key={i} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Product interest */}
              <div className="form-field">
                <label>{t.contact.productInterest} <span className="req">*</span></label>
                <select value={form.productInterest} onChange={set('productInterest')} required>
                  <option value="">{t.contact.productInterestSelect}</option>
                  {t.contact.productOptions.map((o, i) => (
                    <option key={i} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* Row 5: How did you hear */}
              <div className="form-field">
                <label>{t.contact.heardAbout}</label>
                <select value={form.heardAbout} onChange={set('heardAbout')}>
                  <option value="">{t.contact.heardAboutSelect}</option>
                  {t.contact.heardAboutOptions.map((o, i) => (
                    <option key={i} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* Row 6: Message */}
              <div className="form-field">
                <label>{t.contact.message} <span className="req">*</span></label>
                <textarea
                  value={form.message}
                  onChange={set('message')}
                  placeholder={t.contact.messagePlaceholder}
                  rows={4}
                  required
                />
              </div>

              {status === 'error' && (
                <p className="contact__error">{t.contact.error}</p>
              )}

              <button
                type="submit"
                className="btn btn-primary contact__submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <span className="contact__spinner" />
                ) : t.contact.submit}
              </button>

              <p className="contact__privacy">{t.contact.privacy}</p>
            </form>
          )}
        </div>

      </div>
    </section>
  )
}
