import { useEffect } from 'react'
import { animate, stagger } from 'animejs'
import './ContactPage.css'

const ContactPage = () => {
  useEffect(() => {
    document.title = 'Credits — Len Yitai Ma'

    animate('.credits-copy > *', {
      opacity: [0, 1],
      translateY: [24, 0],
      delay: stagger(110, { start: 200 }),
      duration: 850,
      ease: 'out(3)',
    })
  }, [])

  return (
    <div className="contact-page">
      <section className="credits" id="credits">
        <div className="credits-media">
          <img src="/assets/credits-editorial.jpg" alt="Editorial credit page image" />
        </div>
        <div className="credits-copy">
          <p className="eyebrow">Credits</p>
          <h2>Creative team</h2>
          <div className="credit-list">
            <p><span>Designer</span> Len Yitai Ma</p>
            <p><span>Photographer</span> Tong Yu</p>
            <p><span>Videographer</span> Sheen Zhang</p>
            <p><span>Hair / Makeup</span> M.</p>
            <p><span>Models</span> Yaoyu Yang, Jiabao Wang, Vali Patova</p>
            <p><span>Assistant</span> WDW</p>
            <p><span>Sponsors</span> Haijing Xie, Alan Ma</p>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Len Yitai Ma. RepliFa.</p>
      </footer>
    </div>
  )
}

export default ContactPage
