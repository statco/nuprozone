import './TrustBar.css'

const icons = {
  cruelty: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  skin: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
    </svg>
  ),
  natural: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22V12M12 12C12 12 7 9 5 5c0 0 5 1 7 7zM12 12c0 0 5-3 7-7 0 0-5 1-7 7z"/>
    </svg>
  ),
  export: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  )
}

export default function TrustBar({ t }) {
  const items = [
    { icon: icons.cruelty, label: t.trust.t1 },
    { icon: icons.skin, label: t.trust.t2 },
    { icon: icons.natural, label: t.trust.t3 },
    { icon: icons.export, label: t.trust.t4 },
  ]
  return (
    <div className="trust-bar">
      {items.map((item, i) => (
        <div key={i} className="trust-bar__item">
          <span className="trust-bar__icon">{item.icon}</span>
          <span className="trust-bar__label">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
