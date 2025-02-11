export interface AudioVisualizerProps {
  frequencies: Float32Array[]
  gap: number
  barWidth: number
  minBarHeight: number
  maxBarHeight: number
  borderRadius: number
  className?: string
}

export default function AudioVisualizer(props: AudioVisualizerProps) {
  const {
    frequencies,
    gap,
    barWidth,
    minBarHeight,
    maxBarHeight,
    borderRadius,
    className,
  } = props

  const summedFrequencies = frequencies.map((bandFrequencies) => {
    const sum = bandFrequencies.reduce((a, b) => a + b, 0)
    if (sum <= 0) {
      return 0
    }
    return Math.sqrt(sum / bandFrequencies.length)
  })

  return (
    <div
      className={`flex items-center justify-center h-full`}
      style={{ gap: `${gap}px` }}
    >
      {summedFrequencies.map((frequency, index) => {
        const style = {
          height:
            minBarHeight + frequency * (maxBarHeight - minBarHeight) + "px",
          borderRadius: borderRadius + "px",
          width: barWidth + "px",
          transition:
            "background-color 0.35s ease-out, transform 0.25s ease-out",
          // transform: transform,
        }

        return <span key={index} className={className} style={style} />
      })}
    </div>
  )
}
