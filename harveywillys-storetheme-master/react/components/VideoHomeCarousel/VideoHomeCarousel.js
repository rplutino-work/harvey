import React from 'react'

import s from './VideoHomeCarousel.module.css'

const VideoHomeCarousel = ({ videoID }) => {
  return (
    <iframe
      className={s.video}
      width="100%"
      height="430"
      src={`https://www.youtube.com/embed/${videoID}?controls=1&autoplay=1&playlist=${videoID}&loop=1&mute=0`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  )
}

const defaultProps = {
  videoID: 'zlvGmBUSQEM',
}

VideoHomeCarousel.defaultProps = defaultProps

VideoHomeCarousel.schema = {
  type: 'object',
  title: 'Video',
  properties: {
    videoID: {
      title: 'ID del Video',
      type: 'string',
      default: defaultProps.videoID,
    },
  },
}

export default VideoHomeCarousel
