import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Smartphone, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackEvent } from '../analytics';
import { submitDemoRequest } from '../lib/submitDemoRequest';
import { HeroIllustration } from './HeroIllustration';

export const Hero: React.FC = () => {
  const [phoneSubmitted, setPhoneSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [phoneSending, setPhoneSending] = useState(false);

  const handleStartFree = () => {
    trackEvent('cta_start_free_click');
    window.location.href = 'https://proji.kz';
  };

  const handleWhatsApp = (message: string) => {
    const phone = '77766006636';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    trackEvent('cta_whatsapp_consult_click', { phone, message });
    window.open(url, '_blank');
  };

  return (
    <section className="relative min-h-[100svh] pt-28 pb-16 overflow-hidden flex items-center bg-slate-50 dark:bg-transparent transition-colors duration-500">
      {/* Atmosphere — full-bleed gradient plane */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(14,165,233,0.18),transparent_55%),radial-gradient(ellipse_60%_50%_at_15%_80%,rgba(56,189,248,0.12),transparent_50%),linear-gradient(180deg,#f8fafc_0%,#eef6fb_50%,#f8fafc_100%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(14,165,233,0.22),transparent_55%),radial-gradient(ellipse_60%_50%_at_15%_80%,rgba(14,116,144,0.18),transparent_50%),linear-gradient(180deg,#0b1220_0%,#0f172a_55%,#0b1220_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.35] dark:opacity-[0.25] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22><path d=%22M40 0H0V40%22 fill=%22none%22 stroke=%22%230ea5e9%22 stroke-opacity=%220.06%22 stroke-width=%221%22/></svg>')]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-7 max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
          >
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-brand-600 dark:text-brand-400">
              Proji
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-slate-900 dark:text-white">
              ИИ, который ведёт
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-cyan-500 dark:from-brand-400 dark:to-cyan-300">
                ваш бизнес целиком
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Proji — операционная система для компании: агенты закрывают рутину,
              знания остаются в команде, продажи и процессы идут без хаоса.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-1 justify-center lg:justify-start">
              <Button
                onClick={handleStartFree}
                variant="primary"
                size="lg"
                withArrow
                className="h-14 px-8 text-base"
                data-cta-dest="https://proji.kz"
              >
                Начать бесплатно
              </Button>
              <Button
                onClick={() => handleWhatsApp('Здравствуйте, хочу получить консультацию по Proji')}
                variant="outline"
                size="lg"
                className="h-14 px-8 text-base"
                data-cta-dest="whatsapp:+77766006636"
              >
                Получить консультацию
              </Button>
            </div>

            <div className="pt-2 flex flex-col items-center lg:items-start">
              <p className="text-sm text-slate-500 dark:text-gray-400 mb-3 inline-flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                Получить презентацию на телефон
              </p>
              {!phoneSubmitted ? (
                <form
                  onSubmit={async e => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const phone = new FormData(form).get('phone')?.toString().trim() ?? '';
                    if (!phone) return;
                    setPhoneSending(true);
                    setPhoneError(false);
                    try {
                      await submitDemoRequest('Презентация на телефон (главная)', phone);
                      setPhoneSubmitted(true);
                      trackEvent('phone_presentation_request_submitted', { phone });
                    } catch {
                      setPhoneError(true);
                    } finally {
                      setPhoneSending(false);
                    }
                  }}
                  className="flex max-w-xs w-full shadow-lg rounded-xl overflow-hidden"
                  data-cta-dest="formsubmit:sund.serik@gmail.com"
                >
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+7 700 0000"
                    className="flex-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 border-r-0 rounded-l-xl px-4 py-3 focus:outline-none focus:border-brand-500 text-slate-900 dark:text-white text-sm placeholder:text-slate-400"
                    required
                    disabled={phoneSending}
                  />
                  <button
                    type="submit"
                    disabled={phoneSending}
                    className="bg-gradient-to-r from-brand-600 to-brand-500 hover:to-brand-400 px-5 rounded-r-xl transition-all disabled:opacity-60"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-600 dark:text-green-400 text-sm font-medium bg-green-100 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 px-4 py-2 rounded-lg inline-flex items-center"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Заявка отправлена!
                </motion.div>
              )}
              {phoneError && (
                <p className="mt-2 text-sm text-rose-500">
                  Не удалось отправить. Напишите в WhatsApp или на sund.serik@gmail.com
                </p>
              )}
            </div>
          </motion.div>

          {/* Animated SVG cover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <HeroIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
