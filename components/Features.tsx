import React, { useRef, useState } from 'react';
import { Bot, Users, CheckSquare, BrainCircuit, BarChart3, MessageSquare, Database, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Feature } from '../types';

const features: Feature[] = [
  {
    id: 'employees',
    title: 'Цифровые сотрудники',
    description: 'Виртуальные агенты, выполняющие работу целого отдела 24/7 без больничных и отпусков.',
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: 'agents',
    title: 'Автономные Агенты',
    description: 'Самообучающиеся сущности, способные принимать решения в рамках заданных скриптов.',
    icon: <Bot className="w-6 h-6" />,
  },
  {
    id: 'tasker',
    title: 'Умный Таскер',
    description: 'Система достижения целей. Декомпозирует большие проекты на микро-задачи с поддержкой ИИ.',
    icon: <CheckSquare className="w-6 h-6" />,
  },
  {
    id: 'progpt',
    title: 'ПроДЖПТ',
    description: 'Наша собственная языковая модель, обученная на лучших бизнес-практиках.',
    icon: <BrainCircuit className="w-6 h-6" />,
  },
  {
    id: 'crm',
    title: 'ИИ CRM',
    description: 'Система, которая закрывает хаос в продажах, автоматически заполняя данные и ведя клиента.',
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    id: 'chatbot',
    title: 'Умный Чатбот',
    description: 'Мгновенные ответы клиентам на любом языке и в любом канале коммуникации.',
    icon: <MessageSquare className="w-6 h-6" />,
  },
  {
    id: 'knowledge',
    title: 'База Знаний',
    description: 'Централизованное хранилище опыта компании, доступное сотрудникам за секунды.',
    icon: <Database className="w-6 h-6" />,
  },
  {
    id: 'gensite',
    title: 'Ген.сайт',
    description: 'Проверка маркетинговой гипотезы до 1 минуты. Создание лендингов на лету.',
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    highlight: 'Скорость < 1 мин'
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const SpotlightCard = ({ children, className = "" }: { children?: React.ReactNode; className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a] overflow-hidden ${className} shadow-sm dark:shadow-none`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(14, 165, 233, 0.1), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

export const Features: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-brand-dark relative z-10 overflow-hidden transition-colors duration-500" id="features">
       {/* Background Abstract Image */}
       <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 dark:opacity-10 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2560&auto=format&fit=crop" 
            className="w-full h-full object-cover mix-blend-color-dodge" 
            alt="Cyberpunk texture"
          />
       </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 tracking-tight text-slate-900 dark:text-white">
            Экосистема <span className="text-brand-600 dark:text-brand-500">Proji</span>
          </h2>
          <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Единый организм инструментов для тотальной автоматизации и роста вашего бизнеса.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.id} variants={item}>
              <SpotlightCard className="h-full p-8 group hover:bg-slate-50 dark:hover:bg-[#1e293b]/50 transition-colors">
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-2 h-2 rounded-full bg-brand-400 shadow-[0_0_15px_rgba(56,189,248,0.8)]"></div>
                </div>
                
                <div className="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-500/20 flex items-center justify-center mb-6 text-brand-600 dark:text-brand-400 group-hover:scale-110 group-hover:bg-brand-600 dark:group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 shadow-lg shadow-brand-500/10 dark:shadow-brand-900/50">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 group-hover:text-brand-700 dark:group-hover:text-brand-200 transition-colors">
                  {feature.title}
                  {feature.highlight && (
                    <span className="text-[10px] bg-gradient-to-r from-yellow-500/10 to-orange-500/10 dark:from-yellow-500/20 dark:to-orange-500/20 text-yellow-600 dark:text-yellow-300 px-2 py-0.5 rounded-full border border-yellow-500/30 shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                      {feature.highlight}
                    </span>
                  )}
                </h3>
                
                <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed group-hover:text-slate-800 dark:group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};