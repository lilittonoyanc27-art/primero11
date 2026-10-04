import React, { useState } from 'react';
import {
  LANGUAGE_FUNCTIONS,
  EXAM_FORMULAS,
  EXAM_QUESTIONS_28,
  TEXT_STUDY_UNITS,
  SCRAMBLE_EXERCISES,
} from './data';
import {
  LanguageFunctionId,
  LanguageFunctionInfo,
  ExamQuestion,
  TextStudyUnit,
  ScrambleExerciseItem,
} from './types';
import {
  BookOpen,
  HelpCircle,
  FileText,
  Puzzle,
  Volume2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info,
  Megaphone,
  PhoneCall,
  HeartHandshake,
  Languages,
  Eye,
  EyeOff,
  RotateCcw,
  GraduationCap,
  ArrowRight,
  Filter,
  Search,
  Type,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'teoria' | 'preguntas28' | 'textos' | 'scramble' | 'formulas'
  >('preguntas28');

  // Font size scale state: 'md' (Normal), 'lg' (Large - Default), 'xl' (Extra Large), '2xl' (Huge)
  const [fontScale, setFontScale] = useState<'md' | 'lg' | 'xl' | '2xl'>('lg');

  // Tab 1 (28 Preguntas) state
  const [qFilter, setQFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [revealedArmenianQuestions, setRevealedArmenianQuestions] = useState<Record<number, boolean>>({});
  const [revealedAnswersQuestions, setRevealedAnswersQuestions] = useState<Record<number, boolean>>({});
  const [revealedArmenianQuestionAnswers, setRevealedArmenianQuestionAnswers] = useState<Record<number, boolean>>({});

  // Tab 2 (Teoría) state
  const [revealedArmenianTheoryName, setRevealedArmenianTheoryName] = useState<Record<string, boolean>>({});
  const [revealedArmenianTheoryPurpose, setRevealedArmenianTheoryPurpose] = useState<Record<string, boolean>>({});
  const [revealedArmenianTheoryFormula, setRevealedArmenianTheoryFormula] = useState<Record<string, boolean>>({});
  const [revealedArmenianTheoryElement, setRevealedArmenianTheoryElement] = useState<Record<string, boolean>>({});
  const [revealedArmenianTheoryShortcut, setRevealedArmenianTheoryShortcut] = useState<Record<string, boolean>>({});

  // Tab 3 (Textos) state
  const [selectedTextId, setSelectedTextId] = useState<string>(TEXT_STUDY_UNITS[0].id);
  const [revealedArmenianDialogue, setRevealedArmenianDialogue] = useState<Record<string, boolean>>({});
  const [revealedArmenianTextQuestions, setRevealedArmenianTextQuestions] = useState<Record<string, boolean>>({});
  const [revealedTextAnswers, setRevealedTextAnswers] = useState<Record<string, boolean>>({});
  const [revealedArmenianTextAnswers, setRevealedArmenianTextAnswers] = useState<Record<string, boolean>>({});
  const [testUserAnswers, setTestUserAnswers] = useState<Record<number, string>>({});

  // Tab 4 (Scramble) state
  const [activeScrambleSeries, setActiveScrambleSeries] = useState<
    'ejercicio_1' | 'ejercicio_2' | 'ejercicio_3' | 'ejercicio_4'
  >('ejercicio_1');
  const [userArrangements, setUserArrangements] = useState<Record<number, string[]>>({});
  const [revealedScrambleArm, setRevealedScrambleArm] = useState<Record<number, boolean>>({});
  const [revealedScrambleAns, setRevealedScrambleAns] = useState<Record<number, boolean>>({});
  const [revealedScrambleAnswerArm, setRevealedScrambleAnswerArm] = useState<Record<number, boolean>>({});

  // Tab 5 (Formulas) state
  const [revealedArmenianFormulas, setRevealedArmenianFormulas] = useState<Record<number, boolean>>({});

  // Dynamic typography helper based on fontScale
  const getScaleClasses = () => {
    switch (fontScale) {
      case '2xl':
        return {
          spanishQuestion: 'text-2xl sm:text-3xl font-bold leading-relaxed',
          armenianQuestion: 'text-lg sm:text-xl font-medium leading-relaxed',
          answerEs: 'text-xl sm:text-2xl font-bold leading-relaxed',
          answerArm: 'text-base sm:text-lg font-semibold leading-relaxed',
          dialogueEs: 'text-xl sm:text-2xl font-semibold leading-relaxed',
          dialogueArm: 'text-lg sm:text-xl font-medium leading-relaxed',
          chipWord: 'text-lg font-bold px-4 py-2.5',
          answerBtn: 'text-base sm:text-lg py-3 px-5',
          cardSub: 'text-base sm:text-lg',
          tabText: 'text-base font-semibold',
        };
      case 'xl':
        return {
          spanishQuestion: 'text-xl sm:text-2xl font-bold leading-relaxed',
          armenianQuestion: 'text-base sm:text-lg font-medium leading-relaxed',
          answerEs: 'text-lg sm:text-xl font-bold leading-relaxed',
          answerArm: 'text-base font-semibold leading-relaxed',
          dialogueEs: 'text-lg sm:text-xl font-semibold leading-relaxed',
          dialogueArm: 'text-base sm:text-lg font-medium leading-relaxed',
          chipWord: 'text-base font-bold px-3.5 py-2',
          answerBtn: 'text-base py-2.5 px-4',
          cardSub: 'text-sm sm:text-base',
          tabText: 'text-sm sm:text-base font-semibold',
        };
      case 'md':
        return {
          spanishQuestion: 'text-lg sm:text-xl font-bold leading-snug',
          armenianQuestion: 'text-sm sm:text-base font-medium leading-snug',
          answerEs: 'text-base font-bold leading-snug',
          answerArm: 'text-sm font-semibold leading-snug',
          dialogueEs: 'text-base font-semibold leading-snug',
          dialogueArm: 'text-sm font-medium leading-snug',
          chipWord: 'text-sm font-bold px-3 py-1.5',
          answerBtn: 'text-sm py-2 px-3.5',
          cardSub: 'text-xs sm:text-sm',
          tabText: 'text-sm font-medium',
        };
      case 'lg':
      default:
        return {
          spanishQuestion: 'text-xl sm:text-2xl font-bold leading-relaxed',
          armenianQuestion: 'text-base sm:text-lg font-medium leading-relaxed',
          answerEs: 'text-lg font-bold leading-relaxed',
          answerArm: 'text-base font-semibold leading-relaxed',
          dialogueEs: 'text-lg font-semibold leading-relaxed',
          dialogueArm: 'text-base font-medium leading-relaxed',
          chipWord: 'text-base font-bold px-4 py-2',
          answerBtn: 'text-base py-2.5 px-4',
          cardSub: 'text-sm sm:text-base',
          tabText: 'text-sm sm:text-base font-semibold',
        };
    }
  };

  const scale = getScaleClasses();

  // Audio speech synthesis helper
  const speakSpanish = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[“”—¡!¿?«»]/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'es-ES';
      utterance.rate = 0.88;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Toggle armenian translation for question
  const toggleQuestionArmenian = (id: number) => {
    setRevealedArmenianQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Toggle answer for question
  const toggleQuestionAnswer = (id: number) => {
    setRevealedAnswersQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Toggle armenian explanation for question answer
  const toggleQuestionAnswerArmenian = (id: number) => {
    setRevealedArmenianQuestionAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Toggle all armenian in questions
  const toggleAllArmenianQuestions = (forceShow: boolean) => {
    const updated: Record<number, boolean> = {};
    const updatedAnswers: Record<number, boolean> = {};
    EXAM_QUESTIONS_28.forEach((q) => {
      updated[q.id] = forceShow;
      updatedAnswers[q.id] = forceShow;
    });
    setRevealedArmenianQuestions(updated);
    setRevealedArmenianQuestionAnswers(updatedAnswers);
  };

  // Helper function icon
  const getFunctionIcon = (id?: LanguageFunctionId) => {
    switch (id) {
      case 'referencial':
        return <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'expresiva':
        return <HeartHandshake className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'apelativa':
        return <Megaphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'fatica':
        return <PhoneCall className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case 'metalinguistica':
        return <BookOpen className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      case 'poetica':
        return <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      default:
        return <HelpCircle className="w-5 h-5 text-slate-500" />;
    }
  };

  const getFunctionBadgeClass = (id?: LanguageFunctionId) => {
    switch (id) {
      case 'referencial':
        return 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800';
      case 'expresiva':
        return 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800';
      case 'apelativa':
        return 'bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800';
      case 'fatica':
        return 'bg-purple-50 text-purple-700 border-purple-300 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800';
      case 'metalinguistica':
        return 'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800';
      case 'poetica':
        return 'bg-indigo-50 text-indigo-700 border-indigo-300 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
    }
  };

  // Filtered 28 questions
  const filteredQuestions = EXAM_QUESTIONS_28.filter((q) => {
    const matchesFilter =
      qFilter === 'all'
        ? true
        : qFilter === 'teorica'
        ? q.isTheoretical
        : q.functionId === qFilter;

    const matchesSearch =
      searchQuery === ''
        ? true
        : q.spanish.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.armenian.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answerEs.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answerArm.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Current selected text
  const currentText =
    TEXT_STUDY_UNITS.find((t) => t.id === selectedTextId) || TEXT_STUDY_UNITS[0];

  // Scramble word bank handlers
  const handleAddWordToSentence = (exerciseId: number, word: string) => {
    const current = userArrangements[exerciseId] || [];
    setUserArrangements((prev) => ({
      ...prev,
      [exerciseId]: [...current, word],
    }));
  };

  const handleRemoveWordFromSentence = (exerciseId: number, removeIdx: number) => {
    const current = userArrangements[exerciseId] || [];
    setUserArrangements((prev) => ({
      ...prev,
      [exerciseId]: current.filter((_, idx) => idx !== removeIdx),
    }));
  };

  const handleResetArrangement = (exerciseId: number) => {
    setUserArrangements((prev) => ({
      ...prev,
      [exerciseId]: [],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-sky-50/20 to-slate-100 text-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100 flex flex-col font-['Outfit','Noto_Sans_Armenian',sans-serif]">
      {/* Header Banner */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-md font-bold text-xl">
              7º
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                  FUNCIONES DEL LENGUAJE
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-bold border border-amber-300 dark:border-amber-800">
                  7º Grado España
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
                ԼԵԶՎԻ ԳՈՐԾԱՌՈՒՅԹՆԵՐԸ • Իսպաներեն ↔ Հայերեն քննական ձեռնարկ
              </p>
            </div>
          </div>

          {/* Font Size Selector & Active Reminder */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Font Size Switcher */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
              <span className="text-xs font-bold text-slate-500 px-2 flex items-center gap-1">
                <Type className="w-3.5 h-3.5" /> Տառաչափ:
              </span>
              <button
                onClick={() => setFontScale('md')}
                title="Նորմալ տառաչափ (Normal)"
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  fontScale === 'md'
                    ? 'bg-white dark:bg-slate-700 text-amber-600 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                A-
              </button>
              <button
                onClick={() => setFontScale('lg')}
                title="Մեծ տառաչափ (Grande - Default)"
                className={`px-2.5 py-1 rounded-lg text-sm font-bold transition-all ${
                  fontScale === 'lg'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontScale('xl')}
                title="Շատ մեծ տառաչափ (Muy grande)"
                className={`px-2.5 py-1 rounded-lg text-base font-black transition-all ${
                  fontScale === 'xl'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                A+
              </button>
              <button
                onClick={() => setFontScale('2xl')}
                title="Հսկայական տառաչափ (Extra grande)"
                className={`px-2.5 py-1 rounded-lg text-lg font-black transition-all ${
                  fontScale === '2xl'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                A++
              </button>
            </div>

            {/* Prompt Mode Indicator */}
            <div className="flex items-center gap-2 text-xs bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 px-3 py-1.5 rounded-xl font-bold shadow-2xs">
              <Languages className="w-4 h-4 text-amber-600" />
              <span>Սկզբից միայն իսպաներենն է: Սեղմի՛ր իսպաներենի վրա՝ հայերենը բացելու համար</span>
            </div>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <div className="max-w-6xl mx-auto px-4 flex gap-1.5 overflow-x-auto no-scrollbar border-t border-slate-100 dark:border-slate-800 pt-1.5 pb-1.5">
          <button
            onClick={() => setActiveTab('preguntas28')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${scale.tabText} ${
              activeTab === 'preguntas28'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-5 h-5" />
            <span>28 Քննության Հարցեր</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                activeTab === 'preguntas28'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              28
            </span>
          </button>

          <button
            onClick={() => setActiveTab('teoria')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${scale.tabText} ${
              activeTab === 'teoria'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>6 Գործառույթներ & Տեսություն</span>
          </button>

          <button
            onClick={() => setActiveTab('textos')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${scale.tabText} ${
              activeTab === 'textos'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>Քննական Տեքստեր (7)</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                activeTab === 'textos'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              7
            </span>
          </button>

          <button
            onClick={() => setActiveTab('scramble')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${scale.tabText} ${
              activeTab === 'scramble'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Puzzle className="w-5 h-5" />
            <span>Կազմի՛ր Նախադասությունը</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                activeTab === 'scramble'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              4 փուլ
            </span>
          </button>

          <button
            onClick={() => setActiveTab('formulas')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${scale.tabText} ${
              activeTab === 'formulas'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            <span>Քննության Բանաձևեր</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8 flex-1 w-full space-y-6">
        {/* ============================================================== */}
        {/* TAB 1: 28 EXAM QUESTIONS (PREGUNTAS PRÁCTICAS DE EXAMEN)      */}
        {/* ============================================================== */}
        {activeTab === 'preguntas28' && (
          <div className="space-y-6">
            {/* Guide Callout */}
            <div className="bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-indigo-500/10 border-2 border-amber-200 dark:border-amber-800/60 rounded-3xl p-5 sm:p-7 shadow-xs">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5 flex-wrap">
                    <span>Preguntas prácticas de examen</span>
                    <span className="text-slate-400 font-normal">—</span>
                    <span className="text-amber-800 dark:text-amber-300">Քննության գործնական հարցեր</span>
                    <span className="text-xs sm:text-sm bg-amber-500 text-white font-extrabold px-3 py-0.5 rounded-full shadow-2xs">
                      1–28
                    </span>
                  </h2>
                  <p className={`text-slate-700 dark:text-slate-200 mt-2 font-medium ${scale.cardSub}`}>
                    👉 Սկզբում տեսնում եք <strong>միայն իսպաներենը</strong>։
                    Սեղմի՛ր <strong>իսպաներենի վրա</strong>՝ հայերեն թարգմանությունը բացելու համար։
                    Առանձին սեղմի՛ր <strong>«Պատասխան»</strong> կոճակը՝ ճիշտ քննական պատասխանը ստուգելու համար։
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleAllArmenianQuestions(true)}
                    className="text-sm font-semibold bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-2xs"
                  >
                    <Eye className="w-4 h-4 text-sky-600" />
                    Բացել բոլոր թարգմանությունները
                  </button>
                  <button
                    onClick={() => toggleAllArmenianQuestions(false)}
                    className="text-sm font-semibold bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs"
                  >
                    <EyeOff className="w-4 h-4 text-slate-500" />
                    Թաքցնել
                  </button>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="mt-5 pt-5 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1 mr-1">
                    <Filter className="w-4 h-4" /> Ֆիլտրել՝
                  </span>
                  {[
                    { id: 'all', label: 'Բոլորը (28)' },
                    { id: 'referencial', label: 'Referencial' },
                    { id: 'expresiva', label: 'Expresiva' },
                    { id: 'apelativa', label: 'Apelativa' },
                    { id: 'fatica', label: 'Fática' },
                    { id: 'metalinguistica', label: 'Metalingüística' },
                    { id: 'poetica', label: 'Poética' },
                    { id: 'teorica', label: 'Տեսական (24-28)' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setQFilter(f.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                        qFilter === f.id
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <div className="relative min-w-[240px] flex-1 sm:flex-initial">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Որոնել հարցերում կամ պատասխաններում..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>
            </div>

            {/* Questions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredQuestions.map((q) => {
                const isArmenianShown = !!revealedArmenianQuestions[q.id];
                const isAnswerShown = !!revealedAnswersQuestions[q.id];
                const isAnswerArmenianShown = !!revealedArmenianQuestionAnswers[q.id];

                return (
                  <div
                    key={q.id}
                    className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-amber-300 dark:hover:border-amber-700 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Top Bar of card */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 font-extrabold text-sm flex items-center justify-center text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                            #{q.id}
                          </span>
                          {q.functionId && (
                            <span
                              className={`text-xs sm:text-sm px-3 py-1 rounded-full border font-bold flex items-center gap-1.5 shadow-2xs ${getFunctionBadgeClass(
                                q.functionId
                              )}`}
                            >
                              {getFunctionIcon(q.functionId)}
                              <span className="capitalize">{q.functionId}</span>
                            </span>
                          )}
                          {q.isTheoretical && (
                            <span className="text-xs sm:text-sm px-3 py-1 rounded-full bg-sky-100 text-sky-900 dark:bg-sky-900/50 dark:text-sky-200 font-bold border border-sky-300 dark:border-sky-800">
                              Տեսական / Teórica
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => speakSpanish(q.spanish)}
                          title="Լսել իսպաներեն արտասանությունը"
                          className="p-2 rounded-xl text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Spanish clickable text: ONLY Spanish by default! */}
                      <div
                        onClick={() => toggleQuestionArmenian(q.id)}
                        className="cursor-pointer group relative p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50/80 dark:hover:bg-amber-950/30 border border-slate-200 dark:border-slate-700/80 transition-all shadow-2xs"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className={`text-slate-900 dark:text-slate-50 group-hover:text-amber-950 dark:group-hover:text-amber-200 transition-colors ${scale.spanishQuestion}`}>
                            {q.spanish}
                          </p>
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-lg whitespace-nowrap self-start mt-1 border transition-colors ${
                              isArmenianShown
                                ? 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-900/60 dark:text-sky-200'
                                : 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/60 dark:text-amber-300'
                            }`}
                          >
                            {isArmenianShown ? '🇦🇲 Թարգմանված է' : '🇦🇲 Կտտացրու'}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1.5 font-medium">
                          <span>
                            {isArmenianShown
                              ? '👆 Սեղմի՛ր նորից՝ հայերենը թաքցնելու համար'
                              : '👆 Սեղմի՛ր նախադասության վրա՝ հայերեն թարգմանությունը տեսնելու համար'}
                          </span>
                        </p>
                      </div>

                      {/* Armenian translation: ONLY shown on click */}
                      {isArmenianShown && (
                        <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 animate-in fade-in duration-200">
                          <div className="flex items-start gap-2.5">
                            <span className="text-base sm:text-lg">🇦🇲</span>
                            <div>
                              <span className="text-xs font-bold text-sky-700 dark:text-sky-300 block mb-0.5">
                                Հայերեն թարգմանություն:
                              </span>
                              <p className={`text-sky-950 dark:text-sky-100 font-semibold ${scale.armenianQuestion}`}>
                                {q.armenian}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Note / Trick warning if present */}
                      {q.note && (
                        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border-2 border-amber-300 dark:border-amber-800 text-sm text-amber-950 dark:text-amber-200 space-y-1">
                          <p className="font-extrabold">{q.note.es}</p>
                          {isArmenianShown && (
                            <p className="text-amber-900 dark:text-amber-300 font-medium pt-1 border-t border-amber-200 dark:border-amber-800">
                              {q.note.arm}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Answer Section with Distinct "Պատասխան" Button */}
                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between gap-3">
                        <button
                          onClick={() => toggleQuestionAnswer(q.id)}
                          className={`flex items-center gap-2 rounded-2xl font-bold transition-all shadow-sm ${scale.answerBtn} ${
                            isAnswerShown
                              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                              : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100'
                          }`}
                        >
                          <CheckCircle2 className="w-5 h-5" />
                          <span>{isAnswerShown ? 'Պատասխանը բացված է (Այո)' : '💡 Պատասխան / Respuesta'}</span>
                          {isAnswerShown ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>

                        <button
                          onClick={() => toggleQuestionArmenian(q.id)}
                          className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 font-bold"
                        >
                          {isArmenianShown ? 'Թաքցնել հայերենը' : '🇦🇲 Թարգմանել'}
                        </button>
                      </div>

                      {/* Revealed Answer Box: Official Spanish first! Click Spanish or button to reveal Armenian */}
                      {isAnswerShown && (
                        <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-800 space-y-3 animate-in fade-in duration-200">
                          {/* Spanish Answer (clickable to reveal armenian explanation) */}
                          <div
                            onClick={() => toggleQuestionAnswerArmenian(q.id)}
                            className="cursor-pointer group p-3 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-emerald-200 dark:border-emerald-700 hover:border-emerald-400 transition-all"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                                🇪🇸 Respuesta oficial de examen:
                              </span>
                              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded-md">
                                {isAnswerArmenianShown ? '🇦🇲 Բացված է' : '🇦🇲 Կտտացրու հայերենի համար'}
                              </span>
                            </div>
                            <p className={`text-emerald-950 dark:text-emerald-100 group-hover:text-emerald-900 transition-colors ${scale.answerEs}`}>
                              {q.answerEs}
                            </p>
                          </div>

                          {/* Armenian Answer Explanation: ONLY shown on click! */}
                          {isAnswerArmenianShown ? (
                            <div className="p-3 rounded-xl bg-emerald-100/70 dark:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-700">
                              <span className="text-xs font-black uppercase tracking-wider text-emerald-900 dark:text-emerald-300 block mb-1">
                                🇦🇲 Հայերեն պարզաբանում:
                              </span>
                              <p className={`text-emerald-950 dark:text-emerald-100 ${scale.answerArm}`}>
                                {q.answerArm}
                              </p>
                            </div>
                          ) : (
                            <button
                              onClick={() => toggleQuestionAnswerArmenian(q.id)}
                              className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-900 dark:text-emerald-300 dark:hover:text-emerald-100 flex items-center gap-1.5"
                            >
                              <span>👉 Սեղմի՛ր այստեղ՝ հայերեն բացատրությունը տեսնելու համար</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: THEORY & THE 6 FUNCTIONS (TEORÍA Y 6 FUNCIONES)        */}
        {/* ============================================================== */}
        {activeTab === 'teoria' && (
          <div className="space-y-8">
            {/* Title / Intro */}
            <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
              <div className="max-w-4xl">
                <span className="text-xs sm:text-sm uppercase font-extrabold tracking-widest text-amber-600 dark:text-amber-400">
                  Fundamentos de Lengua Castellana — 7º Grado (1º / 2º ESO)
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  FUNCIONES DEL LENGUAJE — ԼԵԶՎԻ ԳՈՐԾԱՌՈՒՅԹՆԵՐԸ
                </h2>
                <p className={`text-slate-700 dark:text-slate-300 mt-3 leading-relaxed font-medium ${scale.cardSub}`}>
                  Սկզբում աշակերտը պետք է շատ լավ տարբերակի լեզվի 6 գործառույթները։
                  Սեղմի՛ր <strong>ցանկացած իսպաներեն բլոկի վրա</strong>՝ տեսնելու նրա հայերեն բացատրությունը։
                </p>
              </div>

              {/* Forma Fácil de Recordar Grid: Click to reveal Armenian! */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <span>Հեշտ հիշելու ձև — Forma fácil de recordar:</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    (Կտտացրու քարտին՝ հայերենը տեսնելու համար)
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {LANGUAGE_FUNCTIONS.map((f) => {
                    const isShortcutRevealed = !!revealedArmenianTheoryShortcut[f.id];

                    return (
                      <div
                        key={f.id}
                        onClick={() =>
                          setRevealedArmenianTheoryShortcut((prev) => ({
                            ...prev,
                            [f.id]: !prev[f.id],
                          }))
                        }
                        className="cursor-pointer p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center hover:scale-[1.02] hover:border-amber-400 transition-all shadow-2xs"
                      >
                        <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center shadow-xs">
                          {getFunctionIcon(f.id)}
                        </div>
                        <p className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                          {f.shortcutEs.split('→')[0].trim()}
                        </p>
                        <span className="text-xs sm:text-sm text-amber-600 dark:text-amber-400 font-black block mt-0.5">
                          → {f.id}
                        </span>

                        {/* Armenian Shortcut: only visible on click! */}
                        {isShortcutRevealed ? (
                          <p className="text-xs font-bold text-sky-800 dark:text-sky-300 mt-2 pt-1 border-t border-slate-200 dark:border-slate-700 animate-in fade-in">
                            🇦🇲 {f.shortcutArm}
                          </p>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-medium block mt-1.5">
                            🇦🇲 Կտտացրու
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* The 6 Main Cards: Spanish only by default! */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LANGUAGE_FUNCTIONS.map((fn) => {
                const isNameArm = !!revealedArmenianTheoryName[fn.id];
                const isPurposeArm = !!revealedArmenianTheoryPurpose[fn.id];
                const isElementArm = !!revealedArmenianTheoryElement[fn.id];
                const isFormulaArm = !!revealedArmenianTheoryFormula[fn.id];

                return (
                  <div
                    key={fn.id}
                    className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-amber-300 dark:hover:border-amber-700 transition-all"
                  >
                    <div className="space-y-4">
                      {/* Name Header: Clickable to reveal Armenian */}
                      <div
                        onClick={() =>
                          setRevealedArmenianTheoryName((prev) => ({
                            ...prev,
                            [fn.id]: !prev[fn.id],
                          }))
                        }
                        className="cursor-pointer group flex items-center justify-between gap-2 p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center border border-amber-200 dark:border-amber-800 shadow-2xs">
                            {getFunctionIcon(fn.id)}
                          </div>
                          <div>
                            <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-amber-600 transition-colors">
                              {fn.nameEs}
                            </h4>
                            {isNameArm ? (
                              <span className="text-sm text-sky-700 dark:text-sky-300 font-bold block animate-in fade-in">
                                🇦🇲 {fn.nameArm}
                              </span>
                            ) : (
                              <span className="text-xs text-slate-400 font-medium block">
                                🇦🇲 Կտտացրու հայերենի համար
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speakSpanish(fn.nameEs + '. ' + fn.purposeEs);
                          }}
                          className="p-1.5 text-slate-400 hover:text-amber-600 transition-colors"
                          title="Լսել"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* ¿Para qué sirve?: Click to reveal Armenian */}
                      <div
                        onClick={() =>
                          setRevealedArmenianTheoryPurpose((prev) => ({
                            ...prev,
                            [fn.id]: !prev[fn.id],
                          }))
                        }
                        className="cursor-pointer group p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-amber-400 transition-all"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs uppercase font-extrabold tracking-wider text-slate-500 block">
                            ¿Para qué sirve? (Ինչի՞ համար է)
                          </span>
                          <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                            {isPurposeArm ? '🇦🇲 Բացված է' : '🇦🇲 Կտտացրու'}
                          </span>
                        </div>
                        <p className={`text-slate-900 dark:text-white group-hover:text-amber-950 dark:group-hover:text-amber-200 transition-colors ${scale.spanishQuestion}`}>
                          {fn.purposeEs}
                        </p>
                        {isPurposeArm && (
                          <p className={`text-sky-900 dark:text-sky-200 font-bold mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 animate-in fade-in ${scale.cardSub}`}>
                            🇦🇲 {fn.purposeArm}
                          </p>
                        )}
                      </div>

                      {/* Element of communication: Click to reveal Armenian */}
                      <div
                        onClick={() =>
                          setRevealedArmenianTheoryElement((prev) => ({
                            ...prev,
                            [fn.id]: !prev[fn.id],
                          }))
                        }
                        className="cursor-pointer group p-3.5 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900/50 hover:border-sky-400 transition-all"
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-bold text-sky-900 dark:text-sky-300 text-sm">
                            Elemento: {fn.elementOfCommunication.es}
                          </span>
                          <span className="text-[10px] font-bold text-sky-700 dark:text-sky-300">
                            {isElementArm ? '🇦🇲 Բացված է' : '🇦🇲 Կտտացրու'}
                          </span>
                        </div>
                        {isElementArm && (
                          <p className="text-xs sm:text-sm text-sky-950 dark:text-sky-100 font-bold mt-1 animate-in fade-in">
                            🇦🇲 {fn.elementOfCommunication.arm}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Formula for exam: Click to reveal Armenian */}
                    <div
                      onClick={() =>
                        setRevealedArmenianTheoryFormula((prev) => ({
                          ...prev,
                          [fn.id]: !prev[fn.id],
                        }))
                      }
                      className="cursor-pointer group mt-5 pt-4 border-t border-slate-100 dark:border-slate-800"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                          🎓 Քննության բանաձև (Fórmula):
                        </span>
                        <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300">
                          {isFormulaArm ? '🇦🇲 Բացված է' : '🇦🇲 Կտտացրու'}
                        </span>
                      </div>
                      <p className={`text-slate-900 dark:text-slate-100 italic bg-amber-50 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200 dark:border-amber-800 font-bold group-hover:border-amber-400 transition-colors ${scale.cardSub}`}>
                        “{fn.formulaEs}”
                      </p>
                      {isFormulaArm && (
                        <p className="text-xs sm:text-sm text-sky-900 dark:text-sky-200 font-bold mt-2 animate-in fade-in">
                          🇦🇲 {fn.formulaArm}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Crucial Exam Tips */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-2 border-amber-300 dark:border-amber-800 rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-black text-amber-950 dark:text-amber-200 flex items-center gap-2.5">
                <GraduationCap className="w-6 h-6 text-amber-600" />
                <span>Շատ կարևոր հմտություն քննության համար (Habilidad clave)</span>
              </h3>
              <p className={`text-amber-900 dark:text-amber-300 mt-2 leading-relaxed font-medium ${scale.cardSub}`}>
                Քննությանը երբեք <strong>միայն մեկ բառով մի՛ պատասխանեք</strong> (օրինակ՝ պարզապես գրել «expresiva»):
                Միշտ գրեք ամբողջական բանաձևով և հիմնավորմամբ (<strong>Justifica tu respuesta</strong>):
              </p>
              <div className="mt-5 p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-amber-300 dark:border-amber-800 shadow-sm">
                <p className="text-base sm:text-lg font-black text-emerald-800 dark:text-emerald-400 leading-snug">
                  🇪🇸 “La función predominante es la apelativa porque el emisor intenta influir en el receptor.”
                </p>
                <p className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300 mt-2">
                  🇦🇲 «Գերակշռողը դիմողական գործառույթն է, որովհետև խոսողը փորձում է ազդել լսողի վրա»։
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: TEXTS AND DIALOGUES (TEXTOS Y DIÁLOGOS DE EXAMEN)      */}
        {/* ============================================================== */}
        {activeTab === 'textos' && (
          <div className="space-y-6">
            {/* Text Selector Carousel */}
            <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar">
              {TEXT_STUDY_UNITS.map((unit) => (
                <button
                  key={unit.id}
                  onClick={() => setSelectedTextId(unit.id)}
                  className={`p-3.5 rounded-2xl text-left border-2 transition-all shrink-0 ${
                    selectedTextId === unit.id
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 shadow-md'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black px-2 py-0.5 rounded-md bg-amber-500 text-white">
                      {unit.badge}
                    </span>
                    <span className="text-sm font-bold">{unit.titleEs.split('—')[0]}</span>
                  </div>
                  <p className="text-sm font-bold truncate max-w-[200px] mt-1.5 opacity-90">
                    {unit.titleEs.split('—')[1] || unit.titleEs}
                  </p>
                  <p className="text-xs text-slate-400 truncate max-w-[200px] mt-0.5 font-medium">
                    {unit.titleArm}
                  </p>
                </button>
              ))}
            </div>

            {/* Selected Text Header */}
            <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-xs font-extrabold bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full border border-amber-300">
                      {currentText.badge}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      {currentText.titleEs}
                    </h2>
                  </div>
                  <p className={`text-slate-600 dark:text-slate-400 mt-1.5 font-semibold ${scale.cardSub}`}>
                    🇦🇲 {currentText.titleArm} • {currentText.subtitleArm}
                  </p>
                </div>
              </div>

              {/* Dialogue lines: Clean text without spoilers/hints, click to reveal Armenian translation */}
              <div className="mt-6 space-y-3 bg-slate-50 dark:bg-slate-950/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="text-xs sm:text-sm text-slate-500 font-bold mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-500" />
                    <span>Տեքստ առանց հուշումների (Texto auténtico de examen):</span>
                  </div>
                  <span className="text-xs text-slate-400">
                    Կտտացրու տողին՝ միայն հայերեն թարգմանությունը տեսնելու համար
                  </span>
                </div>

                {currentText.dialogue.map((line, idx) => {
                  const lineKey = `${currentText.id}-line-${idx}`;
                  const isLineRevealed = !!revealedArmenianDialogue[lineKey];

                  return (
                    <div
                      key={idx}
                      onClick={() =>
                        setRevealedArmenianDialogue((prev) => ({
                          ...prev,
                          [lineKey]: !prev[lineKey],
                        }))
                      }
                      className="cursor-pointer p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700 transition-all shadow-2xs group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1.5 flex-1">
                          {/* Clean Spanish text without spoiler highlighting or tags */}
                          <p className={`text-slate-900 dark:text-slate-100 ${scale.dialogueEs}`}>
                            {line.es}
                          </p>

                          {/* Armenian translation: ONLY on click! Pure translation without function tags */}
                          {isLineRevealed && (
                            <p className={`text-sky-900 dark:text-sky-300 pt-2 border-t border-slate-100 dark:border-slate-800 animate-in fade-in ${scale.dialogueArm}`}>
                              🇦🇲 {line.arm}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] text-slate-400 font-medium group-hover:text-amber-600 transition-colors">
                            {isLineRevealed ? '🇦🇲 Թարգմանված է' : '🇦🇲 Կտտացրու'}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              speakSpanish(line.es);
                            }}
                            className="p-1.5 text-slate-400 hover:text-amber-600 transition-colors"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Questions for current text: Click to reveal Armenian question & answer! */}
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
                <HelpCircle className="w-5 h-5 text-amber-500" />
                <span>Առաջադրանքներ և Հարցեր — Preguntas del texto ({currentText.questions.length})</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {currentText.questions.map((q) => {
                  const qKey = `${currentText.id}-q-${q.id}`;
                  const isQuestionArmRevealed = !!revealedArmenianTextQuestions[qKey];
                  const isAnsRevealed = !!revealedTextAnswers[qKey];
                  const isAnsArmRevealed = !!revealedArmenianTextAnswers[qKey];
                  const userChoice = testUserAnswers[q.id];

                  return (
                    <div
                      key={q.id}
                      className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-extrabold text-sm flex items-center justify-center border border-amber-300">
                            {q.id}
                          </span>
                          <button
                            onClick={() => speakSpanish(q.questionEs)}
                            className="p-1.5 text-slate-400 hover:text-amber-600 transition-colors"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Spanish question card: Click to reveal Armenian question! */}
                        <div
                          onClick={() =>
                            setRevealedArmenianTextQuestions((prev) => ({
                              ...prev,
                              [qKey]: !prev[qKey],
                            }))
                          }
                          className="cursor-pointer group p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-amber-400 transition-all"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className={`text-slate-900 dark:text-slate-100 group-hover:text-amber-900 dark:group-hover:text-amber-200 transition-colors ${scale.spanishQuestion}`}>
                              {q.questionEs}
                            </p>
                            <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/50 px-2 py-0.5 rounded-md whitespace-nowrap self-start mt-1">
                              {isQuestionArmRevealed ? '🇦🇲 Բացված է' : '🇦🇲 Կտտացրու'}
                            </span>
                          </div>

                          {/* Armenian question: ONLY on click! */}
                          {isQuestionArmRevealed && (
                            <p className={`text-sky-900 dark:text-sky-200 font-bold mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 animate-in fade-in ${scale.armenianQuestion}`}>
                              🇦🇲 {q.questionArm}
                            </p>
                          )}
                        </div>

                        {/* Multiple choice options if present (Texto 3) */}
                        {q.options && (
                          <div className="mt-4 space-y-2">
                            {q.options.map((opt) => {
                              const isSelected = userChoice === opt.key;
                              return (
                                <button
                                  key={opt.key}
                                  onClick={() =>
                                    setTestUserAnswers((prev) => ({
                                      ...prev,
                                      [q.id]: opt.key,
                                    }))
                                  }
                                  className={`w-full text-left p-3.5 rounded-2xl border-2 text-sm sm:text-base font-bold transition-all flex items-center justify-between ${
                                    isSelected
                                      ? opt.isCorrect
                                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-200'
                                        : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-950 dark:text-rose-200'
                                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                                  }`}
                                >
                                  <span>
                                    <strong className="mr-2">{opt.key})</strong> {opt.text}
                                  </span>
                                  {isSelected && (
                                    <span className="text-sm">{opt.isCorrect ? '✅ Ճիշտ է' : '❌ Սխալ է'}</span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Distinct Answer Button */}
                      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <button
                          onClick={() =>
                            setRevealedTextAnswers((prev) => ({
                              ...prev,
                              [qKey]: !prev[qKey],
                            }))
                          }
                          className={`w-full rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${scale.answerBtn} ${
                            isAnsRevealed
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100'
                          }`}
                        >
                          <CheckCircle2 className="w-5 h-5" />
                          <span>{isAnsRevealed ? 'Պատասխանը բացված է (Այո)' : '💡 Պատասխան / Ver Respuesta'}</span>
                          {isAnsRevealed ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>

                        {/* Answer Box: Spanish first, click to reveal Armenian! */}
                        {isAnsRevealed && (
                          <div className="mt-3.5 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-800 space-y-2 animate-in fade-in duration-150">
                            <div
                              onClick={() =>
                                setRevealedArmenianTextAnswers((prev) => ({
                                  ...prev,
                                  [qKey]: !prev[qKey],
                                }))
                              }
                              className="cursor-pointer group p-3 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-emerald-200 dark:border-emerald-700 hover:border-emerald-400 transition-all"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                                  🇪🇸 Պատասխան (իսպաներեն):
                                </span>
                                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded-md">
                                  {isAnsArmRevealed ? '🇦🇲 Բացված է' : '🇦🇲 Կտտացրու հայերենի համար'}
                                </span>
                              </div>
                              <p className={`text-emerald-950 dark:text-emerald-100 group-hover:text-emerald-900 transition-colors ${scale.answerEs}`}>
                                🇪🇸 {q.answerEs}
                              </p>
                            </div>

                            {/* Armenian Answer: only on click! */}
                            {isAnsArmRevealed && (
                              <div className="p-3 rounded-xl bg-emerald-100/70 dark:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-700 animate-in fade-in">
                                <span className="text-xs font-black uppercase tracking-wider text-emerald-900 dark:text-emerald-300 block mb-0.5">
                                  🇦🇲 Հայերեն:
                                </span>
                                <p className={`text-emerald-950 dark:text-emerald-100 ${scale.answerArm}`}>
                                  {q.answerArm}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: SCRAMBLE & SENTENCE BUILDER (ԿԱԶՄԻ՛Ր ՆԱԽԱԴԱՍՈՒԹՅՈՒՆԸ)  */}
        {/* ============================================================== */}
        {activeTab === 'scramble' && (
          <div className="space-y-6">
            {/* Sub-tabs for Ejercicios 1, 2, 3, 4 */}
            <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
                    <Puzzle className="w-6 h-6 text-amber-500" />
                    <span>Funciones del lenguaje — Forma la frase</span>
                  </h2>
                  <p className={`text-slate-600 dark:text-slate-300 mt-1 font-medium ${scale.cardSub}`}>
                    Լեզվի գործառույթներ — Կազմի՛ր նախադասությունը բառերից և որոշի՛ր գործառույթը
                  </p>
                </div>

                {/* Switcher */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'ejercicio_1', label: 'Վարժ. 1 (Հայտնի ֆունկցիա)' },
                    { id: 'ejercicio_2', label: 'Վարժ. 2 (Ինքդ որոշիր)' },
                    { id: 'ejercicio_3', label: 'Վարժ. 3 (Ավելի դժվար)' },
                    { id: 'ejercicio_4', label: 'Վարժ. 4 (Ինքդ կազմիր)' },
                  ].map((series) => (
                    <button
                      key={series.id}
                      onClick={() => setActiveScrambleSeries(series.id as any)}
                      className={`text-sm px-3.5 py-2 rounded-xl font-bold transition-all ${
                        activeScrambleSeries === series.id
                          ? 'bg-amber-500 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {series.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Exercises Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SCRAMBLE_EXERCISES.filter((item) => item.series === activeScrambleSeries).map((item) => {
                const arranged = userArrangements[item.id] || [];
                const isArmenianShown = !!revealedScrambleArm[item.id];
                const isAnswerShown = !!revealedScrambleAns[item.id];
                const isAnswerArmShown = !!revealedScrambleAnswerArm[item.id];
                const isExercise4 = item.series === 'ejercicio_4';

                return (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Card Header */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold text-sm flex items-center justify-center border border-slate-200 dark:border-slate-700">
                            #{item.id % 100}
                          </span>
                          {item.functionId && (
                            <span
                              className={`text-xs sm:text-sm px-3 py-1 rounded-full border font-bold flex items-center gap-1.5 ${getFunctionBadgeClass(
                                item.functionId
                              )}`}
                            >
                              {getFunctionIcon(item.functionId)}
                              <span className="capitalize">{item.functionId}</span>
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => setRevealedScrambleArm((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                          className="text-sm text-sky-600 dark:text-sky-400 hover:underline font-bold"
                        >
                          {isArmenianShown ? 'Թաքցնել հայերենը' : '🇦🇲 Թարգմանություն'}
                        </button>
                      </div>

                      {/* Prompts: Spanish by default, click to reveal Armenian! */}
                      <div
                        onClick={() => setRevealedScrambleArm((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                        className="cursor-pointer group p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:bg-amber-50/50"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-slate-900 dark:text-white font-bold ${scale.cardSub}`}>
                            {item.promptEs}
                          </p>
                          <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/50 px-2 py-0.5 rounded-md shrink-0">
                            {isArmenianShown ? '🇦🇲 Բացված է' : '🇦🇲 Կտտացրու'}
                          </span>
                        </div>
                        {isArmenianShown && (
                          <p className={`text-sky-900 dark:text-sky-200 font-semibold mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 animate-in fade-in ${scale.cardSub}`}>
                            🇦🇲 {item.promptArm}
                          </p>
                        )}
                      </div>

                      {/* Interactive Scramble (For exercises 1, 2, 3) */}
                      {!isExercise4 && item.words && (
                        <div className="space-y-3">
                          {/* Available Word Chips to Click */}
                          <div>
                            <span className="text-xs sm:text-sm font-bold text-slate-500 block mb-2">
                              Ընտրի՛ր բառերը հերթով՝ նախադասություն կազմելու համար.
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {item.words.map((word, wIdx) => {
                                const isAlreadyUsed =
                                  arranged.filter((w) => w === word).length >=
                                  item.words!.filter((w) => w === word).length;

                                return (
                                  <button
                                    key={wIdx}
                                    disabled={isAlreadyUsed}
                                    onClick={() => handleAddWordToSentence(item.id, word)}
                                    className={`rounded-xl border-2 transition-all ${scale.chipWord} ${
                                      isAlreadyUsed
                                        ? 'opacity-25 cursor-not-allowed bg-slate-100 dark:bg-slate-800 border-slate-200 text-slate-400'
                                        : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 hover:border-amber-500 hover:text-amber-600 shadow-sm active:scale-95'
                                    }`}
                                  >
                                    {word}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Built Sentence Slot with large text */}
                          <div className="min-h-[56px] p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
                            {arranged.length === 0 ? (
                              <span className="text-sm sm:text-base text-slate-400 italic">
                                Կտտացրու վերևի բառերին՝ այստեղ ավելացնելու համար...
                              </span>
                            ) : (
                              arranged.map((w, aIdx) => (
                                <button
                                  key={aIdx}
                                  onClick={() => handleRemoveWordFromSentence(item.id, aIdx)}
                                  className="px-3.5 py-1.5 rounded-xl text-sm sm:text-base font-bold bg-amber-500 text-white hover:bg-rose-500 transition-colors shadow-xs flex items-center gap-1.5 group"
                                  title="Հեռացնել այս բառը"
                                >
                                  <span>{w}</span>
                                  <span className="text-xs opacity-75 group-hover:opacity-100">✕</span>
                                </button>
                              ))
                            )}
                          </div>

                          {arranged.length > 0 && (
                            <div className="flex items-center justify-between text-sm">
                              <button
                                onClick={() => handleResetArrangement(item.id)}
                                className="font-bold text-slate-500 hover:text-rose-600 flex items-center gap-1.5"
                              >
                                <RotateCcw className="w-4 h-4" />
                                <span>Մաքրել (Reset)</span>
                              </button>
                              <button
                                onClick={() => speakSpanish(arranged.join(' '))}
                                className="font-bold text-slate-600 dark:text-slate-300 hover:text-amber-600 flex items-center gap-1.5"
                              >
                                <Volume2 className="w-4 h-4" />
                                <span>Լսել կազմածը</span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Open writing mode for Exercise 4 */}
                      {isExercise4 && (
                        <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800">
                          <p className={`text-slate-700 dark:text-slate-200 font-medium ${scale.cardSub}`}>
                            ✍️ <strong>Ինքնուրույն առաջադրանք:</strong> Փորձի՛ր ինքդ մտածել կամ տետրում գրել նախադասությունը, ապա սեղմիր «Պատասխան»՝ համեմատելու համար քննության օրինակելի պատասխանի հետ։
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Distinct "Պատասխան" Button */}
                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={() => setRevealedScrambleAns((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                        className={`w-full rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${scale.answerBtn} ${
                          isAnswerShown
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100'
                        }`}
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        <span>{isAnswerShown ? 'Պատասխանը բացված է (Այո)' : '💡 Պատասխան / Ver Respuesta'}</span>
                        {isAnswerShown ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>

                      {/* Answer Box: Spanish first, click to reveal Armenian */}
                      {isAnswerShown && (
                        <div className="mt-3.5 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-800 space-y-2 animate-in fade-in duration-150">
                          <div
                            onClick={() => setRevealedScrambleAnswerArm((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                            className="cursor-pointer group p-3 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-emerald-200 dark:border-emerald-700 hover:border-emerald-400 transition-all"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                                🇪🇸 Ճիշտ նախադասություն:
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded-md">
                                  {isAnswerArmShown ? '🇦🇲 Բացված է' : '🇦🇲 Կտտացրու հայերենի համար'}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    speakSpanish(item.answerEs);
                                  }}
                                  className="text-emerald-700 dark:text-emerald-300 hover:text-emerald-950"
                                >
                                  <Volume2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <p className={`text-emerald-950 dark:text-emerald-100 ${scale.answerEs}`}>
                              {item.answerEs}
                            </p>
                          </div>

                          {/* Armenian Answer: only on click! */}
                          {isAnswerArmShown && item.answerArm && (
                            <div className="p-3 rounded-xl bg-emerald-100/70 dark:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-700 animate-in fade-in">
                              <p className={`text-emerald-950 dark:text-emerald-100 ${scale.answerArm}`}>
                                🇦🇲 {item.answerArm}
                              </p>
                              {item.explanationArm && (
                                <p className="text-sm text-emerald-800 dark:text-emerald-300 italic mt-1 font-medium">
                                  💡 {item.explanationArm}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: EXAM FORMULAS & JUSTIFICATIONS (FÓRMULAS DE EXAMEN)     */}
        {/* ============================================================== */}
        {activeTab === 'formulas' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
              <span className="text-xs sm:text-sm uppercase font-extrabold tracking-widest text-amber-600 dark:text-amber-400">
                Guía de Respuestas Modelo — Քննության Պատասխանների Կաղապարներ
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                Formulas que el alumno debe aprender para responder en el examen
              </h2>
              <p className={`text-slate-700 dark:text-slate-300 mt-2 font-medium ${scale.cardSub}`}>
                Ֆորմուլաներ, որոնք աշակերտը պետք է անգիր իմանա քննության ժամանակ «Justifica tu respuesta» պահանջին կատարյալ պատասխանելու համար:
                Սեղմի՛ր <strong>բանաձևի վրա</strong>՝ հայերեն թարգմանությունը տեսնելու համար։
              </p>
            </div>

            {/* Formula Cards: Click to reveal Armenian! */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {EXAM_FORMULAS.map((item, idx) => {
                const isFormulaArmRevealed = !!revealedArmenianFormulas[idx];

                return (
                  <div
                    key={idx}
                    className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs hover:border-amber-300 dark:hover:border-amber-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-sm px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 font-extrabold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                          {item.title}
                        </span>
                        <button
                          onClick={() => speakSpanish(item.formulaEs)}
                          className="p-2 rounded-xl text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors"
                          title="Լսել իսպաներեն"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Clickable Spanish formula box */}
                      <div
                        onClick={() =>
                          setRevealedArmenianFormulas((prev) => ({
                            ...prev,
                            [idx]: !prev[idx],
                          }))
                        }
                        className="cursor-pointer group p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 hover:border-amber-500 transition-all mt-2"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-black text-amber-800 dark:text-amber-300 uppercase block">
                            🇪🇸 Fórmula en español:
                          </span>
                          <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-200/70 dark:bg-amber-900/60 px-2 py-0.5 rounded-md">
                            {isFormulaArmRevealed ? '🇦🇲 Բացված է' : '🇦🇲 Կտտացրու'}
                          </span>
                        </div>
                        <p className={`text-slate-900 dark:text-white group-hover:text-amber-950 transition-colors ${scale.spanishQuestion}`}>
                          “{item.formulaEs}”
                        </p>
                      </div>

                      {/* Armenian translation: ONLY on click! */}
                      {isFormulaArmRevealed && (
                        <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 mt-3 animate-in fade-in">
                          <span className="text-xs font-black text-sky-800 dark:text-sky-300 uppercase block mb-1">
                            🇦🇲 Հայերեն թարգմանություն:
                          </span>
                          <p className={`text-sky-950 dark:text-sky-100 ${scale.armenianQuestion}`}>
                            «{item.formulaArm}»
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Differences comparison table */}
            <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
                <Sparkles className="w-6 h-6 text-amber-500" />
                <span>Հաճախակի շփոթվող տարբերությունները (Diferencias clave)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    Referencial vs Expresiva
                  </h4>
                  <p className={`text-slate-700 dark:text-slate-300 mt-2 ${scale.cardSub}`}>
                    <strong>Referencial:</strong> կենտրոնանում է օբյեկտիվ փաստերի վրա («Անձրև է գալիս», «Թանգարանը բացվում է 10-ին»):<br />
                    <strong>Expresiva:</strong> կենտրոնանում է խոսողի անձնական զգացմունքի կամ կարծիքի վրա («Ի՜նչ ուրախ եմ», «Ի՜նչ ցուրտ է»):
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    Apelativa vs Fática
                  </h4>
                  <p className={`text-slate-700 dark:text-slate-300 mt-2 ${scale.cardSub}`}>
                    <strong>Apelativa:</strong> նպատակ ունի, որ լսողը գործողություն կատարի («Փակի՛ր դուռը», «Սովորի՛ր քննությանը»):<br />
                    <strong>Fática:</strong> միայն ստուգում, սկսում կամ պահպանում է կապը («Ինձ լսո՞ւմ ես», «Բարև, ինչպե՞ս ես»):
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur py-5 text-center text-sm text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-semibold">
            Funciones del Lenguaje (7º Grado España) • Լեզվի Գործառույթներ (Իսպաներեն ↔ Հայերեն)
          </p>
          <p className="text-slate-500">
            Նախատեսված է Իսպանիայի 7-րդ դասարանի Լեզվի և գրականության (Lengua y Literatura) քննություններին պատրաստվելու համար
          </p>
        </div>
      </footer>
    </div>
  );
}
