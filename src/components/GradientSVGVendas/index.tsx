export function GradientSVGVendas() {
  const gradientTransform = `rotate(90)`
  return (
    <svg style={{ height: 0 }}>
      <defs>
        <linearGradient
          id="gradient-vendas"
          gradientTransform={gradientTransform}
        >
          <stop offset="16.29%" stopColor="#CE9FFC" />
          <stop offset="85.56%" stopColor="#7367F0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
