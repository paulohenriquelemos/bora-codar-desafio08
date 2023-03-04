export function GradientSVGMensal() {
  // const idCSS = 'hello'
  const gradientTransform = `rotate(90)`
  return (
    <svg style={{ height: 0 }}>
      <defs>
        <linearGradient
          id="gradient-mensal"
          gradientTransform={gradientTransform}
        >
          <stop offset="16.29%" stopColor="#DF9780" />
          <stop offset="85.56%" stopColor="#A66DE9" />
        </linearGradient>
      </defs>
    </svg>
  )
}
