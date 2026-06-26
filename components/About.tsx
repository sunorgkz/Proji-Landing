import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Users, Globe, Rocket, Award, ShieldCheck } from 'lucide-react';

const values = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Экспертиза",
    description: "Глубокое понимание бизнес-процессов, отточенное за 15 лет практики в IT-индустрии."
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Инновации",
    description: "Мы внедряем передовые AI-решения, которые реально работают и приносят прибыль."
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Масштаб",
    description: "Опыт работы над проектами любого уровня — от локальных стартапов до международных корпораций."
  }
];

export const About: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[10%] right-[5%] w-[600px] h-[600px] bg-brand-500/10 dark:bg-brand-600/5 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-600/5 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-sm font-semibold mb-6"
          >
            <Award className="w-4 h-4" />
            <span>15 лет технологического лидерства</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold mb-8 text-slate-900 dark:text-white leading-tight"
          >
            Sunnet <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-brand-400 to-purple-600">
              business technologies
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto"
          >
            Мы — команда экспертов, работающая более 15 лет над созданием сложных IT-решений. Наш опыт охватывает сотни проектов: от небольших локальных внедрений до масштабных международных платформ.
          </motion.p>
        </div>

        {/* Experience Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
           {[
             { label: "Лет опыта", value: "15+", icon: <Rocket className="w-8 h-8 text-brand-500" /> },
             { label: "Успешных проектов", value: "300+", icon: <ShieldCheck className="w-8 h-8 text-green-500" /> },
             { label: "География", value: "Глобальная", icon: <Globe className="w-8 h-8 text-purple-500" /> }
           ].map((stat, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.1 }}
               className="glass-card p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/10 text-center bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 transition-all group"
             >
                <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                <div className="text-5xl font-black text-slate-900 dark:text-white mb-3 tracking-tighter">{stat.value}</div>
                <div className="text-slate-500 dark:text-gray-400 font-semibold uppercase tracking-widest text-xs">{stat.label}</div>
             </motion.div>
           ))}
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
           <motion.div 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="relative"
           >
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-600 to-purple-600 rounded-[3rem] transform -rotate-2 opacity-10 blur-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop" 
                alt="Our Expertise" 
                className="relative rounded-[3rem] shadow-2xl border border-white/20 aspect-video object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-2xl border border-slate-100 dark:border-white/10 max-w-[200px]">
                 <p className="text-brand-600 dark:text-brand-400 font-bold text-lg mb-1">Local to Global</p>
                 <p className="text-xs text-slate-500 dark:text-gray-400">Проекты любого масштаба и сложности</p>
              </div>
           </motion.div>
           <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="space-y-8"
           >
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Наш Путь</h2>
              <div className="space-y-6">
                 <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
                   Sunnet business technologies зародилась на стыке бизнеса и технологий. Мы поняли, что настоящая ценность заключается не в коде, а в решении конкретных задач предпринимателей.
                 </p>
                 <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
                   За 15 лет мы накопили уникальную базу знаний, которая позволяет нам сегодня создавать продукты вроде Proji — системы, объединяющей многолетний опыт автоматизации и новейшие алгоритмы ИИ.
                 </p>
              </div>
              <div className="flex gap-4">
                 <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                       <div key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-[#0f172a] bg-slate-200 dark:bg-slate-700 overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Team" className="w-full h-full object-cover" />
                       </div>
                    ))}
                 </div>
                 <div className="text-sm">
                    <p className="font-bold text-slate-900 dark:text-white">Сильная команда</p>
                    <p className="text-slate-500 dark:text-gray-400">Эксперты со всего мира</p>
                 </div>
              </div>
           </motion.div>
        </div>

        {/* Values Grid */}
        <div className="mb-20">
           <h2 className="text-3xl font-bold text-center mb-16 text-slate-900 dark:text-white">Наши Принципы</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((val, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-[#1e293b]/30 p-10 rounded-[2rem] border border-slate-200 dark:border-white/5 hover:border-brand-500/50 hover:bg-white/80 dark:hover:bg-[#1e293b]/50 transition-all shadow-sm"
                >
                   <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/40 rounded-2xl flex items-center justify-center text-brand-600 dark:text-brand-400 mb-6 shadow-inner">
                      {val.icon}
                   </div>
                   <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{val.title}</h3>
                   <p className="text-slate-600 dark:text-gray-400 leading-relaxed">{val.description}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};
