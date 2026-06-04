import { useEffect } from 'react'
import './ContactPage.css'

const ContactPage = () => {
  useEffect(() => {
    document.title = 'Credits — Len Yitai Ma'
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
          <div className="contact-card">
            <h3>Contact</h3>
            <a href="mailto:lenyitaima@gmail.com">lenyitaima@gmail.com</a>
            <a href="https://instagram.com/len._.m_" target="_blank" rel="noreferrer">Instagram · len._.m_</a>
            <a href="https://lenyitaima.com" target="_blank" rel="noreferrer">lenyitaima.com</a>
            <small>Phone number intentionally omitted for public-site privacy. Add it back in the HTML if needed.</small>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Len Yitai Ma. RepliFa.</p>
        <a href="#top">Back to top</a>
      </footer>
    </div>
  )
}

export default ContactPage
