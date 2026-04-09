import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

/* ── DATA ── */
/* Figma: Featured Products — 5 Article cards, each 306×481px */
const featuredProducts = [
  {
    id: 1,
    name: "CPT: Conjugated Linoleic Acid Supplement",
    cat: "CHOCOLATE MILKSHAKE",
    price: "$9.00",
    stars: 4,
    reviews: 4,
    img: "/images/p11.png",
  },
  {
    id: 2,
    name: "Denzour micronised creatine - 100 g",
    cat: "Art",
    price: "$9.95",
    stars: 4,
    reviews: 3,
    img: "/images/p12.png",
  },
  {
    id: 3,
    name: "ISOCOOL Cold Filtered Protein Isolate",
    cat: "Art",
    price: "$9.00",
    oldPrice: "$29.00",
    badge: "-8%",
    stars: 5,
    reviews: 4,
    img: "/images/p13.png",
  },
  {
    id: 4,
    name: "L-Carnitine: An Amino Acid Supplement for Athletes",
    cat: "Home Accessories",
    price: "$9.00",
    stars: 4,
    reviews: 4,
    img: "/images/p14.png",
  },
  {
    id: 5,
    name: "Mountain Fox - Vector Graphics",
    cat: "Art",
    price: "$9.00",
    stars: 4,
    reviews: 3,
    img: "/images/p15.png",
  },
];

/* Figma: Latest Releases — 4 Article cards, each 385×560px */
const latestReleases = [
  {
    id: 1,
    name: "Ultra Ripped: A Thermogenic Fat Burner",
    cat: "Home Accessories",
    price: "$11.90",
    stars: 5,
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
  },
  {
    id: 2,
    name: "Denzour micronised creatine - 100 g",
    cat: "Art",
    price: "$29.00",
    stars: 4,
    img: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=500&q=80",
  },
  {
    id: 3,
    name: "CLA: Conjugated Linoleic Acid Supplement",
    cat: "Home Accessories",
    price: "$10.12",
    oldPrice: "$11.90",
    badge: "-15%",
    stars: 4,
    img: "https://images.unsplash.com/photo-1601465873862-4f6614d62e48?w=500&q=80",
  },
  {
    id: 4,
    name: "Ultra Ripped: A Thermogenic Fat Burner",
    cat: "Home Accessories",
    price: "$11.90",
    stars: 5,
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
  },
];

/* Figma: Frame 77 — 5 goal banners (Paragraph+Background), 3-col then 2-col grid */
const goalBanners = [
  {
    title: "WEIGHT",
    accent: "MANAGEMENT",
    sub: "10%+ off today",
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80",
    wide: true,
  },
  {
    title: "BUILD",
    accent: "MUSCLE",
    sub: "With the right nutrition",
    img: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80",
    wide: false,
  },
  {
    title: "ACTIVE",
    accent: "LIFESTYLE",
    sub: "Smart, efficient energy",
    img: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&q=80",
    wide: false,
  },
  {
    title: "LEAN",
    accent: "PHYSIQUE",
    sub: "Strength & performance",
    img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80",
    wide: true,
  },
  {
    title: "",
    accent: "ENDURANCE",
    sub: "Fuel for the podium",
    img: "https://images.unsplash.com/photo-1461773518188-b3e86f98242f?w=600&q=80",
    wide: false,
  },
];

/* Figma: Section y=3219, trust strip — 4 items with icons */
const trustItems = [
  { icon: "🚚", title: "FAST DELIVERY", sub: "West & East coast dispatch" },
  {
    icon: "🎁",
    title: "FREE GIFT WITH ORDER $150+",
    sub: "Multiple gift options available",
  },
  { icon: "📦", title: "CLICK & COLLECT", sub: "Check your local stores now" },
  {
    icon: "😊",
    title: "2M+ HAPPY CUSTOMERS",
    sub: "Here to support your journey",
  },
];

/* Figma: Frame 78 y=5334 — merchandise 6 col grid */
const merchandiseItems = [
  {
    label: "Lean Muscle",
    img: "https://images.unsplash.com/photo-1507398941214-572c25a4a232?w=400&q=80",
  },
  {
    label: "Gain Mass",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
  },
  {
    label: "Lose Weight",
    img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&q=80",
  },
  {
    label: "Strength & Endurance",
    img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&q=80",
  },
  {
    label: "Build Muscle",
    img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80",
  },
  {
    label: "Recovery",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
  },
];

/* Figma: Frame 78 blog posts — 2 pairs side by side */
const blogPosts = [
  {
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    cat: "In Sub Category 1",
    title: "Turpis at eleifend leo mi elit Aenean porta ac sed faucibus",
    excerpt:
      "Turpis at eleifend leo mi elit Aenean porta ac sed faucibus. Nunc urna Morbi fringilla vitae orci convallis condimentum auctor sit dui.",
  },
  {
    img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80",
    cat: "In Sub Category 1",
    title: "Morbi condimentum molestie Nam enim odio sodales",
    excerpt:
      "Sed mauris Pellentesque elit Aliquam at lacus interdum nascetur elit ipsum. Enim ipsum hendrerit Suspendisse turpis laoreet fames tempus ligula.",
  },
];

/* Figma: Instagram section — 5 images 296×296 */
const instaImgs = [
  "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
  "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400&q=80",
  "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&q=80",
  "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&q=80",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
];

/* Marquee words — Figma: "Fitness trainings supplements merchandise", font-size 183px */
const marqueeWords1 = [
  "Supplements",
  "Nutrition",
  "Fitness",
  "Trainings",
  "Merchandise",
];
const marqueeWords2 = [
  "Trainings",
  "Merchandise",
  "Strength",
  "Wellness",
  "Performance",
];

function Stars({ count }) {
  return (
    <div className="hm-stars">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={
            n <= count ? "hm-star hm-star--on" : "hm-star hm-star--off"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  const nav = (page, e) => {
    if (e) e.preventDefault();
    window.__navigate && window.__navigate(page);
  };

  return (
    <>
      <Header />

      {/* ══ HERO ══ Figma: image 12, x=0 y=149, w=1920 h=675 */}
      <section className="hm-hero">
        <div className="hm-hero__bg" />
        <div className="hm-hero__overlay" />
        <div className="hm-hero__content">
          {/* Figma: "Smart Fuel sustains IT." small label above title */}
        
          {/* Figma: "Hard Work Creates Strength." — large title, vectorized font */}
          <h1 className="hm-hero__title">
            Hard Work
            <br />
            Creates Strength.
          </h1>
            <p className="hm-hero__label">Smart Fuel Sustains IT.</p>
          <a href="#" className="hm-hero__btn" onClick={(e) => nav("shop", e)}>
            Shop Now
               <img src="/images/arrowdoen.png" alt="" />
            {/* <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg> */}
          </a>
        </div>
      </section>

      {/* ══ FEATURED PRODUCTS ══ Figma: x=120 y=906, w=1680 h=628 */}
      <section className="hm-section hm-featured">
        <div className="hm-section__head">
          {/* Figma: "FEATURED PRODUCTS" heading + "SMART FULL WELLBEING." subtitle */}
          <div>
            <h2 className="hm-section__heading lato">FEATURED PRODUCTS</h2>
            {/* <p className="hm-section__subhead">SMART FULL WELLBEING.</p> */}
          </div>
        </div>
        {/* Figma: Swiper, 5 cards visible, gap=30, each 306×481px */}
        <div className="hm-slider-wrap">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={5}
            slidesOffsetBefore={0}
            slidesOffsetAfter={0}
            navigation={false}
            className="hm-swiper"
            breakpoints={{
              0: { slidesPerView: 1.3, spaceBetween: 12 },
              576: { slidesPerView: 2.2, spaceBetween: 14 },
              768: { slidesPerView: 3.2, spaceBetween: 16 },
              1024: { slidesPerView: 4.2, spaceBetween: 18 },
              1280: { slidesPerView: 5, spaceBetween: 20 },
            }}
          >
            {featuredProducts.map((p) => (
              <SwiperSlide key={p.id}>
                {/* Figma: Article 306×481px, border 1px solid, rounded */}
                <div
                  className="hm-feat-card"
                  onClick={(e) => nav("product", e)}
                >
                  {p.badge && <span className="hm-badge">{p.badge}</span>}
                  
                  <div className="hm-feat-card__body">
                  
                    <p className="hm-feat-card__name">{p.name}</p>
                      <p className="hm-feat-card__cat">{p.cat}</p>
                    <div className="hm-feat-card__img">
                    <img src={p.img} alt={p.name} loading="lazy" />
                  </div>
                    <div className="hm-feat-card__footer">
                      <div className="hm-feat-card__rating">
                        <Stars count={p.stars} />
                        <span className="hm-feat-card__reviews">
                          ({p.reviews}.{p.stars})
                        </span>
                      </div>
                      <div className="hm-feat-card__price-wrap">
                        <span className="hm-feat-card__price">{p.price}</span>
                        {p.oldPrice && (
                          <span className="hm-feat-card__old">
                            {p.oldPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Figma: Group 4 divider — x=145 y=1614, w=1630, two lines */}
      <div className="hm-divider-wrap">
        <div className="hm-divider" />
      </div>

      {/* ══ LATEST RELEASES ══ Figma: Frame 72, x=130 y=1699, w=1660 h=701 */}
      <section className="hm-section hm-latest">
        <div className="hm-section__head">
          <h2 className="hm-section__heading">Latest Releases</h2>
          <a href="#" className="hm-view-all" onClick={(e) => nav("shop", e)}>
            <span>view all products</span>
            <span className="hm-view-all__box">
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </a>
        </div>
        {/* Figma: Section y=120, 4 Article cards 385×560, x offsets: 15/430/845/1260 */}
        <div className="hm-slider-wrap">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={4}
            navigation={false}
            className="hm-swiper"
            breakpoints={{
              0: { slidesPerView: 1.2, spaceBetween: 12 },
              576: { slidesPerView: 2.1, spaceBetween: 14 },
              768: { slidesPerView: 3.1, spaceBetween: 16 },
              1200: { slidesPerView: 4, spaceBetween: 20 },
            }}
          >
            {latestReleases.map((p) => (
              <SwiperSlide key={p.id}>
                <div
                  className="hm-latest-card"
                  onClick={(e) => nav("product", e)}
                >
                  {p.badge && <span className="hm-badge">{p.badge}</span>}
                  <div className="hm-latest-card__img">
                    <img src={p.img} alt={p.name} loading="lazy" />
                  </div>
                  <div className="hm-latest-card__body">
                    <p className="hm-latest-card__cat">{p.cat}</p>
                    <p className="hm-latest-card__name">{p.name}</p>
                    <div className="hm-latest-card__footer">
                      <span className="hm-latest-card__price">{p.price}</span>
                      {p.oldPrice && (
                        <span className="hm-feat-card__old">{p.oldPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ══ GOAL BANNERS ══ Figma: Frame 77, x=114 y=2480 — 5 Paragraph+Background panels */}
      <section className="hm-goals">
        <div className="hm-goals__row hm-goals__row--top">
          {goalBanners.slice(0, 3).map((b, i) => (
            <div
              key={i}
              className={`hm-goal-card${b.wide ? " hm-goal-card--wide" : ""}`}
            >
              <img
                src={b.img}
                alt={b.title}
                loading="lazy"
                className="hm-goal-card__bg"
              />
              <div className="hm-goal-card__overlay" />
              <div className="hm-goal-card__content">
                <h3 className="hm-goal-card__title">
                  {b.title && (
                    <span className="hm-goal-card__line1">{b.title}</span>
                  )}
                  <span className="hm-goal-card__accent">{b.accent}</span>
                </h3>
                <p className="hm-goal-card__sub">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="hm-goals__row hm-goals__row--bottom">
          {goalBanners.slice(3).map((b, i) => (
            <div
              key={i}
              className={`hm-goal-card${b.wide ? " hm-goal-card--wide" : ""}`}
            >
              <img
                src={b.img}
                alt={b.title}
                loading="lazy"
                className="hm-goal-card__bg"
              />
              <div className="hm-goal-card__overlay" />
              <div className="hm-goal-card__content">
                <h3 className="hm-goal-card__title">
                  {b.title && (
                    <span className="hm-goal-card__line1">{b.title}</span>
                  )}
                  <span className="hm-goal-card__accent">{b.accent}</span>
                </h3>
                <p className="hm-goal-card__sub">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ TRUST STRIP ══ Figma: Section x=135 y=3219, w=1650 h=256, 4 VerticalBorder items */}
      <div className="hm-trust">
        {trustItems.map((item, i) => (
          <div key={i} className="hm-trust__item">
            <span className="hm-trust__icon">{item.icon}</span>
            <div>
              <p className="hm-trust__title">{item.title}</p>
              <p className="hm-trust__sub">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ══ TESTIMONIAL ══ Figma: Section x=0 y=3475, w=1920 h=774 */}
      <section className="hm-testimonial">
        <div className="hm-testimonial__inner">
          {/* Figma: Frame 68 — rating block + product image */}
          <div className="hm-testimonial__left">
            <div className="hm-rating-card">
              {/* Figma: ic:round-star top-right 43×43px */}
              <span className="hm-rating-card__star-deco">★</span>
              <span className="hm-rating-card__num">4.9</span>
              <p className="hm-rating-card__label">Clients Reviews</p>
            </div>
            <div className="hm-testimonial__product">
              <img
                src="https://images.unsplash.com/photo-1609016041736-0d4413fa1b63?w=300&q=80"
                alt="Product"
              />
            </div>
          </div>
          {/* Figma: Frame 73 — stars + quote text + author + nav arrows */}
          <div className="hm-testimonial__right">
            <div className="hm-testimonial__stars">★★★★★</div>
            {/* Figma: quote text — Sofia Sans Condensed SemiBold uppercase */}
            <blockquote className="hm-testimonial__quote">
              "THE FACILITIES HERE ARE TOP-NOTCH AND THE STAFF IS ALWAYS
              FRIENDLY AND HELPFUL. I'VE NEVER FELT MORE CONFIDENT"
            </blockquote>
            <div className="hm-testimonial__footer">
              <div className="hm-testimonial__author">
                {/* Figma: icon-park-outline:quote 79×79 */}
                <span className="hm-testimonial__quote-icon">❝</span>
                <div>
                  <p className="hm-testimonial__name">EMERSON ANDERSON</p>
                  <p className="hm-testimonial__role">15th batch student</p>
                </div>
              </div>
              {/* Figma: Frame 76 — 2 arrow buttons stacked, bottom one bg #ddca8a */}
              <div className="hm-testimonial__nav">
                <button className="hm-testimonial__nav-btn">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="12" y1="19" x2="12" y2="5" />
                    <polyline points="5 12 12 5 19 12" />
                  </svg>
                </button>
                <button className="hm-testimonial__nav-btn hm-testimonial__nav-btn--active">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MARQUEE 1 ══ Figma: Frame 76 x=0 y=4339, w=1920 h=207 */}
      <div className="hm-marquee hm-marquee--dark">
        <div className="hm-marquee__track">
          {[...marqueeWords1, ...marqueeWords1].map((w, i) => (
            <span
              key={i}
              className={
                i % 2 === 0
                  ? "hm-marquee__word hm-marquee__word--outline"
                  : "hm-marquee__word hm-marquee__word--ghost"
              }
            >
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* ══ MERCHANDISE ══ Figma: Section x=145 y=4636, w=1630 h=617 */}
      <section className="hm-section hm-merch">
        <div className="hm-section__head">
          <h2 className="hm-section__heading">OUR MERCHANDISE</h2>
        </div>
        {/* Figma: 6-col grid, each item has image + label + shop link */}
        <div className="hm-merch__grid">
          {merchandiseItems.map((item, i) => (
            <div key={i} className="hm-merch__item">
              <div className="hm-merch__img">
                <img src={item.img} alt={item.label} loading="lazy" />
              </div>
              <p className="hm-merch__label">{item.label}</p>
              <a
                href="#"
                className="hm-merch__link"
                onClick={(e) => nav("shop", e)}
              >
                shop now
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ══ MARQUEE 2 ══ Figma: Frame 81 x=0 y=6004, reverse direction */}
      <div className="hm-marquee hm-marquee--dark">
        <div className="hm-marquee__track hm-marquee__track--reverse">
          {[...marqueeWords2, ...marqueeWords2].map((w, i) => (
            <span
              key={i}
              className={
                i % 3 === 0
                  ? "hm-marquee__word hm-marquee__word--gold-outline"
                  : i % 3 === 1
                    ? "hm-marquee__word hm-marquee__word--outline"
                    : "hm-marquee__word hm-marquee__word--ghost"
              }
            >
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* ══ BLOG ══ Figma: Frame 78 x=130 y=5334, w=1660 h=580 */}
      <section className="hm-section hm-blog">
        <div className="hm-section__head">
          <h2 className="hm-section__heading">READ THE LATEST</h2>
          <a href="#" className="hm-view-all" onClick={(e) => nav("blog", e)}>
            <span>view all posts</span>
            <span className="hm-view-all__box">
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </a>
        </div>
        {/* Figma: 2 side-by-side pairs, each pair = 380px image + text column */}
        <div className="hm-blog__grid">
          {blogPosts.map((post, i) => (
            <div key={i} className="hm-blog__pair">
              {/* Figma: Link image 380×439 */}
              <div className="hm-blog__img">
                <img src={post.img} alt={post.title} loading="lazy" />
              </div>
              <div className="hm-blog__text">
                {/* Figma: "Background+Border" category tag */}
                <span className="hm-blog__cat">{post.cat}</span>
                {/* Figma: Heading 5 text */}
                <h3 className="hm-blog__title">{post.title}</h3>
                <p className="hm-blog__excerpt">{post.excerpt}</p>
                <a
                  href="#"
                  className="hm-blog__more"
                  onClick={(e) => nav("blog", e)}
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ INSTAGRAM ══ Figma: Frame 80 x=145 y=6301, w=1630 h=396 */}
      <section className="hm-section hm-insta">
        {/* Figma: "Check out our Instagram @nutreko" centered heading */}
        <p className="hm-insta__label">
          Check out our Instagram <a href="#">@nutreko</a>
        </p>
        {/* Figma: 5 images 296×296, gap ≈25 */}
        <div className="hm-insta__grid">
          {instaImgs.map((src, i) => (
            <div key={i} className="hm-insta__item">
              <img src={src} alt={`Instagram ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
