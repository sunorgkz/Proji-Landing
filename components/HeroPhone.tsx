import React, { useState, useRef } from 'react';
import { Play, Pause, Smartphone, Send, Mic, CheckCircle2, Zap, Calendar, MessageCircle, BarChart, AlertCircle, FileText, Upload } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import welcomeSerik from '../assets/welcome-serik.m4a';
import { trackEvent } from '../analytics';

const transcriptData = [
  { start: 0, end: 3, text: "Привет! Вы на странице Proji." },
  { start: 3, end: 7, text: "Системы, которая помогает бизнесу не тонуть в хаосе." },
  { start: 7, end: 12, text: "Здесь задачи, команды, клиенты и знания собираются в одном месте." },
  { start: 12, end: 18, text: "А искусственный интеллект помогает: берет на себя рутину, напоминания." },
  { start: 18, end: 24, text: "Мы делали Proji так, как мечтали бы сами работать. Просто, понятно и без лишней бюрократии." },
  { start: 24, end: 31, text: "Это Серик. Буду рад, если Proji станет вашим надежным помощником. Как стал и моим." }
];

export const HeroPhone: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioError, setAudioError] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  // Локальный файл-приветствие Серика
  const [audioSrc, setAudioSrc] = useState<string>(welcomeSerik);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        trackEvent('audio_pause', { source: 'hero_greeting', currentTime });
      } else {
        setIsLoading(true);
        setAudioError(false);
        if (audioRef.current.ended) {
          audioRef.current.currentTime = 0;
        }
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Audio playback failed:", error);
            setAudioError(true);
            setIsLoading(false);
            setIsPlaying(false);
            trackEvent('audio_play_error', { source: 'hero_greeting', message: String(error) });
          });
        } else {
          trackEvent('audio_play', { source: 'hero_greeting' });
        }
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setCurrentTime(current);
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioSrc(url);
      setAudioError(false);
      // Small timeout to allow element to update src
      setTimeout(() => {
        if (audioRef.current) {
           audioRef.current.load();
           togglePlay();
        }
      }, 100);
      trackEvent('audio_file_uploaded', { source: 'hero_greeting', fileName: file.name, fileSize: file.size });
    }
  };

  return (
    <div className="hph" data-ui>
      <audio 
        ref={audioRef} 
        src={audioSrc} 
        preload="metadata"
        playsInline
        onPlay={() => { setIsPlaying(true); setIsLoading(false); }}
        onPause={() => setIsPlaying(false)}
        onEnded={() => { setIsPlaying(false); setProgress(100); setTimeout(() => setProgress(0), 1000); }}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onTimeUpdate={handleTimeUpdate}
        onError={(e) => {
          console.error("Audio error event:", e);
          setAudioError(true);
          setIsLoading(false);
          setIsPlaying(false);
        }}
      />
    {/* Right Column: Premium Phone Mockup */}
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="relative h-[650px] lg:h-[800px] flex items-center justify-center xl:justify-end perspective-1000 mt-12 xl:mt-0"
    >
      {/* --- Floating Elements --- */}
      
      {/* Top Left: Task Solved */}
      <motion.div 
        animate={{ y: [-15, 10, -15], x: [0, 5, 0] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 lg:top-24 left-0 xl:-left-12 z-30 bg-white/90 dark:bg-[#1e293b]/90 border border-slate-200 dark:border-white/10 p-4 rounded-2xl max-w-[160px] lg:max-w-[200px]"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
            <Zap className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-[13px] font-semibold text-slate-900 dark:text-white">Задача решена</div>
        </div>
        <p className="text-[13px] text-slate-500 dark:text-gray-400">Отчет сгенерирован автоматически за 0.4 сек</p>
      </motion.div>

      {/* Audio Message Floating Card (desktop only) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, x: -50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="hidden xl:block absolute top-[12%] lg:top-[18%] left-1/2 -translate-x-1/2 xl:left-auto xl:translate-x-0 xl:right-[340px] z-40 w-full max-w-[340px] sm:max-w-[400px]"
      >
         {/* Decorative arrow/triangle pointing to phone - Visible only on desktop side-by-side */}
         <div className="absolute top-1/2 -right-5 transform -translate-y-1/2 w-0 h-0 border-t-[16px] border-t-transparent border-l-[20px] border-l-white/60 dark:border-l-white/5 border-b-[16px] border-b-transparent hidden xl:block"></div>

         <div className="glass-card p-2 rounded-[2rem] bg-white/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 transition-all duration-300">
          <div className="bg-white/50 dark:bg-[#1e293b]/50 p-5 rounded-[1.5rem] w-full">
            
            {/* Top Section with Player */}
            <div className="flex items-center gap-4">
              {/* Player Button with Progress Ring */}
              <div className="relative w-14 h-14 shrink-0">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200 dark:text-white/10"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="text-brand-600 dark:text-brand-500 transition-all duration-300 ease-out"
                    strokeDasharray={`${progress}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </svg>
                <button 
                  onClick={togglePlay}
                  disabled={isLoading && !audioError}
                  className="absolute inset-1.5 rounded-full bg-brand-600 dark:bg-white text-white dark:text-brand-900 flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-70 disabled:scale-100"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white dark:border-brand-900/30 dark:border-t-brand-900 rounded-full animate-spin"></div>
                  ) : isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-0.5" />
                  )}
                </button>
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex justify-between items-start">
                   <div className="truncate">
                     <p className="text-base lg:text-lg font-bold text-slate-900 dark:text-white leading-tight truncate">Приветствие</p>
                     <p className="text-[13px] lg:text-xs text-slate-500 dark:text-brand-300 truncate">Серик, Основатель Proji</p>
                   </div>
                   <div className="flex items-center gap-1.5 shrink-0">
                     <button 
                        onClick={() => setShowTranscript(!showTranscript)}
                        className={`p-1.5 rounded-full transition-colors ${showTranscript ? 'bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400' : 'text-slate-400 hover:text-brand-500 dark:text-slate-500 dark:hover:text-brand-300'}`}
                        title="Показать текст"
                     >
                       <FileText className="w-4 h-4" />
                     </button>
                     {audioError && <AlertCircle className="w-4 h-4 text-red-500" title="Ошибка" />}
                   </div>
                </div>
                {/* Visualizer */}
                <div className="flex items-center gap-1 h-5 pt-1">
                  {[0.4, 0.7, 1, 0.6, 0.8, 0.5, 0.9, 0.4, 0.7, 0.5, 0.8, 0.6, 0.4, 0.8, 0.5].map((scale, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-brand-500/80 rounded-full"
                      initial={{ height: 4 }}
                      animate={{ 
                        height: isPlaying 
                          ? [4, 12 * scale, 4] 
                          : isLoading ? [4, 8, 4] : 4,
                        opacity: isPlaying ? 1 : 0.5
                      }}
                      transition={{ 
                        duration: 0.5, 
                        repeat: Infinity, 
                        delay: i * 0.05,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Transcript Section */}
            <AnimatePresence>
              {showTranscript && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="overflow-hidden border-t border-slate-200 dark:border-white/10"
                >
                  <div className="pt-3 pr-1 max-h-48 overflow-y-auto scrollbar-hide space-y-2">
                     {transcriptData.map((line, i) => {
                       const isActive = currentTime >= line.start && currentTime < line.end;
                       return (
                         <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`text-[13px] leading-relaxed transition-colors duration-300 p-2 rounded-lg ${isActive ? 'bg-brand-50 dark:bg-brand-900/20 text-slate-900 dark:text-white font-medium' : 'text-slate-500 dark:text-gray-400'}`}
                          >
                           {line.text}
                         </motion.div>
                       );
                     })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {audioError && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mt-3"
                >
                  <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg p-3">
                    <p className="text-[13px] text-red-500 font-medium mb-2">
                      Ошибка воспроизведения. Загрузите файл вручную:
                    </p>
                    <label className="flex items-center justify-center gap-2 w-full py-2 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-white/20 transition-colors">
                       <input type="file" className="hidden" accept="audio/*" onChange={handleFileUpload} />
                       <Upload className="w-3 h-3 text-slate-700 dark:text-white" />
                       <span className="text-[13px] font-medium text-slate-700 dark:text-white">Выбрать файл</span>
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Middle Right: Leads Graph */}
      <motion.div 
        animate={{ y: [10, -10, 10], x: [0, -5, 0] }} 
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/2 right-0 lg:right-10 xl:-right-24 z-30 bg-white/90 dark:bg-[#1e293b]/90 border border-slate-200 dark:border-white/10 p-4 rounded-2xl max-w-[200px] lg:max-w-[220px]"
      >
        <div className="flex items-center gap-3 mb-2">
           <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
              <BarChart className="w-4 h-4 text-purple-600 dark:text-purple-400" />
           </div>
           <div>
              <div className="text-[13px] font-semibold text-slate-900 dark:text-white">+14 Лидов</div>
              <div className="text-[13px] text-green-500 font-medium">+24% за сегодня</div>
           </div>
        </div>
        <div className="w-full bg-slate-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden mt-1">
          <div className="bg-gradient-to-r from-purple-500 to-brand-500 w-[70%] h-full"></div>
        </div>
      </motion.div>

      {/* Bottom Left: Meeting Scheduled */}
      <motion.div 
        animate={{ y: [-20, 0, -20] }} 
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-32 left-0 lg:left-4 xl:-left-16 z-40 bg-white/90 dark:bg-[#1e293b]/90 border border-slate-200 dark:border-white/10 p-3 rounded-2xl flex items-center gap-3"
      >
         <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-brand-600 dark:text-brand-400" />
         </div>
         <div>
            <div className="text-[13px] font-bold text-slate-900 dark:text-white">Встреча назначена</div>
            <div className="text-[13px] text-slate-500 dark:text-gray-400">Завтра, 14:00 • Zoom</div>
         </div>
      </motion.div>

      {/* Top Right: Active Agents */}
      <motion.div 
         animate={{ y: [0, -15, 0] }}
         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
         className="absolute top-10 right-0 lg:-right-4 z-20 bg-white/80 dark:bg-[#1e293b]/80 border border-slate-200 dark:border-white/10 py-2 px-4 rounded-full flex items-center gap-2"
      >
         <div className="flex -space-x-2">
            {[1,2,3].map(i => (
               <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-[#1e293b] bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[8px] font-bold">
                  AI
               </div>
            ))}
         </div>
         <span className="text-[13px] font-semibold text-slate-700 dark:text-gray-300">4 Агента онлайн</span>
         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </motion.div>

      {/* Bottom Right: New Message */}
      <motion.div 
         animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
         transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
         className="absolute bottom-60 right-0 xl:-right-16 lg:-right-8 z-30 bg-brand-600 text-white p-3 rounded-t-2xl rounded-bl-2xl max-w-[180px]"
      >
         <div className="flex items-center gap-2 mb-1">
            <MessageCircle className="w-3 h-3" />
            <span className="text-[13px] font-medium opacity-90">Клиент</span>
         </div>
         <p className="text-[13px] font-medium leading-tight">"Счет оплатил, жду доступы!"</p>
      </motion.div>


      {/* The Phone */}
      <motion.div 
         animate={{ y: [-15, 15, -15] }}
         transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
         className="relative w-[300px] sm:w-[320px] h-[600px] sm:h-[650px] bg-black rounded-[3rem] border-[8px] border-slate-800 dark:border-[#1a1a1a] shadow-[0_0_50px_rgba(0,0,0,0.2),0_0_100px_rgba(14,165,233,0.1)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5),0_0_100px_rgba(14,165,233,0.2)] overflow-hidden z-20 ring-1 ring-black/20 dark:ring-white/10"
      >
        {/* Glossy Reflection */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none z-40"></div>
        
        {/* Dynamic Island */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-b-[18px] z-50 flex items-center justify-center">
           <div className="w-16 h-16 bg-black rounded-full absolute -top-8 blur-md"></div>
        </div>
        
        {/* Screen Content */}
        <div className="w-full h-full bg-[#0B1120] flex flex-col relative overflow-hidden">
           {/* App Header */}
           <div className="p-6 pt-12 flex justify-between items-center bg-gradient-to-b from-[#0B1120] to-[#0B1120]/0 z-10">
              <span className="font-bold text-xl text-white">Proji</span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-400 to-purple-500 border border-white/20"></div>
           </div>
           
           {/* Dashboard Mockup */}
           <div className="px-5 space-y-5 overflow-y-auto scrollbar-hide pb-20">
              {/* Main Stats Card */}
              <div className="bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 p-5 rounded-[2rem] text-white relative overflow-hidden group">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                 <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/20 blur-3xl rounded-full"></div>
                 
                 <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                         <div className="text-[13px] text-brand-100 mb-1 font-medium">Эффективность ИИ</div>
                         <div className="text-4xl font-bold tracking-tight">89%</div>
                      </div>
                      <div className="bg-white/20 p-2 rounded-xl">
                         <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                       <div className="flex justify-between text-[13px] text-brand-100">
                          <span>Загрузка</span>
                          <span>Оптимально</span>
                       </div>
                       <div className="h-1.5 bg-black/20 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "89%" }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="h-full bg-white shadow-[0_0_10px_white]"
                          ></motion.div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Task List */}
              <div className="space-y-3">
                 <div className="flex justify-between items-end px-1">
                    <div className="text-sm text-gray-400 font-medium">Активные задачи</div>
                    <div className="text-[13px] text-brand-500 font-semibold">Все (12)</div>
                 </div>
                 
                 {[
                   { title: "Анализ конкурентов", time: "2 мин", status: "done" },
                   { title: "Генерация контента", time: "В процессе", status: "process" },
                   { title: "Квалификация лида", time: "Очередь", status: "wait" },
                   { title: "Обновление базы", time: "Ожидание", status: "wait" }
                 ].map((task, i) => (
                   <motion.div 
                      key={i}
                      initial={reduceMotion ? false : { x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1 + i * 0.2 }}
                      className="bg-[#1e293b]/50 p-4 rounded-2xl border border-white/5 flex items-center gap-4 hover:bg-[#1e293b] transition-colors"
                   >
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                       task.status === 'done' ? 'bg-green-500/20 text-green-400' :
                       task.status === 'process' ? 'bg-brand-500/20 text-brand-400' :
                       'bg-gray-700/50 text-gray-400'
                     }`}>
                        {task.status === 'done' ? <CheckCircle2 className="w-5 h-5" /> : 
                         <div className={`w-3 h-3 rounded-full ${task.status === 'process' ? 'bg-current animate-pulse' : 'border-2 border-current'}`} />}
                     </div>
                     <div className="flex-1 min-w-0">
                       <div className="text-sm font-medium text-white truncate">{task.title}</div>
                       <div className="text-[13px] text-gray-500 mt-0.5">AI Agent • {task.time}</div>
                     </div>
                   </motion.div>
                 ))}
              </div>

              {/* Bottom Nav */}
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#0B1120] via-[#0B1120] to-transparent pointer-events-none"></div>
           </div>
        </div>
      </motion.div>
    </motion.div>
    </div>
  );
};
