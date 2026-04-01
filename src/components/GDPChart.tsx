import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { gdpHistory } from '../data/singaporeEconomy';

export const GDPChart: React.FC = () => {
  return (
    <div className="h-[300px] md:h-[400px] w-full bg-white/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-black/5 shadow-sm">
      <div className="mb-4">
        <h3 className="font-sans font-medium text-base md:text-lg text-zinc-900">GDP Growth (1960 - 2023)</h3>
        <p className="text-xs md:text-sm text-zinc-500 italic">Current Prices in SGD Billion</p>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={gdpHistory}>
          <defs>
            <linearGradient id="colorGdp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis 
            dataKey="year" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#71717a' }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#71717a' }}
            tickFormatter={(value) => `$${value}B`}
          />
          <Tooltip 
            formatter={(value: number) => [`${value}`, 'GDP']}
            contentStyle={{ 
              backgroundColor: '#fff', 
              borderRadius: '8px', 
              border: '1px solid #f4f4f5',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="gdp" 
            stroke="#10b981" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorGdp)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
