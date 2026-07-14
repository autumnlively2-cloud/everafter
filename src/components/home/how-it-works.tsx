const steps = ['Choose', 'Personalize', 'Preview', 'Print', 'Read Together']

export function HowItWorks() {
  return (
    <section className="bg-white/60 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-heading text-3xl font-bold text-foreground">
          How It Works
        </h2>
        <div className="mt-12 flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-2">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <div className="rounded-2xl border border-primary/10 bg-background px-5 py-4 text-center shadow-sm">
                <p className="font-heading text-lg font-semibold text-primary">{step}</p>
              </div>
              {index < steps.length - 1 ? (
                <span className="hidden text-2xl text-primary/40 md:block">↓</span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
