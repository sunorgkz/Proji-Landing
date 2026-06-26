import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Briefcase, Quote } from 'lucide-react';
import serikImage from '../assets/serik.png';

export const FounderNote: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-[#0B1120] relative overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Marketing Text */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                Проверено временем
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                Опыт <span className="text-brand-600 dark:text-brand-400">Sunnet BT</span>:<br/>
                от стартапов до корпораций
              </h2>
              
              <div className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed space-y-4">
                <p>
                  Мы внедряем IT-решения уже <strong>15 лет</strong>. В нашем портфолио — более <strong>300 успешных проектов</strong>.
                </p>
                <p>
                  Мы работаем с бизнесом любого масштаба: от малых предприятий до крупнейших корпораций. Весь этот опыт мы вложили в Proji, чтобы сделать технологии Enterprise-уровня доступными для вас.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                 <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/10">
                    <div className="text-3xl font-bold text-brand-600 dark:text-brand-400 mb-1">15+</div>
                    <div className="text-xs text-slate-500 dark:text-gray-400 font-medium">Лет внедряем решения</div>
                 </div>
                 <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/10">
                    <div className="text-3xl font-bold text-brand-600 dark:text-brand-400 mb-1">300+</div>
                    <div className="text-xs text-slate-500 dark:text-gray-400 font-medium">Успешных проектов</div>
                 </div>
              </div>
            </motion.div>

            {/* Right: Founder Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
               {/* Background blob */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-brand-500/20 to-purple-500/20 rounded-full blur-3xl -z-10"></div>

               <div className="glass-card p-2 rounded-[2.5rem] bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-2xl relative">
                  <div className="bg-white dark:bg-[#151e32] rounded-[2rem] overflow-hidden relative group">
                     
                     <div className="aspect-[4/3] relative overflow-hidden bg-brand-100 dark:bg-brand-900/20">
                        <img 
                          src={serikImage}
                          alt="Серик, Основатель Proji" 
                          className="w-full h-full object-cover transform translate-y-2 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#151e32] via-transparent to-transparent opacity-80"></div>
                        
                        <div className="absolute bottom-6 left-6 right-6">
                           <div className="inline-flex items-center gap-2 bg-brand-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-3 shadow-lg">
                              <Award className="w-3 h-3" />
                              Основатель
                           </div>
                           <h3 className="text-2xl font-bold text-white mb-1">Серик</h3>
                           <p className="text-brand-200 text-sm font-medium">CEO Sunnet & Proji</p>
                        </div>
                     </div>
                     
                     <div className="p-8 relative">
                        <Quote className="absolute top-6 right-6 w-8 h-8 text-brand-100 dark:text-brand-900/30 rotate-180" />
                        <p className="text-slate-600 dark:text-gray-300 italic relative z-10 leading-relaxed">
                           "Мы делали Proji не как очередной инструмент, а как систему, в которой мечтали бы работать сами. Без хаоса, без бюрократии."
                        </p>
                     </div>
                  </div>
               </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};