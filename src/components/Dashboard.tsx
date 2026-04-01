import React from 'react';
import { motion } from 'motion/react';
import { GDPChart } from './GDPChart';
import { Timeline } from './Timeline';
import { EconomicGame } from './EconomicGame';
import { TrendingUp } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-zinc-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-zinc-900 rounded-lg md:rounded-xl flex items-center justify-center text-white">
              <TrendingUp size={20} className="md:w-6 md:h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg md:text-2xl tracking-tight">Singapore Economic Odyssey</h1>
              <p className="text-sm md:text-base text-zinc-500 tracking-tight">Y56 RI Econs</p>
            </div>
          </div>
          <nav className="flex items-center justify-center md:justify-end gap-3 md:gap-4 text-base md:text-xl font-semibold text-zinc-700 md:ml-auto">
            <a href="#overview" className="rounded-full border border-zinc-200 bg-white px-4 py-2 md:px-6 md:py-3 shadow-sm hover:border-emerald-400 hover:text-zinc-900 hover:shadow-md transition-all">Overview</a>
            <a href="#timeline" className="rounded-full border border-zinc-200 bg-white px-4 py-2 md:px-6 md:py-3 shadow-sm hover:border-emerald-400 hover:text-zinc-900 hover:shadow-md transition-all">Timeline</a>
            <a href="#simulation" className="rounded-full border border-zinc-200 bg-white px-4 py-2 md:px-6 md:py-3 shadow-sm hover:border-emerald-400 hover:text-zinc-900 hover:shadow-md transition-all">Simulation</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 space-y-5 md:space-y-6">
        <section id="overview" className="grid grid-cols-1 gap-3 md:gap-4 snap-start scroll-mt-28 pt-2 md:pt-3">
          <div className="space-y-3 md:space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.1] text-zinc-900">
                From Mudflats to <span className="text-emerald-600">Metropolis.</span>
              </h2>
              <p className="text-lg md:text-xl text-zinc-500 max-w-2xl leading-relaxed">
                Explore the radical transformation of Singapore&apos;s economy.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:gap-5">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <GDPChart />
          </motion.div>
        </section>

        <section id="timeline" className="snap-start scroll-mt-28 min-h-[85vh] content-center">
          <Timeline />
        </section>

        <section id="simulation" className="space-y-4 md:space-y-6 snap-start scroll-mt-28 min-h-[85vh] content-center">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">The Planner&apos;s Dilemma</h2>
            <p className="text-zinc-500 leading-relaxed text-sm md:text-base max-w-3xl">
              Step into the shoes of Singapore&apos;s economic planners. Navigate critical turning points in history, test your decisions, and review your final outcome at the end of the simulation.
            </p>
          </div>
          <EconomicGame />
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 flex justify-center md:justify-start items-center">
          <div className="flex items-center gap-3 opacity-50">
            <TrendingUp size={20} />
            <div>
              <p className="font-bold">Singapore Economic Odyssey</p>
              <p className="text-sm">Y56 RI Econs</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
