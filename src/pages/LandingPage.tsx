import Navbar from "@/components/layout/Navbar"

export default function LandingPage() {
  return (
    <div className="climasight-light bg-[var(--bg)] min-h-screen dot-grid-light">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-48 pb-24 text-center">
        <span className="text-[var(--accent)] text-sm font-semibold uppercase tracking-widest">
          Meteorological Intelligence
        </span>
        <h1 className="mt-4 text-6xl font-bold text-[var(--text)]">
          Weather data for <br />
          <span className="text-[var(--accent)]">renewable energy</span>
        </h1>
        <p className="mt-6 text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
          ClimaSight delivers real-time meteorological analysis and forecasting tools built for the energy sector.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--bg)] px-8 py-3 rounded-lg font-semibold transition-colors">
            Get started
          </button>
          <button className="text-[var(--text-muted)] hover:text-[var(--text)] px-8 py-3 font-medium transition-colors">
            Learn more →
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <span className="text-[var(--accent)] text-sm font-semibold uppercase tracking-widest">
              About
            </span>
            <h2 className="mt-4 text-4xl font-bold text-[var(--text)]">
              Weather that actually makes sense.
            </h2>
            <p className="mt-6 text-lg text-[var(--text-muted)] leading-relaxed">
              ClimaSight turns complex meteorological data into clear, actionable insights — built for energy professionals who can't afford to guess.
            </p>
          </div>
          {/* Right: Text */}
          <div>
            <div className="rounded-2xl bg-[var(--accent)]/20 backdrop-blur-md border border-[var(--border)] shadow-md p-10">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-[var(--text)]">150+</span>
                  <span className="text-sm text-[var(--text-muted)]">Cities covered</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-[var(--text)]">98%</span>
                  <span className="text-sm text-[var(--text-muted)]">Forecast accuracy</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-[var(--text)]">24/7</span>
                  <span className="text-sm text-[var(--text-muted)]">Real-time updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
