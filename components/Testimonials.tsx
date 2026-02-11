import React from 'react';
import { Star } from 'lucide-react';
import europeanBank from '../assets/european_bank.png';
import freedomBroker from '../assets/Freedom_broker.png';
import kzTemir from '../assets/KZ_temir.png';
import googleDev from '../assets/Google_dev.png';
import easyLogo from '../assets/Easy.png';

// Using public URLs for known companies to ensure they display immediately.
// For production, download these SVG/PNGs and serve them locally.
const clients = [
  {
    name: "European Bank for Reconstruction and Development",
    logo: europeanBank,
    className: "h-12 md:h-16 w-auto object-contain"
  },
  {
    name: "Freedom Broker",
    logo: freedomBroker,
    className: "h-10 md:h-14 w-auto object-contain"
  },
  {
    name: "Kazakstan Temir Zholy",
    logo: kzTemir,
    className: "h-12 md:h-16 w-auto object-contain"
  },
  {
    name: "Google Developer Groups",
    logo: googleDev,
    className: "h-10 md:h-14 w-auto object-contain"
  },
  {
    name: "EASY",
    logo: easyLogo,
    className: "h-10 md:h-14 w-auto object-contain"
  }
];

const reviews = [
  {
    text: "Proji автоматизировал наш отдел поддержки на 90%. Это невероятно, как быстро система обучается.",
    author: "Александр В.",
    role: "CEO, TechFlow",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    text: "Мы проверяем по 5 гипотез в день с помощью Ген.сайта. Скорость маркетинга выросла в 10 раз.",
    author: "Елена К.",
    role: "Маркетинг директор",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    text: "CRM больше не требует ручного ввода. Менеджеры наконец-то продают, а не заполняют таблицы.",
    author: "Дмитрий С.",
    role: "Head of Sales",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 border-y border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#080c16] relative overflow-hidden transition-colors duration-500">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
         <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-blue-200/50 dark:bg-blue-900/30 blur-[100px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 mb-24 relative z-10">
        <div className="text-center mb-12">
           <h2 className="text-sm font-bold text-slate-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-3">Нам доверяют лидеры рынка</h2>
           <div className="w-12 h-1 bg-brand-500 mx-auto rounded-full"></div>
        </div>
        
        {/* Infinite Scroll Marquee for Logos */}
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_li]:md:mx-16 animate-scroll">
            {clients.map((client, index) => (
              <li key={index} className="flex-shrink-0 transition-all duration-500">
                <div className="flex items-center justify-center px-8 py-5 md:px-10 md:py-6 rounded-2xl bg-slate-900/95 dark:bg-slate-900/95 border border-slate-900/60 shadow-lg backdrop-blur-md">
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className={`${client.className} max-w-[220px] md:max-w-[260px]`}
                  />
                </div>
              </li>
            ))}
             {/* Duplicate for seamless loop */}
             {clients.map((client, index) => (
              <li key={`dup-${index}`} className="flex-shrink-0 transition-all duration-500">
                <div className="flex items-center justify-center px-8 py-5 md:px-10 md:py-6 rounded-2xl bg-slate-900/95 dark:bg-slate-900/95 border border-slate-900/60 shadow-lg backdrop-blur-md">
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className={`${client.className} max-w-[220px] md:max-w-[260px]`}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
         <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Почему выбирают нас</h2>
            <p className="text-slate-600 dark:text-gray-400">Реальные истории роста с Proji</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-white/10 relative hover:-translate-y-2 transition-transform duration-300 bg-white dark:bg-white/5 shadow-xl dark:shadow-none">
                 <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-600 rounded-full flex items-center justify-center text-2xl shadow-lg text-white">❝</div>
                 
                 <div className="flex gap-1 text-yellow-500 dark:text-yellow-400 mb-6">
                    {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
                 </div>
                 
                 <p className="text-lg text-slate-700 dark:text-gray-200 mb-8 italic leading-relaxed">"{review.text}"</p>
                 
                 <div className="flex items-center gap-4 mt-auto border-t border-slate-100 dark:border-white/5 pt-6">
                    <img src={review.image} alt={review.author} className="w-12 h-12 rounded-full object-cover border-2 border-brand-500/50" />
                    <div>
                       <div className="font-bold text-slate-900 dark:text-white">{review.author}</div>
                       <div className="text-xs text-brand-600 dark:text-brand-400 font-medium uppercase tracking-wider">{review.role}</div>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </section>
  );
};