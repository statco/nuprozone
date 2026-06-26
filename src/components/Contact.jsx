import { useState } from 'react'
import './Contact.css'

const FORMSPREE_ID = 'xwvdolgq'
const EMAILJS_SERVICE  = 'service_hge1p5o'
const EMAILJS_TEMPLATE = 'template_yjfznth'
const EMAILJS_KEY      = '8p2cXHkz3QY_aj81x'

export default function Contact({ t, lang }) {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '',
    country: '', volume: '', productInterest: '',
    heardAbout: '', message: ''
  })
  const [status, setStatus] = useState('idle')

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const buildConfirmationHTML = (f, isFR) => {
    const greeting     = isFR ? `Bonjour ${f.name},`        : `Hi ${f.name},`
    const line1        = isFR
      ? `Merci de nous avoir contacté. Nous avons bien reçu votre demande de la part de <strong>${f.company}</strong> (${f.country}) et vous répondrons dans <strong>1 à 2 jours ouvrables</strong> avec les tarifs, les MOQs et les détails du catalogue.`
      : `Thank you for reaching out to NUPROZ. We have received your wholesale inquiry from <strong>${f.company}</strong> (${f.country}) and will respond within <strong>1–2 business days</strong> with pricing, MOQs, and catalogue details.`
    const lbl_product  = isFR ? `Produit d'intérêt`   : `Product interest`
    const lbl_volume   = isFR ? `Volume estimé`        : `Estimated volume`
    const lbl_msg      = isFR ? `Votre message`        : `Your message`
    const reply_note   = isFR
      ? `Vous pouvez répondre directement à cet email pour toute question.`
      : `Feel free to reply directly to this email with any questions.`
    const sign_off     = isFR ? `L'équipe NUPROZ`      : `The NUPROZ Team`

    return `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#3D3530;">
  <div style="background:#2C3B2D;padding:24px 32px;">
    <span style="font-family:Georgia,serif;font-size:22px;color:#ffffff;letter-spacing:0.12em;">NUPROZ</span>
    <span style="font-size:13px;color:rgba(255,255,255,0.6);margin-left:12px;">Wholesale</span>
  </div>
  <div style="padding:32px;background:#ffffff;border:1px solid #EDE8DC;">
    <p style="font-size:16px;margin:0 0 20px;">${greeting}</p>
    <p style="font-size:15px;line-height:1.7;margin:0 0 24px;">${line1}</p>
    <div style="background:#F9F5EE;border-left:3px solid #E8651A;padding:16px 20px;margin:0 0 24px;border-radius:0 4px 4px 0;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;color:#7A6F65;text-transform:uppercase;font-size:11px;letter-spacing:0.08em;width:40%;">${lbl_product}</td><td style="padding:6px 0;font-weight:600;">${getLabel(t.contact.productOptions, f.productInterest) || '—'}</td></tr>
        <tr><td style="padding:6px 0;color:#7A6F65;text-transform:uppercase;font-size:11px;letter-spacing:0.08em;">${lbl_volume}</td><td style="padding:6px 0;font-weight:600;">${getLabel(t.contact.volumeOptions, f.volume) || '—'}</td></tr>
        ${f.message ? `<tr><td style="padding:6px 0;color:#7A6F65;text-transform:uppercase;font-size:11px;letter-spacing:0.08em;vertical-align:top;">${lbl_msg}</td><td style="padding:6px 0;">${f.message}</td></tr>` : ''}
      </table>
    </div>
    <p style="font-size:14px;color:#7A6F65;margin:0 0 28px;">${reply_note}</p>
    <p style="font-size:15px;margin:0;">— ${sign_off}<br>
      <a href="mailto:info@groupecomint.com" style="color:#E8651A;">info@groupecomint.com</a><br>
      <a href="https://nuprozone.com" style="color:#E8651A;">nuprozone.com</a>
    </p>
  </div>
  <div style="background:#2C3B2D;padding:12px 32px;font-size:11px;color:rgba(255,255,255,0.4);text-align:center;">
    © ${new Date().getFullYear()} NUPROZ · nuprozone.com
  </div>
</div>`
  }

  // Helper to get display label from value
  const getLabel = (options, value) => {
    const opt = options.find(o => o.value === value)
    return opt ? opt.label : value
  }

  const sendConfirmation = async (f) => {
    try {
      const isFR = lang === 'fr'
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id:  EMAILJS_SERVICE,
          template_id: EMAILJS_TEMPLATE,
          user_id:     EMAILJS_KEY,
          template_params: {
            to_name:      f.name,
            to_email:     f.email,
            from_name:    'NUPROZ Wholesale',
            reply_to:     'info@groupecomint.com',
            subject:      isFR
              ? `Votre demande NUPROZ a bien été reçue — ${f.company}`
              : `Your NUPROZ Wholesale Inquiry has been received — ${f.company}`,
            message_body: buildConfirmationHTML(f, isFR),
          }
        })
      })
    } catch (err) {
      console.warn('Confirmation email failed:', err)
    }
  }

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
        await sendConfirmation(form)
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
              <div className="form-field">
                <label>{t.contact.productInterest} <span className="req">*</span></label>
                <select value={form.productInterest} onChange={set('productInterest')} required>
                  <option value="">{t.contact.productInterestSelect}</option>
                  {t.contact.productOptions.map((o, i) => (
                    <option key={i} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label>{t.contact.heardAbout}</label>
                <select value={form.heardAbout} onChange={set('heardAbout')}>
                  <option value="">{t.contact.heardAboutSelect}</option>
                  {t.contact.heardAboutOptions.map((o, i) => (
                    <option key={i} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label>{t.contact.message}</label>
                <textarea value={form.message} onChange={set('message')} placeholder={t.contact.messagePlaceholder} rows={4} />
              </div>
              {status === 'error' && <p className="contact__error">{t.contact.error}</p>}
              <button type="submit" className="btn btn-primary contact__submit" disabled={status === 'loading'}>
                {status === 'loading' ? <span className="contact__spinner" /> : t.contact.submit}
              </button>
              <p className="contact__privacy">{t.contact.privacy}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
