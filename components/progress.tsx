type Props = {
  steps: string[]
  current: number
}

export function ProgressSteps({ steps, current }: Props) {
  return (
    <ol className="space-y-3">
      {steps.map((label, idx) => {
        const active = idx === current
        const done = idx < current
        return (
          <li key={label} className="flex items-center gap-3">
            <span
              className={[
                "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                done ? "bg-neon text-background" : active ? "border border-neon text-neon" : "border border-border",
              ].join(" ")}
              aria-hidden
            >
              {idx + 1}
            </span>
            <span className={active ? "text-foreground" : "text-muted-foreground"}>{label}</span>
          </li>
        )
      })}
    </ol>
  )
}
