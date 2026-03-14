"use client"

import {
  memo,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion"

// ─── Hooks ────────────────────────────────────────────────────────────────────

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

const IS_SERVER = typeof window === "undefined"

function useMediaQuery(query: string, defaultValue = false): boolean {
  const getMatches = () =>
    IS_SERVER ? defaultValue : window.matchMedia(query).matches
  const [matches, setMatches] = useState<boolean>(getMatches)

  useIsomorphicLayoutEffect(() => {
    const mm = window.matchMedia(query)
    const onChange = () => setMatches(mm.matches)
    mm.addEventListener("change", onChange)
    return () => mm.removeEventListener("change", onChange)
  }, [query])

  return matches
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SkillItem {
  name: string
  logo: string | null
}

// ─── Constants ────────────────────────────────────────────────────────────────

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1] as const }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }

function makeTextLogo(name: string): string {
  const fontSize = name.length > 8 ? 20 : name.length > 5 ? 26 : 34
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" rx="16" fill="#1e293b"/><text x="100" y="100" font-family="system-ui,sans-serif" font-size="${fontSize}" font-weight="800" fill="#e2e8f0" text-anchor="middle" dominant-baseline="middle">${name}</text></svg>`
  const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
  return dataUrl
}

// ─── Inner Carousel ──────────────────────────────────────────────────────────

const Carousel = memo(
  ({
    handleClick,
    controls,
    cards,
    isCarouselActive,
    rotation,
    onDragStart,
    onDragEnd,
  }: {
    handleClick: (imgUrl: string, index: number) => void
    controls: ReturnType<typeof useAnimation>
    cards: Array<{ url: string; name: string }>
    isCarouselActive: boolean
    rotation: MotionValue<number>
    onDragStart: () => void
    onDragEnd: (velocityX: number) => void
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const isScreenSizeMd = useMediaQuery("(max-width: 1024px)")
    const cylinderWidth = isScreenSizeSm ? 1100 : isScreenSizeMd ? 1400 : 1800
    const faceCount = cards.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    return (
      <div
        className="flex h-full items-center justify-center"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDragStart={onDragStart}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(rotation.get() + info.delta.x * 0.5)
          }
          onDragEnd={(_, info) =>
            isCarouselActive && onDragEnd(info.velocity.x)
          }
          animate={controls}
        >
          {cards.map((card, i) => (
            <motion.div
              key={`key-${i}-${card.url}`}
              className="absolute flex h-full origin-center items-center justify-center rounded-xl p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(card.url, i)}
            >
              <div className="w-full aspect-square rounded-xl bg-white flex items-center justify-center p-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  src={card.url}
                  alt={card.name}
                  layoutId={`img-${i}-${card.name}`}
                  className="pointer-events-none w-full h-full object-contain"
                  initial={{ filter: "blur(4px)", opacity: 0 }}
                  layout={card.url.startsWith("data:") ? undefined : "position"}
                  animate={{ filter: "blur(0px)", opacity: 1 }}
                  transition={transition}
                  onLoad={(e) => {
                    const el = e.currentTarget
                  }}
                  onError={(e) => {
                    const el = e.currentTarget
                    
                    if (!el.src.startsWith("data:")) {
                      const textLogo = makeTextLogo(el.alt)
                      el.src = textLogo
                    }
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)
Carousel.displayName = "Carousel"

// ─── Photo Carousel Base ─────────────────────────────────────────────────────

function PhotoCarouselBase({
  cards,
  carouselKey,
}: {
  cards: Array<{ url: string; name: string }>
  carouselKey?: string
}) {
  const [activeImg, setActiveImg] = useState<string | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const controls = useAnimation()
  const rotation = useMotionValue(0)
  const isDragging = useRef(false)
  const isSpring = useRef(false)

  // Auto-rotate via rAF — pauses during drag, spring-settle, and overlay
  useEffect(() => {
    let rafId: number
    const tick = () => {
      if (!isDragging.current && !isSpring.current && isCarouselActive) {
        rotation.set(rotation.get() - 0.25)
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [rotation, isCarouselActive])

  const handleClick = (imgUrl: string) => {
    setActiveImg(imgUrl)
    setIsCarouselActive(false)
    controls.stop()
  }

  const handleClose = () => {
    setActiveImg(null)
    setIsCarouselActive(true)
  }

  const handleDragStart = () => {
    isDragging.current = true
    isSpring.current = false
  }

  const handleDragEnd = (velocityX: number) => {
    isDragging.current = false
    isSpring.current = true
    controls
      .start({
        rotateY: rotation.get() + velocityX * 0.05,
        transition: { type: "spring", stiffness: 100, damping: 30, mass: 0.1 },
      })
      .then(() => {
        isSpring.current = false
      })
  }

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeImg && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            layoutId={`img-container-${activeImg}`}
            layout="position"
            onClick={handleClose}
            className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 m-5 sm:m-8 md:m-16 lg:mx-40 xl:mx-56 rounded-3xl"
            style={{ willChange: "opacity" }}
            transition={transitionOverlay}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              layoutId={`img-${activeImg}`}
              src={activeImg}
              className="max-w-full max-h-full rounded-lg shadow-lg"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.5,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{ willChange: "transform" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative h-[500px] w-full overflow-hidden">
        <Carousel
          key={carouselKey}
          handleClick={handleClick}
          controls={controls}
          cards={cards}
          isCarouselActive={isCarouselActive}
          rotation={rotation}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      </div>
    </motion.div>
  )
}

// ─── SkillCarousel ────────────────────────────────────────────────────────────

export interface SkillCarouselProps {
  skills: SkillItem[]
  accentColor: string
}

const MIN_CARDS = 12

export function SkillCarousel({ skills }: SkillCarouselProps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cards = useMemo(() => {
    const padded: SkillItem[] = []
    while (padded.length < MIN_CARDS) padded.push(...skills)
    const sliced = padded.slice(0, Math.max(MIN_CARDS, skills.length))
    return sliced.map((skill) => ({
      url: skill.logo ?? makeTextLogo(skill.name),
      name: skill.name,
    }))
  }, [skills.map((s) => s.name).join(",")])

  return (
    <PhotoCarouselBase
      cards={cards}
      carouselKey={skills.map((s) => s.name).join("-")}
    />
  )
}

// ─── ThreeDPhotoCarousel (standalone) ─────────────────────────────────────────

const defaultKeywords = [
  "night",
  "city",
  "sky",
  "sunset",
  "sunrise",
  "winter",
  "skyscraper",
  "building",
  "cityscape",
  "architecture",
  "street",
  "lights",
  "downtown",
  "bridge",
]

function ThreeDPhotoCarousel() {
  const cards = useMemo(
    () =>
      defaultKeywords.map((keyword) => ({
        url: `https://picsum.photos/seed/${keyword}/300/300`,
        name: keyword,
      })),
    []
  )

  return <PhotoCarouselBase cards={cards} />
}

export { ThreeDPhotoCarousel }
