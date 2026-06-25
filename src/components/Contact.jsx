import { useState } from 'react'
import './Contact.css'

export default function Contact({ t, lang }) {
  const [form, setForm] = useState({ name:'', company:'', email:'', phone:'', country:'', message:'' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('https://formspree.io/f/xvgrvkgq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ ...form, lang })
      })
      if (res.ok) { setStatus('success'); setForm({ name:'', company:'', email:'', phone:'', country:'', message:'' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <section className="section contact" id="contact">
      <div className="container contact__grid">
        <div className="contact__info">
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2 className="section-headline">{t.contact.headline}</h2>
          <p className="body-lg">{t.contact.body}</p>
          <div className="contact__details">
            <div className="contact__detail">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <a href="mailto:info@nuprozone.com">info@nuprozone.com</a>
            </div>
            <div className="contact__detail">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Rouyn-Noranda, QC J9Y 1A8, Canada</span>
            </div>
          </div>
          <div className="contact__image">
            <img src="/yoga-women.png" alt="Wellness lifestyle" />
          </div>
        </div>

        <div className="contact__form-wrap">
          {status === 'success' ? (
            <div className="contact__success">
              <div className="contact__success-icon">✓</div>
              <p>{t.contact.success}</p>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit} noValidate>
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
              <div className="form-field">
                <label>{t.contact.country} <span className="req">*</span></label>
                <input type="text" value={form.country} onChange={set('country')} required />
              </div>
              <div className="form-field">
                <label>{t.contact.message} <span className="req">*</span></label>
                <textarea
                  value={form.message}
                  onChange={set('message')}
                  placeholder={t.contact.messagePlaceholder}
                  rows={5}
                  required
                />
              </div>
              {status === 'error' && <p className="contact__error">{t.contact.error}</p>}
              <button type="submit" className="btn btn-primary contact__submit" disabled={status === 'loading'}>
                {status === 'loading' ? '...' : t.contact.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
