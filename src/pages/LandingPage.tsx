// import Navbar from "@/components/layout/Navbar"

// export default function LandingPage() {
//   return (
//     <div className="bg-gray-50 min-h-screen dot-grid">
//       <Navbar />
//       {/* Hero Section */}
//       <section className="max-w-7xl mx-auto px-6 pt-40 pb-24 text-center">
//         <h1 className="text-6xl font-bold text-gray-900 leading-tight">
//           Weather intelligence for <br />
//           <span className="text-teal-700">renewable energy</span>
//         </h1>
//         <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
//           ClimaSight delivers real-time meteorological analysis and forecasting tools built for the energy sector.
//         </p>
//         <div className="mt-10 flex items-center justify-center gap-4">
//           <button className="bg-teal-700 hover:bg-teal-800 text-white px-8 py-3 rounded-lg font-medium transition-colors">
//             Get started
//           </button>
//           <button className="text-gray-600 hover:text-teal-700 px-8 py-3 font-medium transition-colors">
//             Learn more →
//           </button>
//         </div>
//       </section>
//     </div>
//   )
// }
//
// -------------------------------------------------

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
    </div>
  )
}
