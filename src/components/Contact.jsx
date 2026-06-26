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

  const sendConfirmation = async (formData) => {
    try {
      const isFR = lang === 'fr'
      const templateParams = {
        to_name:    formData.name,
        to_email:   formData.email,
        company:    formData.company,
        country:    formData.country,
        volume:     formData.volume,
        product:    formData.productInterest,
        message:    formData.message,
        // Bilingual content passed to template
        subject:    isFR
          ? `Votre demande NUPROZ a bien été reçue`
          : `Your NUPROZ Wholesale Inquiry has been received`,
        greeting:   isFF => isFF
          ? `Bonjour ${formData.name},`
          : `Hi ${formData.name},`,
        body_line1: isFF => isFF
          ? `Merci de nous avoir contacté. Nous avons bien reçu votre demande de la part de ${formData.company} et vous répondrons dans 1 à 2 jours ouvrables avec les tarifs, les MOQs et les détails du catalogue.`
          : `Thank you for reaching out. We have received your wholesale inquiry from ${formData.company} and will respond within 1–2 business days with pricing, MOQs, and catalogue details.`,
        label_product: isFF => isFF ? `Produit d'intérêt` : `Product interest`,
        label_volume:  isFF => isFF ? `Volume estimé` : `Estimated volume`,
        label_country: isFF => isFF ? `Pays` : `Country`,
        reply_note: isFF => isFF
          ? `Vous pouvez répondre directement à cet email pour toute question.`
          : `You can reply directly to this email with any questions.`,
        sign_off: `— The NUPROZ Team\ninfo@groupecomint.com\nnuprozone.com`,
        // Simple flat versions for basic templates
        greeting_text:   isFF => isFF ? `Bonjour ${formData.name},` : `Hi ${formData.name},`,
        confirmation_en: `Thank you for your wholesale inquiry. We received your request from ${formData.company} (${formData.country}) and will be in touch within 1–2 business days with pricing and catalogue details.\n\nProduct interest: ${formData.productInterest}\nEstimated volume: ${formData.volume}\n\n— The NUPROZ Team\ninfo@groupecomint.com | nuprozone.com`,
        confirmation_fr: `Merci pour votre demande grossiste. Nous avons reçu votre demande de ${formData.company} (${formData.country}) et vous répondrons dans 1 à 2 jours ouvrables avec les tarifs et le catalogue.\n\nProduit d'intérêt: ${formData.productInterest}\nVolume estimé: ${formData.volume}\n\n— L'équipe NUPROZ\ninfo@groupecomint.com | nuprozone.com`,
        message_body: isFF
          ? `Merci pour votre demande grossiste. Nous avons reçu votre demande de ${formData.company} (${formData.country}) et vous répondrons dans 1 à 2 jours ouvrables avec les tarifs et le catalogue.\n\nProduit d\u2019intérêt: ${formData.productInterest}\nVolume estimé: ${formData.volume}${formData.message ? '\n\nMessage: ' + formData.message : ''}\n\n— L\u2019équipe NUPROZ\ninfo@groupecomint.com | nuprozone.com`
          : `Thank you for your wholesale inquiry. We received your request from ${formData.company} (${formData.country}) and will be in touch within 1–2 business days with pricing and catalogue details.\n\nProduct interest: ${formData.productInterest}\nEstimated volume: ${formData.volume}${formData.message ? '\n\nMessage: ' + formData.message : ''}\n\n— The NUPROZ Team\ninfo@groupecomint.com | nuprozone.com`,
        reply_to: 'info@groupecomint.com',
        from_name: 'NUPROZ Wholesale',
      }

      // Use true/false for isFF since we already have isFF as variable
      const isFF = isFF => isFF

      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id:  EMAILJS_SERVICE,
          template_id: EMAILJS_TEMPLATE,
          user_id:     EMAILJS_KEY,
          template_params: {
            to_name:      formData.name,
            to_email:     formData.email,
            from_name:    'NUPROZ Wholesale',
            reply_to:     'info@groupecomint.com',
            subject:      lang === 'fr'
              ? 'Votre demande NUPROZ a bien été reçue'
              : 'Your NUPROZ Wholesale Inquiry has been received',
            message_body: lang === 'fr'
              ? `Bonjour ${formData.name},\n\nMerci de nous avoir contacté. Nous avons bien reçu votre demande de la part de ${formData.company} (${formData.country}) et vous répondrons dans 1 à 2 jours ouvrables avec les tarifs, les MOQs et les détails du catalogue.\n\nProduit d\u2019intérêt\u00a0: ${formData.productInterest}\nVolume estimé\u00a0: ${formData.volume}${formData.message ? '\n\nVotre message\u00a0: ' + formData.message : ''}\n\nVous pouvez répondre directement à cet email pour toute question.\n\n— L\u2019équipe NUPROZ\ninfo@groupecomint.com\nnuprozone.com`
              : `Hi ${formData.name},\n\nThank you for reaching out to NUPROZ. We have received your wholesale inquiry from ${formData.company} (${formData.country}) and will respond within 1–2 business days with pricing, MOQs, and catalogue details.\n\nProduct interest: ${formData.productInterest}\nEstimated volume: ${formData.volume}${formData.message ? '\n\nYour message: ' + formData.message : ''}\n\nFeel free to reply directly to this email with any questions.\n\n— The NUPROZ Team\ninfo@groupecomint.com\nnuprozone.com`,
          }
        })
      })
    } catch (err) {
      // Confirmation email failure is non-blocking — form still succeeds
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
        // Send buyer confirmation via EmailJS (non-blocking)
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
                <textarea
                  value={form.message}
                  onChange={set('message')}
                  placeholder={t.contact.messagePlaceholder}
                  rows={4}
                />
              </div>
              {status === 'error' && (
                <p className="contact__error">{t.contact.error}</p>
              )}
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
