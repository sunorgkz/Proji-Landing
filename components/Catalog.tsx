import React from 'react';
import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  Users,
  Bot,
  Sparkles,
  Workflow,
  MessagesSquare,
  Brain,
  Share2,
  BookOpen,
  Archive,
  Copy,
  BrainCircuit,
  Building2,
  Network,
  Cpu,
  Target,
  Chrome,
  UserSearch,
  Rocket,
  type LucideIcon,
} from 'lucide-react';
import { catalogGroups, coreCatalogItems, type CatalogIconName } from '../landings/catalog';

const CATALOG_ICONS: Record<CatalogIconName, LucideIcon> = {
  Users,
  Bot,
  Sparkles,
  Workflow,
  MessagesSquare,
  Brain,
  Share2,
  BookOpen,
  Archive,
  Copy,
  BrainCircuit,
  Building2,
  Network,
  Cpu,
  Target,
  Chrome,
  UserSearch,
  Rocket,
};

const groupVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

interface CatalogProps {
  /** `core` — только ядро (главная). `all` — полный каталог (/services). */
  mode?: 'core' | 'all';
}

export const Catalog: React.FC<CatalogProps> = ({ mode = 'core' }) => {
  const isCore = mode === 'core';

  return (
    <section
      id="catalog"
      className="py-24 bg-white dark:bg-[#0b1220] relative z-10 transition-colors duration-500 overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/10 blur-[120px] rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 tracking-tight text-slate-900 dark:text-white">
            {isCore ? (
              <>
                Шесть продуктов. <span className="text-brand-600 dark:text-brand-500">Одна система.</span>
              </>
            ) : (
              <>
                Один Proji. <span className="text-brand-600 dark:text-brand-500">Все истории</span> о том,
                как ИИ забирает рутину.
              </>
            )}
          </h2>
          <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            {isCore
              ? 'Начните с того, что закрывает вашу главную боль. Остальные продукты — внизу страницы и в полном каталоге.'
              : 'Каждый продукт — отдельный лендинг со своей историей. Выберите, с чего начнётся ваша.'}
          </p>
        </div>

        {isCore ? (
          <>
            <motion.div
              variants={groupVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
            >
              {coreCatalogItems.map(product => {
                const Icon = CATALOG_ICONS[product.icon];
                return (
                  <motion.div key={product.slug} variants={cardVariants} className="h-full">
                    <Link
                      to={`/${product.slug}`}
                      className="group relative flex h-full flex-col rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0f172a] p-7 overflow-visible transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/60 dark:hover:border-brand-500/50"
                    >
                      {/* Decorative oversized icon — bleeds outside the card edge */}
                      <Icon
                        aria-hidden
                        className="pointer-events-none absolute -top-5 -right-5 w-24 h-24 text-brand-500/[0.07] dark:text-brand-400/[0.08] group-hover:text-brand-500/[0.14] dark:group-hover:text-brand-400/[0.16] transition-colors duration-300 rotate-[8deg]"
                      />
                      <div className="relative flex items-center justify-between mb-3">
                        <div className="text-sm text-slate-600 dark:text-gray-400">
                          /{product.slug}
                        </div>
                        <motion.span
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            duration: 3.2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: Math.random() * 1.2,
                          }}
                          className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 group-hover:bg-brand-100 dark:group-hover:bg-brand-500/20 transition-colors"
                        >
                          <Icon className="w-4.5 h-4.5" />
                        </motion.span>
                      </div>
                      <h4 className="relative text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors">
                        {product.name}
                      </h4>
                      <p className="relative text-base font-medium text-slate-700 dark:text-gray-300 mb-3 leading-snug">
                        {product.hook}
                      </p>
                      <p className="relative text-base text-slate-600 dark:text-gray-300 leading-relaxed flex-1">
                        {product.desc}
                      </p>
                      <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 dark:text-brand-400">
                        {product.cta}
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            <div className="mt-14 text-center">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 dark:text-brand-400 hover:gap-3 transition-all"
              >
                Смотреть все продукты
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        ) : (
          <div className="space-y-16">
            {catalogGroups.map(group => (
              <div key={group.id}>
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-base font-semibold text-slate-600 dark:text-gray-400 whitespace-nowrap">
                    {group.title}
                  </h3>
                  <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                </div>

                <motion.div
                  variants={groupVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-80px' }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  {group.items.map(product => {
                    const Icon = CATALOG_ICONS[product.icon];
                    return (
                      <motion.div key={product.slug} variants={cardVariants} className="h-full">
                        <Link
                          to={`/${product.slug}`}
                          className="group relative flex h-full flex-col rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0f172a] p-7 overflow-visible transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/60 dark:hover:border-brand-500/50"
                        >
                          <Icon
                            aria-hidden
                            className="pointer-events-none absolute -top-5 -right-5 w-24 h-24 text-brand-500/[0.07] dark:text-brand-400/[0.08] group-hover:text-brand-500/[0.14] dark:group-hover:text-brand-400/[0.16] transition-colors duration-300 rotate-[8deg]"
                          />
                          <div className="relative flex items-center justify-between mb-3">
                            <div className="text-sm text-slate-600 dark:text-gray-400">
                              /{product.slug}
                            </div>
                            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 group-hover:bg-brand-100 dark:group-hover:bg-brand-500/20 transition-colors">
                              <Icon className="w-4.5 h-4.5" />
                            </span>
                          </div>
                          <h4 className="relative text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors">
                            {product.name}
                          </h4>
                          <p className="relative text-base font-medium text-slate-700 dark:text-gray-300 mb-3 leading-snug">
                            {product.hook}
                          </p>
                          <p className="relative text-base text-slate-600 dark:text-gray-300 leading-relaxed flex-1">
                            {product.desc}
                          </p>
                          <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 dark:text-brand-400">
                            {product.cta}
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
