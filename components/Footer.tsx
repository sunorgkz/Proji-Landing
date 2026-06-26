import React from 'react';
import { Twitter, Linkedin, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050a14] border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl font-bold text-white">Proji</span>
             </div>
             <p className="text-gray-400 max-w-sm mb-6">
                ИИ-платформа нового поколения. Автоматизируйте рутину, фокусируйтесь на главном.
             </p>
             <div className="flex gap-4">
                {[Twitter, Linkedin, Github].map((Icon, i) => (
                   <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-600 transition-colors text-white">
                      <Icon className="w-5 h-5" />
                   </a>
                ))}
             </div>
          </div>
          
          <div className="col-span-1 md:col-span-2">
             <h4 className="text-white font-semibold mb-6">Продукт</h4>
             <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-brand-400 transition-colors">Цифровые сотрудники</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">ProGPT</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">ИИ CRM</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Ген.сайт</a></li>
             </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
           <p>© Proji. Все права защищены.</p>
           <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white">Условия использования</a>
           </div>
        </div>
      </div>
    </footer>
  );
};