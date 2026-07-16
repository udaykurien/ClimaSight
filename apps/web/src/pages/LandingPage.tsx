import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/context/ThemeContext"

export default function LandingPage() {
  const { theme } = useTheme()

  return (
    <div className={`${theme === "light" ? "climasight-light dot-grid-light" : "climasight-dark dot-grid-dark"} bg-[var(--bg)] min-h-screen`}>
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
      <section id="about" className="max-w-7xl mx-auto px-6 py-24">
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

      {/* Features section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div>
          <span className="text-[var(--accent)] text-sm font-semibold uppercase tracking-widest">
            Our Features
          </span>
          <h2 className="mt-4 text-4xl font-bold text-[var(--text)]">
            Everything you need to predict, plan and perform.
          </h2>
        </div>
          <div className="grid grid-cols-3 gap-8 text-center mt-10">

            <div className="rounded-2xl bg-[var(--accent)]/20 backdrop-blur-md border border-[var(--border)] shadow-md p-10">
              <h3 className="mt-4 text-lg font-bold text-[var(--text)]">
                Real-time processing
              </h3>
              <p className="text-[var(--text-muted)] mt-2">
                Hourly weather updates with high spatial resolution for your exact site location.
              </p>
            </div>

            <div className="rounded-2xl bg-[var(--accent)]/20 backdrop-blur-md border border-[var(--border)] shadow-md p-10">
              <h3 className="mt-4 text-lg font-bold text-[var(--text)]">
                Energy Output Prediction
              </h3>
              <p className="text-[var(--text-muted)] mt-2">
                Correlate wind and solar conditions with expected energy yield.
              </p>
            </div>

            <div className="rounded-2xl bg-[var(--accent)]/20 backdrop-blur-md border border-[var(--border)] shadow-md p-10">
              <h3 className="mt-4 text-lg font-bold text-[var(--text)]">
                Extreme Weather Alerts
              </h3>
              <p className="text-[var(--text-muted)] mt-2">
                Get notified before storms, heat waves, or low-wind periods impact your operations.
              </p>
            </div>
          </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="mt-4 text-4xl font-bold text-[var(--text)]">
          Ready to take control?
        </h2>

        <p className="text-[var(--text-muted)] mt-2">
          Join energy professionals who rely on ClimaSight to make smarter decisions.
        </p>

        <Button className="text-[var(--bg)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] mt-8">
          Get started now
        </Button>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  )
}
