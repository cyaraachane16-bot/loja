import { useEffect, useMemo, useState } from 'react'
import { useStore } from '../context/StoreContext'
import { IconChevronLeft, IconChevronRight } from './icons'
import { productImageUrl } from '../api'
import { BANNERS_ESQ, BANNERS_DIR, produtosDoBanner } from '../config/banners'

const defaultSlides = [
  {
    tag: 'CYARA x NOVA COLEÇÃO',
    title: 'CYARA',
    subtitle: 'Viva o lar e os looks do seu jeito.',
    cta: 'COMPRE AGORA',
    bg: 'var(--gradiente-hero)',
  },
]

function buildSlides(products, banner) {
  if (!banner) return []
  return produtosDoBanner(products, banner).map((p) => ({
    tag: banner.heroTag,
    title: 'CYARA',
    subtitle: p.name,
    cta: 'COMPRE AGORA',
    image: productImageUrl(p.image),
    product: p,
  }))
}


export default function HeroSection({ products = [] }) {
  const { handlers, activeHeroBanner } = useStore()

  const slidesPorBanner = useMemo(() => {
    const map = {}
    for (const b of [...BANNERS_ESQ, ...BANNERS_DIR]) {
      map[b.id] = buildSlides(products, b)
    }
    return map
  }, [products])

  const heroSlides = useMemo(() => {
    const destacados = products
      .filter((p) => p.image)
      .slice(0, 8)
      .map((p) => ({
        tag: 'CYARA x DESTAQUE',
        title: 'CYARA',
        subtitle: p.name,
        cta: 'COMPRE AGORA',
        image: productImageUrl(p.image),
        product: p,
      }))
    return destacados.length > 0 ? destacados : defaultSlides
  }, [products])

  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(0)
  }, [heroSlides.length])

  useEffect(() => {
    if (heroSlides.length <= 1) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  const slide = heroSlides[index]

  return (
    <section className="cyara-hero">
      <div className="cyara-container pt-2 pb-3">
        <div className="cyara-hero__desktop">
          <div className="cyara-hero__col-banners cyara-hero__col-banners--esq">
            <BannerColumn
              banners={BANNERS_ESQ}
              slidesPorBanner={slidesPorBanner}
              activeHeroBanner={activeHeroBanner}
              baseClass="cyara-banner-esq"
              onBanner={(title) => handlers.bannerEsq(title)}
            />
          </div>

          <MainCarousel
            slide={slide}
            slides={heroSlides}
            index={index}
            setIndex={setIndex}
            handlers={handlers}
          />

          <div className="cyara-hero__col-banners cyara-hero__col-banners--dir">
            <BannerColumn
              banners={BANNERS_DIR}
              slidesPorBanner={slidesPorBanner}
              activeHeroBanner={activeHeroBanner}
              baseClass="cyara-banner-dir"
              onBanner={(title) => handlers.bannerDir(title)}
            />
          </div>
        </div>

        <div className="cyara-hero__mobile">
          <MainCarousel
            slide={slide}
            slides={heroSlides}
            index={index}
            setIndex={setIndex}
            handlers={handlers}
            mobile
          />
          <div className="cyara-hero__mobile-banners">
            <div className="cyara-hero__col-banners cyara-hero__col-banners--esq">
              <BannerColumn
                banners={BANNERS_ESQ}
                slidesPorBanner={slidesPorBanner}
                activeHeroBanner={activeHeroBanner}
                baseClass="cyara-banner-esq cyara-banner-esq--mobile"
                onBanner={(title) => handlers.bannerEsq(title)}
              />
            </div>
            <div className="cyara-hero__col-banners cyara-hero__col-banners--dir">
              <BannerColumn
                banners={BANNERS_DIR}
                slidesPorBanner={slidesPorBanner}
                activeHeroBanner={activeHeroBanner}
                baseClass="cyara-banner-dir cyara-banner-esq--mobile"
                onBanner={(title) => handlers.bannerDir(title)}
              />
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="cyara-tab-desconto"
        onClick={handlers.desconto}
      >
        GANHE 12% OFF
      </button>
    </section>
  )
}

function BannerColumn({
  banners,
  slidesPorBanner,
  activeHeroBanner,
  baseClass,
  onBanner,
}) {
  return banners.map((b) => {
    const slides = slidesPorBanner[b.id] || []
    const active = activeHeroBanner === b.id
    return (
      <CyaraSlideBanner
        key={b.id}
        title={b.title}
        slides={slides}
        active={active}
        baseClass={baseClass}
        onClick={() => onBanner(b.title)}
      />
    )
  })
}

function CyaraSlideBanner({ title, slides, active, baseClass, onClick }) {
  const [miniIndex, setMiniIndex] = useState(0)

  useEffect(() => {
    setMiniIndex(0)
  }, [slides.length])

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setMiniIndex((i) => (i + 1) % slides.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [slides.length])

  const img = slides[miniIndex]?.image

  return (
    <button
      type="button"
      className={`${baseClass} cyara-banner-trends cyara-banner-slot ${active ? 'cyara-banner-trends--active' : ''}`}
      onClick={onClick}
    >
      {img && (
        <img src={img} alt="" className="cyara-banner-trends__img" />
      )}
      <div className="cyara-banner-trends__overlay" />
      <span className="cyara-banner__titulo cyara-banner-trends__label">
        {title}
      </span>
      {slides.length > 1 && (
        <div className="cyara-banner-trends__dots">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`cyara-banner-trends__dot ${i === miniIndex ? 'cyara-banner-trends__dot--on' : ''}`}
            />
          ))}
        </div>
      )}
    </button>
  )
}

function MainCarousel({ slide, slides, index, setIndex, handlers, mobile }) {
  return (
    <div
      className={`cyara-carousel group ${mobile ? 'cyara-carousel--mobile' : ''}`}
    >
      {slide.image ? (
        <img
          key={slide.image}
          src={slide.image}
          alt=""
          className="cyara-img-hero cyara-img-hero--fade"
          loading="eager"
          decoding="async"
        />
      ) : (
        <div className="absolute inset-0" style={{ background: slide.bg }} />
      )}
      <div className="cyara-carousel__overlay" />

      <div className="cyara-carousel__content">
        <p className="cyara-carousel__tag">{slide.tag}</p>
        <h2 className="cyara-carousel__title">{slide.title}</h2>
        <p className="cyara-carousel__subtitle">{slide.subtitle}</p>
        <button
          type="button"
          className="cyara-btn-cta"
          onClick={() => handlers.comprarAgora(slide)}
        >
          {slide.cta || 'COMPRE AGORA'}
        </button>
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            className="cyara-btn-seta cyara-btn-seta--esq"
            onClick={() => handlers.slideAnterior(index, slides.length, setIndex)}
            aria-label="Anterior"
          >
            <IconChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="cyara-btn-seta cyara-btn-seta--dir"
            onClick={() => handlers.slideSeguinte(index, slides.length, setIndex)}
            aria-label="Seguinte"
          >
            <IconChevronRight className="w-4 h-4" />
          </button>

          <div className="cyara-carousel__dots">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handlers.irSlide(i, setIndex)}
                className={`cyara-dot ${i === index ? 'cyara-dot--active' : ''}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
