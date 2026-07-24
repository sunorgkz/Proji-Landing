import React from 'react';
import { Link } from 'react-router-dom';
import {
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
import { catalogGroups, CORE_SLUGS, type CatalogIconName } from '../landings/catalog';

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

export const Footer: React.FC = () => {
  const allProducts = catalogGroups.flatMap(group => group.items);
  const core = allProducts.filter(p => (CORE_SLUGS as readonly string[]).includes(p.slug));
  const more = allProducts.filter(p => !(CORE_SLUGS as readonly string[]).includes(p.slug));

  return (
    <footer className="bg-[#050a14] border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-14">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <span className="text-2xl font-bold text-white">Proji</span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
              ИИ-платформа нового поколения. Автоматизируйте рутину, фокусируйтесь на главном.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link to="/" className="text-brand-400 hover:text-brand-300 transition-colors">
                Главная
              </Link>
              <span className="text-white/20">·</span>
              <Link to="/services" className="text-brand-400 hover:text-brand-300 transition-colors">
                Все продукты
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Ядро</h4>
            <ul className="space-y-3">
              {core.map(product => {
                const Icon = CATALOG_ICONS[product.icon];
                return (
                  <li key={product.slug}>
                    <Link
                      to={`/${product.slug}`}
                      className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-400 transition-colors text-sm"
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      {product.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Ещё продукты</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {more.map(product => {
                const Icon = CATALOG_ICONS[product.icon];
                return (
                  <Link
                    key={product.slug}
                    to={`/${product.slug}`}
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-400 transition-colors text-sm"
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    {product.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p>© Proji. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
