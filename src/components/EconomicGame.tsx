import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  Users,
  Globe,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  ShieldAlert,
  Play,
  Gamepad2,
} from 'lucide-react';

interface Scenario {
  id: string;
  year: number;
  title: string;
  context: string;
  options: Option[];
}

interface Option {
  label: string;
  isCorrect: boolean;
  impact: {
    gdp: number;
    stability: number;
    trust: number;
  };
  feedback: string;
}

interface GameState {
  gdp: number;
  stability: number;
  trust: number;
  score: number;
  currentScenarioIndex: number;
  isGameOver: boolean;
  history: { scenarioTitle: string; choice: string; wasCorrect: boolean }[];
}

const SCENARIOS: Scenario[] = [
  {
    id: '1965',
    year: 1965,
    title: 'The Great Separation',
    context:
      "Singapore has just separated from Malaysia. You have no natural resources, a small domestic market, and high unemployment. The British military is planning to withdraw, which accounts for 20% of GDP.",
    options: [
      {
        label: 'Import Substitution Industrialization (ISI)',
        isCorrect: false,
        impact: { gdp: -5, stability: -5, trust: -10 },
        feedback:
          'Risky. With a tiny domestic market of 2 million people, protecting local industries leads to inefficiency and stagnation.',
      },
      {
        label: 'Export-Oriented Industrialization (EOI)',
        isCorrect: true,
        impact: { gdp: 15, stability: 5, trust: 10 },
        feedback:
          'Correct! By pivoting to global markets and attracting MNCs like Texas Instruments, you laid the foundation for rapid growth.',
      },
    ],
  },
  {
    id: '1979',
    year: 1979,
    title: 'The Second Industrial Revolution',
    context:
      'Singapore is stuck in low-wage, labor-intensive manufacturing. Competition from neighbors is rising. Do you force a transition to higher value-added industries?',
    options: [
      {
        label: 'Maintain Low-Wage Competitive Advantage',
        isCorrect: false,
        impact: { gdp: -10, stability: 5, trust: -5 },
        feedback:
          "Stagnation. Singapore would have been trapped in a 'middle-income trap' as cheaper neighbors undercut your labor costs.",
      },
      {
        label: 'Mandatory High-Wage Policy',
        isCorrect: true,
        impact: { gdp: 10, stability: -10, trust: 5 },
        feedback:
          'Bold. By raising wages via the NWC, you forced firms to automate or leave, shifting Singapore towards high-tech manufacturing.',
      },
    ],
  },
  {
    id: '1985',
    year: 1985,
    title: 'The First Recession',
    context:
      'GDP has contracted for the first time. Operating costs are too high, and global demand for electronics has slumped. How do you restore competitiveness?',
    options: [
      {
        label: 'Direct Government Subsidies to Firms',
        isCorrect: false,
        impact: { gdp: 5, stability: 5, trust: -10 },
        feedback:
          'Inefficient. Subsidies mask underlying cost issues and strain the national budget without solving structural competitiveness.',
      },
      {
        label: 'Cut CPF Contribution Rates',
        isCorrect: true,
        impact: { gdp: 10, stability: -15, trust: 10 },
        feedback:
          "Effective. Reducing the employer's CPF contribution drastically lowered business costs, allowing for a swift recovery.",
      },
    ],
  },
  {
    id: '1997',
    year: 1997,
    title: 'Asian Financial Crisis',
    context:
      'Speculators are attacking Asian currencies. The Thai Baht has collapsed, and the contagion is spreading. The SGD is under immense pressure. How do you respond?',
    options: [
      {
        label: 'Fixed Exchange Rate Defense',
        isCorrect: false,
        impact: { gdp: -10, stability: -5, trust: -15 },
        feedback:
          'Disastrous. Defending a fixed rate against market forces would have drained national reserves, as seen in other regional economies.',
      },
      {
        label: 'Managed Float (MAS Policy)',
        isCorrect: true,
        impact: { gdp: 5, stability: 10, trust: 15 },
        feedback:
          'Wise. By allowing the SGD to fluctuate within a managed band, you absorbed the shock without depleting reserves or losing competitiveness.',
      },
    ],
  },
  {
    id: '2000',
    year: 2000,
    title: 'The Biomedical Push',
    context:
      'Electronics manufacturing is maturing. You need a new high-growth pillar. Do you commit billions to build a biomedical hub from scratch?',
    options: [
      {
        label: 'Expand Traditional Services',
        isCorrect: false,
        impact: { gdp: 5, stability: 10, trust: 0 },
        feedback:
          'Safe but limited. While services are stable, you would have missed the high-growth wave of biotechnology and life sciences.',
      },
      {
        label: 'Launch Biomedical Sciences Initiative',
        isCorrect: true,
        impact: { gdp: 15, stability: 5, trust: 10 },
        feedback:
          'Visionary. Building Biopolis and attracting global talent created a high-value sector that now accounts for a significant portion of manufacturing.',
      },
    ],
  },
  {
    id: '2008',
    year: 2008,
    title: 'The Global Financial Crisis',
    context:
      "Lehman Brothers has collapsed. Global trade is freezing up. Singapore's open economy is highly vulnerable. What is your primary response?",
    options: [
      {
        label: 'Aggressive Currency Devaluation',
        isCorrect: false,
        impact: { gdp: 10, stability: -10, trust: -20 },
        feedback:
          "Dangerous. While it helps exports, it triggers imported inflation and damages the MAS's reputation for price stability.",
      },
      {
        label: 'The Resilience Package (Jobs Credit Scheme)',
        isCorrect: true,
        impact: { gdp: 5, stability: 20, trust: 10 },
        feedback:
          'Brilliant. By subsidizing wages instead of just giving handouts, you kept unemployment low and preserved institutional knowledge.',
      },
    ],
  },
  {
    id: '2014',
    year: 2014,
    title: 'Smart Nation Initiative',
    context:
      'Productivity growth is plateauing and the population is aging. How do you future-proof the economy against digital disruption?',
    options: [
      {
        label: 'Rely on Low-Cost Labor Expansion',
        isCorrect: false,
        impact: { gdp: 5, stability: -10, trust: -5 },
        feedback:
          'Short-sighted. Increasing reliance on low-cost labor would have suppressed productivity and created long-term social friction.',
      },
      {
        label: 'Invest in Digital Infrastructure & AI',
        isCorrect: true,
        impact: { gdp: 10, stability: 5, trust: 15 },
        feedback:
          "Strategic. By digitizing government services and incentivizing tech adoption, you maintained Singapore's status as a global tech hub.",
      },
    ],
  },
  {
    id: '2020',
    year: 2020,
    title: 'The COVID-19 Pandemic',
    context:
      "A global pandemic has halted travel and disrupted supply chains. Aviation and tourism-key pillars-are devastated. How do you fund the recovery?",
    options: [
      {
        label: 'Implement Austerity & Borrowing',
        isCorrect: false,
        impact: { gdp: -10, stability: -20, trust: -10 },
        feedback:
          'Harmful. Austerity during a crisis would have led to mass business failures and high unemployment, scarring the economy for years.',
      },
      {
        label: 'Draw on National Reserves',
        isCorrect: true,
        impact: { gdp: 5, stability: 25, trust: 15 },
        feedback:
          "Essential. Using the 'Rainy Day Fund' allowed for unprecedented support (nearly $100B) to save jobs and businesses without debt.",
      },
    ],
  },
];

export const EconomicGame: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [state, setState] = useState<GameState>({
    gdp: 50,
    stability: 50,
    trust: 50,
    score: 0,
    currentScenarioIndex: 0,
    isGameOver: false,
    history: [],
  });
  const [showFeedback, setShowFeedback] = useState<string | null>(null);

  const handleChoice = (option: Option) => {
    const newState = {
      ...state,
      gdp: Math.min(100, Math.max(0, state.gdp + option.impact.gdp)),
      stability: Math.min(100, Math.max(0, state.stability + option.impact.stability)),
      trust: Math.min(100, Math.max(0, state.trust + option.impact.trust)),
      score: state.score + (option.isCorrect ? 10 : 0),
      history: [
        ...state.history,
        {
          scenarioTitle: SCENARIOS[state.currentScenarioIndex].title,
          choice: option.label,
          wasCorrect: option.isCorrect,
        },
      ],
    };

    setShowFeedback(option.feedback);

    setTimeout(() => {
      setShowFeedback(null);
      if (state.currentScenarioIndex < SCENARIOS.length - 1) {
        setState({ ...newState, currentScenarioIndex: state.currentScenarioIndex + 1 });
      } else {
        setState({ ...newState, isGameOver: true });
      }
    }, 3500);
  };

  const resetGame = () => {
    setHasStarted(false);
    setShowFeedback(null);
    setState({
      gdp: 50,
      stability: 50,
      trust: 50,
      score: 0,
      currentScenarioIndex: 0,
      isGameOver: false,
      history: [],
    });
  };

  const currentScenario = SCENARIOS[state.currentScenarioIndex];

  const randomizedOptions = useMemo(() => {
    return [...currentScenario.options].sort(() => Math.random() - 0.5);
  }, [state.currentScenarioIndex]);

  if (!hasStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl border border-zinc-200 shadow-2xl p-6 md:p-10 space-y-6"
      >
        <div className="space-y-4 max-w-3xl">
          <h3 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900">Simulation Briefing</h3>
          <p className="text-base md:text-xl text-zinc-500 leading-relaxed">
            You will make eight major policy decisions across Singapore&apos;s economic history. Each choice changes GDP, social stability, and global trust.
          </p>
        </div>

        <div className="p-5 md:p-6 bg-zinc-50 rounded-2xl border border-zinc-200 shadow-sm space-y-4">
          <h4 className="font-bold text-lg flex items-center gap-2">
            <Gamepad2 size={20} className="text-emerald-500" />
            Simulation Rules
          </h4>
          <ul className="space-y-3 text-sm md:text-base text-zinc-600">
            <li className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
              Balance short-term stability with long-term growth.
            </li>
            <li className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
              Maintain global trust to attract foreign investment.
            </li>
            <li className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
              Analyze the feedback after each decision to understand the historical rationale.
            </li>
          </ul>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-sm md:text-base text-zinc-500">
            <span className="font-semibold text-zinc-900">{SCENARIOS.length} scenarios</span> across 1965 to 2020
          </div>
          <button
            onClick={() => setHasStarted(true)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all text-sm md:text-base"
          >
            <Play size={18} className="md:w-5 md:h-5" />
            Start Simulation
          </button>
        </div>
      </motion.div>
    );
  }

  if (state.isGameOver) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-6 md:p-10 border border-zinc-200 shadow-2xl text-center space-y-5 md:space-y-6"
      >
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle2 size={24} className="md:w-7 md:h-7" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Simulation Complete</h2>
          </div>
          <p className="text-zinc-500 text-base md:text-lg">
            Final Score: <span className="text-emerald-600 font-bold">{state.score}</span> / {SCENARIOS.length * 10}
          </p>
          <p className="text-zinc-400 text-sm md:text-base">
            Review the final results below, then reset the simulation to try a different path.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-4 max-w-md mx-auto">
          <MetricDisplay label="GDP" value={state.gdp} icon={<TrendingUp size={14} className="md:w-4 md:h-4" />} color="text-emerald-600" />
          <MetricDisplay label="Stability" value={state.stability} icon={<Users size={14} className="md:w-4 md:h-4" />} color="text-blue-600" />
          <MetricDisplay label="Trust" value={state.trust} icon={<Globe size={14} className="md:w-4 md:h-4" />} color="text-amber-600" />
        </div>

        <div className="bg-zinc-50 rounded-2xl p-4 md:p-6 text-left space-y-4 max-h-[300px] overflow-y-auto">
          <h4 className="font-bold text-[10px] md:text-sm uppercase tracking-widest text-zinc-400">Your Legacy</h4>
          <div className="space-y-3">
            {state.history.map((h, i) => (
              <div key={i} className="flex flex-col md:flex-row md:justify-between text-xs md:text-sm border-b border-zinc-200 pb-2 last:border-0 gap-1">
                <div className="flex flex-col">
                  <span className="text-zinc-500 font-medium">{h.scenarioTitle}</span>
                  <span className={`text-[8px] md:text-[10px] font-bold uppercase ${h.wasCorrect ? 'text-emerald-600' : 'text-red-500'}`}>
                    {h.wasCorrect ? 'Optimal Choice' : 'Sub-optimal Choice'}
                  </span>
                </div>
                <span className="font-semibold text-zinc-900">{h.choice}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={resetGame}
          className="flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all mx-auto text-sm md:text-base"
        >
          <RotateCcw size={18} className="md:w-5 md:h-5" />
          Reset Simulation
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-zinc-200 shadow-2xl overflow-hidden flex flex-col min-h-[520px] md:min-h-[560px]">
      <div className="bg-zinc-900 p-6 md:p-7 text-white flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
        <div className="flex items-center justify-between w-full lg:w-auto gap-5">
          <div className="px-5 py-2.5 bg-emerald-500 rounded-lg text-sm md:text-base font-bold uppercase tracking-widest">
            Year {currentScenario.year}
          </div>
          <div className="text-zinc-400 text-sm md:text-base font-mono">
            Scenario {state.currentScenarioIndex + 1} of {SCENARIOS.length}
          </div>
        </div>
        <div className="flex flex-wrap gap-6 md:gap-10 items-center justify-between w-full lg:w-auto">
          <button
            onClick={resetGame}
            className="p-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
            title="Reset Simulation"
          >
            <RotateCcw size={22} />
          </button>
          <div className="flex flex-col items-start md:items-end">
            <span className="text-xs md:text-sm uppercase font-bold text-zinc-500 leading-none mb-1">Score</span>
            <span className="text-emerald-400 font-mono font-bold text-2xl md:text-3xl">{state.score}</span>
          </div>
          <div className="flex gap-5 md:gap-8 flex-wrap">
            <MetricHUD icon={<TrendingUp size={22} className="md:w-6 md:h-6" />} value={state.gdp} label="GDP" />
            <MetricHUD icon={<Users size={22} className="md:w-6 md:h-6" />} value={state.stability} label="Stability" />
            <MetricHUD icon={<Globe size={22} className="md:w-6 md:h-6" />} value={state.trust} label="Trust" />
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 md:p-12 flex flex-col justify-center relative overflow-y-auto">
        <AnimatePresence mode="wait">
          {showFeedback ? (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-4 md:space-y-6"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Sparkles size={24} className="md:w-8 md:h-8" />
              </div>
              <p className="text-lg md:text-2xl font-medium text-zinc-800 max-w-xl mx-auto leading-relaxed">{showFeedback}</p>
            </motion.div>
          ) : (
            <motion.div
              key={currentScenario.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-2xl md:text-4xl font-black tracking-tight text-zinc-900">{currentScenario.title}</h2>
                <p className="text-base md:text-xl text-zinc-500 leading-relaxed">{currentScenario.context}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {randomizedOptions.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleChoice(option)}
                    className="group relative p-4 md:p-6 bg-zinc-50 border-2 border-transparent hover:border-emerald-500 hover:bg-white rounded-xl md:rounded-2xl text-left transition-all duration-300"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <span className="font-bold text-sm md:text-lg text-zinc-900 group-hover:text-emerald-600 transition-colors">
                        {option.label}
                      </span>
                      <ArrowRight size={18} className="text-zinc-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {(state.gdp < 20 || state.stability < 20 || state.trust < 20) && !showFeedback && (
          <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-full border border-red-100 animate-bounce">
            <ShieldAlert size={14} />
            <span className="text-xs font-bold uppercase">Crisis Imminent</span>
          </div>
        )}
      </div>

      <div className="h-1 bg-zinc-100">
        <motion.div
          className="h-full bg-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${((state.currentScenarioIndex + 1) / SCENARIOS.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

const MetricHUD = ({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) => (
  <div className="flex items-center gap-3">
    <div className="text-zinc-500">{icon}</div>
    <div className="flex flex-col">
      <span className="text-xs md:text-sm uppercase font-bold text-zinc-500 leading-none mb-1">{label}</span>
      <div className="w-24 md:w-28 h-2.5 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${value > 70 ? 'bg-emerald-500' : value > 30 ? 'bg-blue-500' : 'bg-red-500'}`}
          animate={{ width: `${value}%` }}
        />
      </div>
    </div>
  </div>
);

const MetricDisplay = ({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) => (
  <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
    <div className="flex items-center gap-2 mb-1">
      <div className={color}>{icon}</div>
      <span className="text-[10px] uppercase font-bold text-zinc-400">{label}</span>
    </div>
    <div className="text-xl font-black text-zinc-900">{value}</div>
  </div>
);

const Sparkles = ({ size, className }: { size: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);
