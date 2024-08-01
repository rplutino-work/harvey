import React, { useEffect } from 'react'

const NoIndex = () => {
  useEffect(() => {
    const existingMetaTag = document.querySelector(
      'meta[name="robots"][content="index,follow"]'
    )
    if (existingMetaTag) {
      document.head.removeChild(existingMetaTag)
    }

    const metaTag = document.createElement('meta')
    metaTag.name = 'robots'
    metaTag.content = 'noindex,nofollow'
    document.head.appendChild(metaTag)

    return () => {
      if (metaTag) {
        document.head.removeChild(metaTag)
      }
    }
  }, [])

  return null
}

export default NoIndex
