import React from 'react';
import { motion } from 'framer-motion';
import { Database, Brain, Rocket } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-32 bg-white dark:bg-[#0B1120] overflow-hidden relative transition-colors duration-500">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 w-[800px] h-[800px] bg-brand-100/50 dark:bg-brand-900/20 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Архитектура Роста</h2>
          <p className="text-slate-600 dark:text-gray-400 text-lg">Как Proji трансформирует хаос в систему</p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Animated Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-slate-200 dark:bg-gray-800 rounded-full overflow-hidden">
             <motion.div 
               className="w-1/3 h-full bg-gradient-to-r from-transparent via-brand-500 to-transparent"
               animate={{ x: ['-100%', '300%'] }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             ></motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-brand-500/30 transition-colors duration-500 bg-white/80 dark:bg-[#131c2e]/50 backdrop-blur-sm shadow-xl dark:shadow-none">
                <div className="w-24 h-24 mx-auto bg-slate-50 dark:bg-[#0B1120] rounded-2xl border border-slate-200 dark:border-gray-700 flex items-center justify-center relative mb-8 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <Database className="w-10 h-10 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors" />
                  <div className="absolute -top-3 -right-3 bg-blue-600 text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-blue-400 text-white">ВХОД</div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center text-slate-900 dark:text-white">Сбор Данных</h3>
                <p className="text-slate-600 dark:text-gray-400 text-center leading-relaxed">
                  Система подключается к вашим каналам продаж, CRM и мессенджерам, агрегируя хаотичные потоки информации в единый хаб.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="relative group mt-0 md:-mt-8"
            >
              <div className="glass-card p-8 rounded-3xl border border-brand-500/30 bg-gradient-to-b from-brand-50 to-white dark:from-brand-900/20 dark:to-[#131c2e]/50 backdrop-blur-sm shadow-xl shadow-brand-500/10 dark:shadow-[0_0_50px_rgba(14,165,233,0.1)]">
                <div className="w-24 h-24 mx-auto bg-brand-600 rounded-2xl border-4 border-brand-400/20 flex items-center justify-center relative mb-8 shadow-[0_0_30px_rgba(14,165,233,0.4)] group-hover:rotate-12 transition-transform duration-300">
                  <Brain className="w-12 h-12 text-white" />
                  <div className="absolute -bottom-4 bg-white dark:bg-[#0B1120] px-4 py-1.5 rounded-full text-xs font-bold border border-brand-200 dark:border-brand-700 text-brand-600 dark:text-brand-400">ProGPT</div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center text-slate-900 dark:text-white">Обработка ИИ</h3>
                <p className="text-slate-600 dark:text-gray-300 text-center leading-relaxed">
                  Нейросеть анализирует контекст, распределяет задачи между агентами и генерирует решения за миллисекунды.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-green-500/30 transition-colors duration-500 bg-white/80 dark:bg-[#131c2e]/50 backdrop-blur-sm shadow-xl dark:shadow-none">
                <div className="w-24 h-24 mx-auto bg-slate-50 dark:bg-[#0B1120] rounded-2xl border border-slate-200 dark:border-gray-700 flex items-center justify-center relative mb-8 shadow-inner group-hover:translate-y-[-10px] transition-transform duration-300">
                  <Rocket className="w-10 h-10 text-green-500 dark:text-green-400" />
                  <div className="absolute -top-3 -left-3 bg-green-500 text-xs font-bold px-3 py-1 rounded-full shadow-lg text-white dark:text-black border border-green-400">ИТОГ</div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center text-slate-900 dark:text-white">Результат</h3>
                <p className="text-slate-600 dark:text-gray-400 text-center leading-relaxed">
                  Вы получаете готовые лиды, автоматические продажи и отчеты. Рутина исчезает, остается чистая прибыль.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};