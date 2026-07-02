import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const translations = {
  en: {
    'nav.works': 'Works',
    'nav.fashion': 'Fashion',
    'nav.photography': 'Photography',
    'nav.contact': 'Contact',
    'nav.language': 'Language',
    'brand': 'Len Yitai Ma',

    'home.eyebrow': 'Fashion BFA Thesis Collection',
    'home.tagline': '',
    'home.subtitle':
      'A fashion portfolio exploring authentic Chinese aesthetics, garment structure, and the body beyond a eurocentric fashion system.',
    'home.cta': 'View Project',

    'about.eyebrow': 'Designer',
    'about.name': 'Len Yitai Ma',
    'about.p1':
      "With over 8 years of experience in wearing and researching traditional Chinese Han ethinicity's cloth, the designer’s understanding of authentic Chinese aesthetics goes far beyond clothes.",
    'about.p2':
      'Yet extends to traditional architecture, pattern, accessories, and the broader rituals contexts behind. Grounded in rigorous academic knowledge, this understanding forms the foundation of the designer’s practice.',
    'about.practiceLabel': 'Practice',
    'about.practiceValue': 'Fashion design, Photography',
    'about.softwareLabel': 'Software I use',
    'about.softwareValue':
      'Adobe Photoshop, Adobe Illustrator, Adobe InDesign, CLO 3D, Adobe Premiere Pro, DaVinci Resolve',

    'replifa.statementEyebrow': 'Collection statement',
    'replifa.statementH2': 'RepliFa challenges the established eurocentric fashion system.',
    'replifa.statementBody':
      'It questions authority at a fundamental level: the philosophy of the body, modes of representation, and the historical forces that have subtly shaped how people understand garments.',
    'replifa.bandCopy':
      'Only through authentic artifacts can the lost aesthetic be reconstructed and truly embodied.',
    'replifa.featureEyebrow': 'Featured detail',
    'replifa.featureBody':
      '“Flare guard” (摆 bai) is one of the most distinctive structures in traditional Chinese garments. It transforms construction into an expression of power and becomes an independent structural signifier through which a new expression of power can be built free from Orientalist interpretation.',

    'fashion.eyebrow': 'Fashion',
    'fashion.projects': 'Projects',
    'fashion.desc': 'Select a project to explore its looks, materials, and structure.',
    'fashion.replifaCaption': 'Fashion BFA Thesis Collection',
    'fashion.shoesCaption': 'Footwear',
    'fashion.perfumeCaption': 'Eau De Parfum',

    'replifa.looksH2': 'Eight looks from RepliFa',
    'replifa.looksDesc':
      'Each look translates historical Chinese garment logic into a contemporary fashion language through structure, silhouette, fabric, and proportion.',
    'replifa.filter.all': 'All',
    'replifa.filter.overlaped': 'Overlaped-Collared',
    'replifa.filter.round': 'Round-Collared',
    'replifa.filter.flare': 'Flare Guard',
    'replifa.filter.pattern': 'Traditional Pattern',
    'replifa.filter.underlayer': 'Under Layer',
    'replifa.downloadLookbook': 'Download Full Look Book',
    'replifa.downloadPortfolio': 'Download Portfolio',
    'replifa.moreImages': 'More images',

    'shoes.tag': 'Footwear',
    'shoes.introBody':
      'The Mawangdui Han tombs preserve a rich and complete aesthetic system. Among its most representative elements, the forked-toe shoe stands out as one of the earliest footwear forms and one of the most influential prototypes in the later development of Chinese footwear.',
    'shoes.looksH2': 'RepliFa Shoe Collection',
    'shoes.looksDesc': 'Footwear developed alongside the RepliFa collection.',

    'contact.eyebrow': 'Contact',
    'contact.copied': 'Email address copied to clipboard',
    'contact.wechat': 'wechat: Lenyitaima',
    'contact.close': 'Close',

    'modal.materials': 'Materials',
    'modal.process': 'Check full Process',
  },
  zh: {
    'nav.works': '作品',
    'nav.fashion': '时尚',
    'nav.photography': '摄影',
    'nav.contact': '联系',
    'nav.language': '语言',
    'brand': 'Len 马一泰',

    'home.eyebrow': '帕森斯本科服装设计专业毕业设计。',
    'home.tagline': '取自Replica(复制品)和Fashion(时尚)的二者结合。',
    'home.subtitle':
      '本作品集以正统的中国美学与服装结构为核心，探索汉服的可能性并挑战欧洲中心主义的时尚体系。',
    'home.cta': '查看项目',

    'about.eyebrow': '设计师',
    'about.name': 'Len 马一泰',
    'about.p1':
      '凭借超过八年穿着与研究汉族传统服饰的经验，设计师对正统中国美学的理解远不止于服装本身。',
    'about.p2':
      '更延伸至传统建筑、纹样、配饰，以及其背后更广阔的礼仪语境。植根于严谨的学术研究，这份理解构成了设计师创作实践的基础。',
    'about.practiceLabel': '专业方向',
    'about.practiceValue': '服装设计、摄影',
    'about.softwareLabel': '常用软件',
    'about.softwareValue':
      'Adobe Photoshop、Adobe Illustrator、Adobe InDesign、CLO 3D、Adobe Premiere Pro、DaVinci Resolve',

    'replifa.statementEyebrow': '作品集陈述',
    'replifa.statementH2': '本作品旨在挑战以欧洲中心主义为核心的服装界。',
    'replifa.statementBody':
      '包括但不限于从根本挑战其权威性，从西式哲学对于身体的思考：其表达的具象、抽象概念，以及通过历史因素潜移默化地影响了人类对于服装的构造逻辑和审美。',
    'replifa.bandCopy': '只有以文物为依据重构，方能真正再现那失落已久的美学。',
    'replifa.featureEyebrow': '特写细节',
    'replifa.featureBody':
      '外摆，亦名“增耳”，是明代服饰中最具识别度的结构之一，它将原本服务于衣身的裁剪转化为一种权力表达。而在我所建立的体系中，“摆”不仅只是服装结构，也不用依附于西式裁剪所定义的权威语言；它成为一种独立的结构标识，用以重新建构属于东方服饰的权力表达。',

    'fashion.eyebrow': '时尚',
    'fashion.projects': '项目',
    'fashion.desc': '点击项目以查看其造型、面料与结构。',
    'fashion.replifaCaption': '本科服装设计毕业设计',
    'fashion.shoesCaption': '鞋履',
    'fashion.perfumeCaption': '淡香水',

    'replifa.looksH2': 'RepliFa 系列中的8套造型',
    'replifa.looksDesc':
      '每一套造型都以结构、廓形、面料与比例为媒介，将汉族的传统服饰的设计逻辑转译成当代时装语言。',
    'replifa.filter.all': '全部',
    'replifa.filter.overlaped': '交领',
    'replifa.filter.round': '圆领',
    'replifa.filter.flare': '出摆',
    'replifa.filter.pattern': '传统纹样',
    'replifa.filter.underlayer': '内搭',
    'replifa.downloadLookbook': '下载Look Book',
    'replifa.downloadPortfolio': '下载完整作品集',
    'replifa.moreImages': '更多图片',

    'shoes.tag': '鞋履',
    'shoes.introBody':
      '长沙马王堆汉墓保存了一整套丰富且完整的审美体系，而其中最具代表性、也对中国后世鞋履发展影响最为深远的，正是早期鞋履形态之一的歧头履。',
    'shoes.looksH2': 'RepliFa 鞋履系列',
    'shoes.looksDesc': '与 RepliFa 系列同期开发的鞋履。',

    'contact.eyebrow': '联系',
    'contact.copied': '邮箱地址已复制到剪贴板',
    'contact.wechat': '微信：Lenyitaima',
    'contact.close': '关闭',

    'modal.materials': '面料成分',
    'modal.process': '设计过程',
  },
}

const LanguageContext = createContext({ lang: 'en', setLang: () => {}, t: (k) => k })

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: (key) => translations[lang]?.[key] ?? translations.en[key] ?? key,
    }),
    [lang]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLang = () => useContext(LanguageContext)
