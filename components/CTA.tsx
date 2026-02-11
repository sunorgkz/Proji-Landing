import React from 'react';
import { Button } from './ui/Button';
import { TrendingUp, PieChart, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const CTA: React.FC = () => {
  const handleWhatsApp = (message: string) => {
    const phone = '77766006636';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
         <img 
           src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2560&auto=format&fit=crop" 
           className="w-full h-full object-cover opacity-20"
           alt="Data analytics background" 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-20 relative overflow-hidden shadow-2xl">
           {/* Decorative Glow */}
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/20 rounded-full -translate-y-1/2 translate-x-1/3 blur-[120px]"></div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
              <div className="space-y-8">
                 <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                    Время <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">расти</span> и
                    автоматизировать
                 </h2>
                 <p className="text-blue-100/80 text-xl max-w-lg leading-relaxed">
                    Не гадайте, где теряете деньги. Наша система аналитики найдет точки роста за вас, пока вы спите.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-5">
                    <Button onClick={() => handleWhatsApp("Здравствуйте, хочу найти точки роста")} variant="primary" size="lg" className="h-14 px-8 text-lg" withArrow>
                       Найдем точки роста
                    </Button>
                    <Button onClick={() => handleWhatsApp("Здравствуйте, хочу посмотреть демо")} variant="outline" size="lg" className="h-14 px-8 text-lg border-white/20 hover:bg-white/10">
                       <PieChart className="w-5 h-5 mr-2" />
                       Смотреть демо
                    </Button>
                 </div>
              </div>
              
              <div className="flex justify-center md:justify-end">
                 <motion.div 
                    initial={{ scale: 0.9, opacity: 0, rotateY: 30 }}
                    whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="bg-[#1e293b]/80 backdrop-blur-2xl p-8 rounded-3xl border border-white/20 w-full max-w-md shadow-2xl relative"
                 >
                    <div className="absolute -top-6 -right-6 bg-green-500 text-white p-4 rounded-2xl shadow-xl border-4 border-[#0f172a] animate-bounce">
                       <ArrowUpRight className="w-8 h-8" />
                    </div>

                    <div className="flex items-center justify-between mb-10">
                       <div>
                          <p className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-1">Общая выручка</p>
                          <h3 className="text-4xl font-bold text-white">$124,592</h3>
                       </div>
                       <div className="bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20 text-green-400 font-bold text-sm flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" /> +127%
                       </div>
                    </div>
                    
                    {/* Animated Chart */}
                    <div className="h-48 flex items-end justify-between gap-3">
                       {[35, 55, 45, 70, 65, 85, 100].map((h, i) => (
                          <motion.div 
                            key={i}
                            initial={{ height: "5%" }}
                            whileInView={{ height: `${h}%` }}
                            transition={{ delay: i * 0.1, duration: 1, ease: "easeOut" }}
                            className="w-full bg-gradient-to-t from-brand-600 to-brand-400 rounded-t-lg relative group overflow-hidden"
                          >
                             {/* Gloss on bar */}
                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-y-full group-hover:translate-y-[-100%] transition-transform duration-1000"></div>
                             
                             <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-brand-900 text-xs font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                ${(h * 1240).toLocaleString()}
                             </div>
                          </motion.div>
                       ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-4 font-medium uppercase tracking-wide">
                       <span>Mon</span>
                       <span>Tue</span>
                       <span>Wed</span>
                       <span>Thu</span>
                       <span>Fri</span>
                       <span>Sat</span>
                       <span>Sun</span>
                    </div>
                 </motion.div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};