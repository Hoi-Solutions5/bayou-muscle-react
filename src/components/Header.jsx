import { useState } from 'react';

/* Figma asset URLs — node 67:1600 */
const imgLogoVector = '/images/logo.png';
const imgLogoVector1 = 'https://www.figma.com/api/mcp/asset/8ca15b68-2ac7-479c-a975-997586d3cace';
const imgSearchIcon = 'https://www.figma.com/api/mcp/asset/36767264-37ef-40ad-8632-02015c05df00';
const imgLangFlag = 'https://www.figma.com/api/mcp/asset/2c95ddf6-0f53-4071-beb7-688cc7188a16';
const imgAccountIcon = 'https://www.figma.com/api/mcp/asset/62702c58-0f8e-42f8-b8f5-bcc9bbe9e6ce';
const imgCartIcon = 'https://www.figma.com/api/mcp/asset/4e2acb75-c1e1-4402-b18a-69be006e79e8';
const imgCheckIcon = 'https://www.figma.com/api/mcp/asset/2ce67e3d-0985-403d-a018-c7b1f1f09d6c';
const imgGiftIcon = 'https://www.figma.com/api/mcp/asset/ea8db535-cd38-4a8b-80cf-1f8cb8363ee5';
const imgPayIcon = 'https://www.figma.com/api/mcp/asset/73bddb70-03d1-4986-8b3b-ade849c76243';

/* Figma: 3 unique items, each with its own icon — duplicated for marquee */
const topbarItems = [
  { text: 'Free UK standard delivery on orders over $100', icon: imgCheckIcon },
  { text: 'Free gift when you spend over $150', icon: imgGiftIcon },
  { text: 'All payments accepted', icon: imgPayIcon },
];
/* 8 copies total = 3 unique × 2 sets (duplicate for seamless loop) */
const marqueeItems = [...topbarItems, ...topbarItems, ...topbarItems];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount] = useState(0);

  const nav = (page, e) => {
    if (e) e.preventDefault();
    setMobileOpen(false);
    window.__navigate && window.__navigate(page);
  };

  return (
    <header className="hdr">
      {/* ── TOP BAR ── Figma: bg #ddca8a, h=48px (Section h=78 includes overlap) */}
      <div className="hdr__topbar">
        <div className="hdr__topbar-track">
          <div className="hdr__topbar-inner">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="hdr__topbar-item">
                {/* Figma: Icon 19×19, flipped vertically */}
                <img src={item.icon} alt="" className="hdr__topbar-icon" />
                {/* Figma: Instrument Sans Medium 14px, line-height 20px, #000 */}
                <span className="hdr__topbar-text">{item.text}</span>
                {/* Figma: dot 5×5px, bg #000, border-radius 2.5px */}
                <span className="hdr__topbar-dot" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN NAV ── Figma: bg #fff, h=96px, top=53, border-radius 40px 40px 0 0 */}
      <div className="hdr__main">
        <div className="hdr__main-inner">

          {/* Left nav — Figma: x=145, Sofia Sans Condensed Bold 22px, line-height 20px, #000 */}
          <nav className="hdr__nav">
            {[
              { label: 'Supplements', page: 'shop' },
              { label: 'Merchandise', page: 'home' },
              { label: 'About', page: 'product' },
              { label: 'Contact', page: 'contact' },
            ].map(({ label, page }) => (
              <a
                key={label}
                href="#"
                className="hdr__nav-link"
                onClick={e => nav(page, e)}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Logo — Figma: centered x=908, w=104 h=63 vectorized SVG */}
          <a href="/" className="hdr__logo" onClick={e => nav('home', e)}>
            <div className="hdr__logo-img">
              <img src={imgLogoVector} alt="Bayou Muscle" className="hdr__logo-vec hdr__logo-vec--main" />
              {/* <img src={imgLogoVector1} alt="" className="hdr__logo-vec hdr__logo-vec--sub" /> */}
            </div>
          </a>

          {/* Right controls */}
          <div className="hdr__controls">
            {/* Search — Figma: x=1327.67, w=266 h=40, rounded 5px */}
            <div className="hdr__search">
              <input
                type="text"
                placeholder="Search our catalog"
                className="hdr__search-input"
                aria-label="Search"
              />
              {/* Figma: search icon x=246, 20×21 */}
              <button className="hdr__search-btn" aria-label="Submit search">
                <img src={imgSearchIcon} alt="" className="hdr__search-icon" />
              </button>
            </div>

            {/* Lang — Figma: VerticalBorder x=1615.67, border-left #e9e9e9 1px, w=47 h=24 */}
            <div className="hdr__lang">
              <img src={imgLangFlag} alt="Language" className="hdr__lang-flag" />
            </div>

            {/* Account — Figma: Link x=1682.67, size=30px */}
            <button
              className="hdr__icon-btn"
              aria-label="Account"
              onClick={e => nav('contact', e)}
            >
              <img src={imgAccountIcon} alt="" className="hdr__icon-img" />
            </button>

            {/* Cart — Figma: bg #d0b77f, w=47.25 h=48, border-radius 23.81px */}
            <button
              className="hdr__cart-btn"
              aria-label="Cart"
              onClick={e => nav('cart', e)}
            >
              <img src={imgCartIcon} alt="" className="hdr__cart-icon" />
              {/* Badge — Figma: bg #ee440e, size=17px, Arial Bold 10px white, right=133.08 top=23.53 */}
              <span className="hdr__cart-badge">{cartCount}</span>
            </button>

            {/* Hamburger — mobile only */}
            <button
              className="hdr__hamburger"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen(v => !v)}
            >
              <span className={`hdr__ham-line${mobileOpen ? ' is-open' : ''}`} />
              <span className={`hdr__ham-line${mobileOpen ? ' is-open' : ''}`} />
              <span className={`hdr__ham-line${mobileOpen ? ' is-open' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="hdr__drawer-overlay" onClick={() => setMobileOpen(false)}>
          <nav className="hdr__drawer" onClick={e => e.stopPropagation()}>
            <div className="hdr__drawer-head">
              <span className="hdr__drawer-logo">BAYOU <span>MUSCLE</span></span>
              <button className="hdr__drawer-close" onClick={() => setMobileOpen(false)}>✕</button>
            </div>
            {[
              { label: 'Home', page: 'home' },
              { label: 'Supplements', page: 'shop' },
              { label: 'Blog', page: 'blog' },
              { label: 'Contact', page: 'contact' },
              { label: 'Cart', page: 'cart' },
            ].map(({ label, page }) => (
              <a key={page} href="#" className="hdr__drawer-link" onClick={e => nav(page, e)}>
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
