interface BarWeekDayProps {
  vendaDia: number
  day: string
  maxVenda: number
}

export function BarWeekDay({ vendaDia, day, maxVenda }: BarWeekDayProps) {
  const height = maxVenda === vendaDia ? 10 : (vendaDia * 10) / maxVenda

  return (
    <div className="bar-wrapper grid grid-rows-bars justify-items-center gap-1 z-10">
      <div
        className={`bar w-4 rounded-full self-end bg-gradient-to-b from-cyan300 to-cyan700 animate-up`}
        style={{
          height: `${height}rem`,
        }}
      ></div>
      <span>{day.slice(0, 3)}</span>
    </div>
  )
}
