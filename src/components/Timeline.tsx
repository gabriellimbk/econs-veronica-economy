import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { milestones } from '../data/singaporeEconomy';
import { 
  ChevronRight, 
  ChevronLeft, 
  Building2, 
  Flag, 
  Factory, 
  Fuel, 
  TrendingDown, 
  Coins, 
  Dna, 
  ShieldAlert, 
  Cpu, 
  Activity 
} from 'lucide-react';

const IconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 size={64} strokeWidth={1.5} className="text-blue-400" />,
  Flag: <Flag size={64} strokeWidth={1.5} className="text-red-400" />,
  Factory: <Factory size={64} strokeWidth={1.5} className="text-zinc-400" />,
  Fuel: <Fuel size={64} strokeWidth={1.5} className="text-amber-400" />,
  TrendingDown: <TrendingDown size={64} strokeWidth={1.5} className="text-red-500" />,
  Coins: <Coins size={64} strokeWidth={1.5} className="text-yellow-500" />,
  Dna: <Dna size={64} strokeWidth={1.5} className="text-emerald-400" />,
  ShieldAlert: <ShieldAlert size={64} strokeWidth={1.5} className="text-orange-500" />,
  Cpu: <Cpu size={64} strokeWidth={1.5} className="text-indigo-400" />,
  Activity: <Activity size={64} strokeWidth={1.5} className="text-rose-400" />,
};

export const Timeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % milestones.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + milestones.length) % milestones.length);

  const activeMilestone = milestones[activeIndex];

  return (
    <div className="bg-zinc-900 text-white rounded-2xl p-5 md:p-6 shadow-2xl overflow-hidden relative">
      <div className="flex justify-between items-center mb-5 md:mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold tracking-tight">Economic Milestones</h2>
          <p className="text-zinc-400 text-sm">Key events that shaped the nation</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={prev}
            className="p-1.5 md:p-2 rounded-full border border-zinc-700 hover:bg-zinc-800 transition-colors"
          >
            <ChevronLeft size={18} className="md:w-5 md:h-5" />
          </button>
          <button 
            onClick={next}
            className="p-1.5 md:p-2 rounded-full border border-zinc-700 hover:bg-zinc-800 transition-colors"
          >
            <ChevronRight size={18} className="md:w-5 md:h-5" />
          </button>
        </div>
      </div>

      <div className="relative min-h-[360px] md:h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMilestone.year}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-6 md:gap-8 items-center h-full"
          >
            <div className="space-y-3">
              <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs md:text-sm font-mono mb-2">
                {activeMilestone.category}
              </div>
              <h3 className="text-5xl md:text-6xl font-sans font-black mb-1 leading-none">{activeMilestone.year}</h3>
              <h4 className="text-xl md:text-[1.75rem] font-bold text-zinc-200 mb-3">{activeMilestone.title}</h4>
              <p className="text-zinc-400 leading-relaxed text-base md:text-lg max-w-xl">
                {activeMilestone.description}
              </p>
            </div>
            <div className="hidden md:flex justify-center items-center">
              <div className="w-full h-full max-w-[380px] aspect-[4/3] rounded-3xl overflow-hidden relative group">
                <motion.div 
                  key={activeMilestone.year}
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full bg-zinc-800 flex items-center justify-center"
                >
                  <img 
                    src={activeMilestone.imageUrl} 
                    alt={activeMilestone.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ objectPosition: activeMilestone.imagePosition || 'center' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://picsum.photos/seed/${activeMilestone.year}/800/800`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent opacity-60" />
                </motion.div>
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-2xl bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {milestones.map((m, idx) => (
          <button
            key={m.year}
            onClick={() => setActiveIndex(idx)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              idx === activeIndex 
                ? 'bg-white text-black scale-105' 
                : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'
            }`}
          >
            {m.year}
          </button>
        ))}
      </div>
    </div>
  );
};
