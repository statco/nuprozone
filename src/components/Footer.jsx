import './Footer.css'

export default function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <img src="/logo.png" alt="NUPROZ" height="48" />
          <p className="footer__tagline">{t.footer.tagline}</p>
        </div>
        <div className="footer__links">
          <div className="footer__col">
            <h4>NUPROZ</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#why">Wholesale</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:info@nuprozone.com">{t.footer.email}</a></li>
              <li><span>{t.footer.address}</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__soap-bar">
        <div className="footer__soap-segment footer__soap-segment--1" />
        <div className="footer__soap-segment footer__soap-segment--2" />
        <div className="footer__soap-segment footer__soap-segment--3" />
        <div className="footer__soap-segment footer__soap-segment--4" />
        <div className="footer__soap-segment footer__soap-segment--5" />
      </div>
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} NUPROZ · Nuprozone.com · {t.footer.rights}</span>
        <a href="#home">{t.footer.privacy}</a>
      </div>
    </footer>
  )
}
