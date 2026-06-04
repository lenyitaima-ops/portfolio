import { useEffect } from 'react'
import './PhotographyPage.css'

const PhotographyPage = () => {
  useEffect(() => {
    document.title = 'Photography — Len Yitai Ma'
  }, [])

  return (
    <div className="photography-page">
    </div>
  )
}

export default PhotographyPage
