export interface EconomicMilestone {
  year: number;
  title: string;
  description: string;
  category: 'Policy' | 'Global' | 'Crisis' | 'Innovation';
  icon: string;
  imageUrl: string;
  imagePosition?: string;
}

export interface GDPData {
  year: number;
  gdp: number; // in SGD Billion
  growth: number; // percentage
}

export interface SectorData {
  year: number;
  manufacturing: number;
  services: number;
  construction: number;
  others: number;
}

export const milestones: EconomicMilestone[] = [
  {
    year: 1961,
    title: "Formation of EDB",
    description: "The Economic Development Board was established to lead Singapore's industrialization drive.",
    category: 'Policy',
    icon: 'Building2',
    imageUrl: '/timeline-images/1961.png',
    imagePosition: 'center 35%'
  },
  {
    year: 1965,
    title: "Independence",
    description: "Singapore separated from Malaysia, facing high unemployment and lack of natural resources.",
    category: 'Policy',
    icon: 'Flag',
    imageUrl: '/timeline-images/1965.png',
    imagePosition: 'center 25%'
  },
  {
    year: 1968,
    title: "Jurong Town Corporation",
    description: "JTC was formed to develop industrial estates, starting with Jurong.",
    category: 'Policy',
    icon: 'Factory',
    imageUrl: '/timeline-images/1968.png',
    imagePosition: 'center 30%'
  },
  {
    year: 1973,
    title: "First Oil Crisis",
    description: "Global oil prices spiked, testing Singapore's resilience as a refining hub.",
    category: 'Global',
    icon: 'Fuel',
    imageUrl: '/timeline-images/1973.png',
    imagePosition: 'center 35%'
  },
  {
    year: 1985,
    title: "First Post-Independence Recession",
    description: "Singapore experienced its first major economic contraction, leading to a shift towards high-value manufacturing.",
    category: 'Crisis',
    icon: 'TrendingDown',
    imageUrl: '/timeline-images/1985.png',
    imagePosition: 'center 25%'
  },
  {
    year: 1997,
    title: "Asian Financial Crisis",
    description: "Currency devaluations across Asia impacted Singapore, though it recovered relatively quickly.",
    category: 'Crisis',
    icon: 'Coins',
    imageUrl: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=800&q=80'
  },
  {
    year: 2000,
    title: "Biomedical Sciences Initiative",
    description: "A major push to make Singapore a global hub for biomedical sciences.",
    category: 'Innovation',
    icon: 'Dna',
    imageUrl: '/timeline-images/2000.png',
    imagePosition: 'center 30%'
  },
  {
    year: 2008,
    title: "Global Financial Crisis",
    description: "The collapse of Lehman Brothers triggered a global recession; Singapore responded with a massive resilience package.",
    category: 'Crisis',
    icon: 'ShieldAlert',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80'
  },
  {
    year: 2014,
    title: "Smart Nation Launch",
    description: "A national effort to harness infocomm technologies, networks, and big data to create tech-enabled solutions.",
    category: 'Innovation',
    icon: 'Cpu',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
  },
  {
    year: 2020,
    title: "COVID-19 Pandemic",
    description: "Global lockdowns and supply chain disruptions led to significant economic challenges and a shift to digital resilience.",
    category: 'Crisis',
    icon: 'Activity',
    imageUrl: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=800&q=80'
  }
];

export const gdpHistory: GDPData[] = [
  { year: 1960, gdp: 2.1, growth: 0 },
  { year: 1965, gdp: 3.3, growth: 7.5 },
  { year: 1970, gdp: 6.1, growth: 13.4 },
  { year: 1975, gdp: 14.2, growth: 4.1 },
  { year: 1980, gdp: 26.8, growth: 10.3 },
  { year: 1985, gdp: 41.0, growth: -0.6 },
  { year: 1990, gdp: 71.7, growth: 9.5 },
  { year: 1995, gdp: 127.1, growth: 7.2 },
  { year: 2000, gdp: 166.4, growth: 9.0 },
  { year: 2005, gdp: 209.5, growth: 7.5 },
  { year: 2010, gdp: 326.8, growth: 14.5 },
  { year: 2015, gdp: 423.6, growth: 3.0 },
  { year: 2020, gdp: 476.4, growth: -3.9 },
  { year: 2023, gdp: 673.3, growth: 1.1 }
];

export const sectorHistory: SectorData[] = [
  { year: 1960, manufacturing: 12, services: 70, construction: 3, others: 15 },
  { year: 1980, manufacturing: 28, services: 62, construction: 6, others: 4 },
  { year: 2000, manufacturing: 25, services: 68, construction: 5, others: 2 },
  { year: 2022, manufacturing: 21, services: 71, construction: 3, others: 5 }
];
