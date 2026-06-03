import { useEffect } from 'react'
import './PhotographyPage.css'

const PhotographyPage = () => {
  useEffect(() => {
    document.title = 'Photography — RepliFa'
  }, [])

  return (
    <div className="photography-page">
    </div>
  )
}

export default PhotographyPage
