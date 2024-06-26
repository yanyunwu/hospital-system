import { useEffect, useRef } from 'react'
import wordCloud from 'wordcloud'
import words from './words'

type Word = {
  text: string,
  value: number
}

export interface WordCloudProps {
  words?: Word[]
  height?: number | string
  weightFactor?: number
}

export default function WordCloud(props: WordCloudProps) {
  const initWords = props.words ?? words
  const initHeight = props.height ?? 300
  const height = typeof initHeight === 'number' ? `${initHeight}px` : initHeight
  const containerRef = useRef<HTMLDivElement>()

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      wordCloud(container, {
        list: initWords.map(item => [item.text, item.value]),
        minSize: 1,
        weightFactor: props.weightFactor ?? 10,
      })
    }
  }, [props.words, props.weightFactor])

  return (
    <div className='cursor-pointer'>
      <div ref={containerRef} style={{ height }} />
    </div>
  )
}
