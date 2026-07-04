import { useEffect } from 'react'
import { animate, stagger } from 'animejs'
import ModelViewer from '../../components/ModelViewer/ModelViewer.jsx'
import { useLang } from '../../i18n.jsx'
import './PerfumePage.css'

const notesEn = [
  { title: 'Top Notes', items: ['Driftwood', 'Myrtle'] },
  { title: 'Middle Notes', items: ['Seaweed', 'Houttuynia Cordata'] },
  { title: 'Base Notes', items: ['Musk', 'Water Lily'] },
]

const notesZh = [
  { title: '前调', items: ['漂流木', '桃金娘'] },
  { title: '中调', items: ['海藻', '鱼腥草'] },
  { title: '基调', items: ['麝香', '莲花'] },
]

const revealConfig = {
  opacity: [0, 1],
  translateY: [24, 0],
  delay: stagger(110, { start: 120 }),
  duration: 850,
  ease: 'out(3)',
}

const PerfumePage = () => {
  const { lang } = useLang()
  const notes = lang === 'zh' ? notesZh : notesEn

  useEffect(() => {
    document.title = 'Perfume — Len Yitai Ma'

    // Hero copy animates in on load.
    animate('.perfume-hero .reveal > *', { ...revealConfig, delay: stagger(110, { start: 200 }) })

    // Every other section animates in when it scrolls into view.
    const sections = document.querySelectorAll('.perfume-reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          animate(Array.from(entry.target.querySelectorAll('.reveal > *')), revealConfig)
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.3 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="perfume-page">
      <section className="perfume-hero">
        <div className="perfume-hero-media">
          <img src="/assets/works/fashion/Perfume/0.jpg" alt="MER D'HIVER" />
        </div>
        <div className="perfume-hero-overlay">
          <div className="perfume-hero-copy reveal">
            <p className="eyebrow">Eau De Parfum</p>
            <h1>MER D'HIVER</h1>
            <p className="perfume-hero-sub">{lang === 'zh' ? '记忆的衍生—冬日海' : 'An extension of memory'}</p>
          </div>
        </div>
      </section>

      <section className="perfume-band perfume-reveal">
        <img src="/assets/works/fashion/Perfume/1.jpg" alt="MER D'HIVER" />
        <div className="band-copy reveal">
          {lang === 'zh' ? (
            <>
              <p>
                童年的海岸，<br />
                阴冷的沙滩，<br />
                咸腥的海风，<br />
                冰冷的海水。
              </p>
              <p>
                母亲的记忆，<br />
                母亲的温度，<br />
                母亲的怀抱，<br />
                母亲的抚摸。
              </p>
              <p>
                沙子，壳类，海藻，<br />
                寒日，寒风，
              </p>
              <p>
                潮湿的，黏腻的，遥远的，模糊的，迷茫的，不假思索的
              </p>
            </>
          ) : (
            <>
              <p>
                The coast of my childhood:<br />
                A cold, dim beach.<br />
                The briny breath.<br />
                The icy sea.
              </p>
              <p>
                The memory of my mother.<br />
                Her warmth,<br />
                her embrace,<br />
                Her touch.
              </p>
              <p>
                Sand, shells, seaweed,<br />
                a winter sun, a winter wind.
              </p>
              <p>
                Damp, sticky, distant, blurred, wandering, instinctive.<br />
                Together, my Mer D'Hiver is derived from these notes.
              </p>
            </>
          )}
        </div>
      </section>

      <section className="perfume-split perfume-reveal">
        <div className="perfume-split-image">
          <img src="/assets/works/fashion/Perfume/2.jpg" alt="MER D'HIVER" />
        </div>
        <div className="perfume-split-copy reveal">
          {notes.map((group) => (
            <div className="perfume-note-group" key={group.title}>
              <h3>{group.title}</h3>
              {group.items.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="perfume-duo perfume-reveal">
        <div className="perfume-duo-img reveal">
          <img src="/assets/works/fashion/Perfume/11.png" alt="MER D'HIVER packaging" />
        </div>
        <div className="perfume-duo-img reveal">
          <img src="/assets/works/fashion/Perfume/9.jpg" alt="MER D'HIVER" />
        </div>
      </section>

      <section className="perfume-duo perfume-reveal">
        <div className="perfume-model-canvas">
          <ModelViewer />
        </div>
        <div className="perfume-duo-img reveal">
          <img src="/assets/works/fashion/Perfume/7.jpg" alt="MER D'HIVER" />
        </div>
      </section>

      <section className="perfume-duo perfume-reveal">
        <div className="perfume-duo-img reveal">
          <img src="/assets/works/fashion/Perfume/4.jpg" alt="MER D'HIVER" />
        </div>
        <div className="perfume-duo-right">
          <div className="perfume-duo-img reveal">
            <img src="/assets/works/fashion/Perfume/10.jpg" alt="MER D'HIVER" />
          </div>
          <div className="perfume-duo-img reveal">
            <img src="/assets/works/fashion/Perfume/6.jpg" alt="MER D'HIVER" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default PerfumePage
