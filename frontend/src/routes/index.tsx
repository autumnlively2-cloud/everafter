import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

// ── Reusable components ──────────────────────────────────────────────────────

function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
      <span className="mb-3 inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
        {label}
      </span>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          {description}
        </p>
      )}
    </div>
  );
}

function BulletPoint({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <svg
        className="mt-1 h-5 w-5 shrink-0 text-indigo-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-gray-700 dark:text-gray-300">{text}</span>
    </li>
  );
}

// ── Sections ─────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200/60 bg-white/80 backdrop-blur-md dark:border-gray-800/60 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="/"
          className="text-xl font-bold tracking-tight text-indigo-700 dark:text-indigo-400"
        >
          <span className="flex items-center gap-2">
            <svg
              className="h-7 w-7"
              viewBox="0 0 28 28"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path d="M14 3L3 9v10l11 6 11-6V9L14 3z" />
              <path d="M3 9l11 6 11-6" strokeWidth={2} />
              <path d="M14 15v10" />
            </svg>
            Shipyard Engineering
          </span>
        </a>
        <nav className="hidden items-center gap-8 sm:flex">
          <a
            href="#what-we-do"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            What we do
          </a>
          <a
            href="#how-we-work"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            How we work
          </a>
          <a
            href="#for-whom"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            For whom
          </a>
          <a
            href="#contact"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
          >
            Get in touch
          </a>
        </nav>
        {/* Mobile menu button */}
        <a
          href="#contact"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 sm:hidden"
        >
          Contact
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-indigo-50/50 blur-3xl dark:bg-indigo-950/20" />
        <div className="absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-cyan-50/50 blur-3xl dark:bg-cyan-950/20" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Available for new projects
        </span>
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Ship production-quality{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-cyan-400">
            SaaS, fast
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl">
          A small, focused engineering team that builds production-quality
          software end-to-end — architecture, backend, frontend, and tests —
          without the overhead of a larger org.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#contact"
            className="w-full rounded-xl bg-indigo-600 px-8 py-3.5 text-center text-base font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-500 sm:w-auto"
          >
            Start your project
          </a>
          <a
            href="#what-we-do"
            className="w-full rounded-xl border border-gray-300 bg-white px-8 py-3.5 text-center text-base font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 sm:w-auto"
          >
            See what we do
          </a>
        </div>
      </div>
    </section>
  );
}

function WhatWeDo() {
  const services = [
    {
      title: "Architecture",
      description:
        "Clean, scalable architecture that doesn't paint you into a corner. We design systems that grow with your product.",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
          />
        </svg>
      ),
    },
    {
      title: "Backend",
      description:
        "APIs, databases, server-side logic, integrations. Reliable, well-tested services that power your product.",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.75"
          />
        </svg>
      ),
    },
    {
      title: "Frontend",
      description:
        "Clean, accessible UI components built with modern frameworks. Responsive across every screen size.",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
          />
        </svg>
      ),
    },
    {
      title: "Testing",
      description:
        "Unit tests, integration tests, and end-to-end coverage. We ship with confidence, and you ship with confidence.",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="what-we-do"
      className="border-t border-gray-100 px-6 py-20 dark:border-gray-800 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="What we do"
          title="Full-stack, end-to-end"
          description="From architecture to deployment, we handle every layer of your SaaS product."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div
              key={s.title}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-indigo-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:border-indigo-700"
            >
              <div className="mb-4 inline-flex rounded-xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                {s.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold">{s.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowWeWork() {
  const steps = [
    {
      number: "01",
      title: "Spec & scope",
      description:
        "We start with a clear spec. No ambiguity — you know exactly what we're building and when you'll see it.",
    },
    {
      number: "02",
      title: "Build & review",
      description:
        "Every feature goes through architecture review, code review, and testing. Production quality isn't an afterthought.",
    },
    {
      number: "03",
      title: "Ship & iterate",
      description:
        "We ship in short cycles. You see working software fast, and we iterate based on real feedback.",
    },
  ];

  return (
    <section
      id="how-we-work"
      className="bg-gray-50 px-6 py-20 dark:bg-gray-900/50 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="How we work"
          title="Small team, big impact"
          description="No account managers, no status meetings that should have been emails. Just focused engineering."
        />

        <div className="mx-auto max-w-4xl">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-indigo-200 dark:bg-indigo-800 sm:block" />

            <div className="space-y-12">
              {steps.map((step) => (
                <div key={step.number} className="relative flex gap-8">
                  <div className="relative z-10 hidden h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white shadow-lg sm:flex">
                    {step.number}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                    <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ForWhom() {
  const audiences = [
    {
      role: "Founders",
      description:
        "You have a vision and a spec. You need a team that can build it without the overhead of hiring, onboarding, and managing engineers.",
      bullets: [
        "Go from spec to working software fast",
        "No recruiting overhead or onboarding lag",
        "Transparent progress you can see in PRs",
      ],
    },
    {
      role: "Product teams",
      description:
        "Your team is stretched thin. You need a reliable extension that ships features on cadence without sacrificing quality.",
      bullets: [
        "Drop-in team augmentation",
        "Clean architecture you can maintain",
        "Code review you'd be proud to show your CTO",
      ],
    },
  ];

  return (
    <section
      id="for-whom"
      className="border-t border-gray-100 px-6 py-20 dark:border-gray-800 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="For whom"
          title="Built for founders & product teams"
          description="If you care about clean architecture, honest code review, and predictable shipping cadence, we should talk."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {audiences.map((a) => (
            <div
              key={a.role}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900"
            >
              <h3 className="mb-2 text-2xl font-bold">{a.role}</h3>
              <p className="mb-6 leading-relaxed text-gray-600 dark:text-gray-400">
                {a.description}
              </p>
              <ul className="space-y-3">
                {a.bullets.map((b) => (
                  <BulletPoint key={b} text={b} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function KPIs() {
  const metrics = [
    { value: "15+", label: "PRs merged per week" },
    { value: "<48h", label: "From spec to first deploy" },
    { value: "90%+", label: "Test coverage on new code" },
    { value: "100%", label: "Client repeat engagement" },
  ];

  return (
    <section className="border-t border-gray-100 bg-indigo-600 px-6 py-20 dark:border-gray-800 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center text-white/80">
          <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white">
            By the numbers
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Designed for shipping velocity
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div className="text-4xl font-extrabold text-white sm:text-5xl">
                {m.value}
              </div>
              <div className="mt-2 text-sm font-medium text-indigo-200">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="px-6 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-2xl text-center">
        <span className="mb-3 inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          Get in touch
        </span>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Let's build something great
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-lg text-gray-600 dark:text-gray-400">
          Have a project in mind? We'd love to hear about it. Tell us what you're
          building, and we'll get back to you within 24 hours with a plan.
        </p>

        <div className="mx-auto mt-10 max-w-lg rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-5"
          >
            <div className="text-left">
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
              />
            </div>
            <div className="text-left">
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@company.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
              />
            </div>
            <div className="text-left">
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                What are you building?
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Tell us about your project..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-500"
            >
              Send message
            </button>
          </form>
          <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
            We'll respond within 24 hours. No spam, ever.
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 px-6 py-8 dark:border-gray-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          <svg
            className="h-5 w-5 text-indigo-500"
            viewBox="0 0 28 28"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path d="M14 3L3 9v10l11 6 11-6V9L14 3z" />
            <path d="M3 9l11 6 11-6" strokeWidth={2} />
            <path d="M14 15v10" />
          </svg>
          Shipyard Engineering
        </div>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Built with{" "}
          <a
            href="https://cto.new"
            className="underline hover:text-gray-600 dark:hover:text-gray-400"
          >
            cto.new
          </a>
        </p>
      </div>
    </footer>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

function Home() {
  return (
    <div className="min-h-dvh bg-white font-sans text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
      <Nav />
      <Hero />
      <WhatWeDo />
      <HowWeWork />
      <ForWhom />
      <KPIs />
      <Contact />
      <Footer />
    </div>
  );
}