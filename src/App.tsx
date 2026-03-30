/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  User, 
  Scale, 
  Calendar, 
  Ruler, 
  ChevronRight,
  RefreshCw,
  Moon,
  Wind
} from 'lucide-react';

type QuestionId = 'snoring' | 'tired' | 'observed' | 'pressure' | 'bmi' | 'age' | 'neck' | 'gender';

interface Question {
  id: QuestionId;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const QUESTIONS: Question[] = [
  {
    id: 'snoring',
    label: 'นอนกรน',
    description: 'คุณนอนกรนเสียงดังหรือไม่ (ดังกว่าระดับเสียงพูดคุย หรือดังจนกระทั่งได้ยินผ่านประตูห้องที่ปิดอยู่)',
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: 'tired',
    label: 'เหนื่อยล้า',
    description: 'คุณรู้สึกเหนื่อยล้า อ่อนเพลีย หรือง่วงนอนเวลากลางวันหรือไม่',
    icon: <Moon className="w-5 h-5" />,
  },
  {
    id: 'observed',
    label: 'มีคนสังเกตเห็น',
    description: 'เคยมีใครสังเกตเห็นคุณหยุดหายใจขณะหลับหรือไม่',
    icon: <Activity className="w-5 h-5" />,
  },
  {
    id: 'pressure',
    label: 'ความดันโลหิตสูง',
    description: 'คุณมีโรคความดันโลหิตสูงหรือได้รับการรักษาโรคความดันโลหิตสูงอยู่หรือไม่',
    icon: <Activity className="w-5 h-5" />,
  },
  {
    id: 'bmi',
    label: 'ดัชนีมวลกาย (BMI)',
    description: 'ดัชนีมวลกาย มากกว่า 35 กิโลกรัม/เมตร²',
    icon: <Scale className="w-5 h-5" />,
  },
  {
    id: 'age',
    label: 'อายุ',
    description: 'อายุมากกว่า 50 ปี',
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    id: 'neck',
    label: 'ขนาดรอบคอ',
    description: 'ขนาดรอบคอมากกว่า 40 ซม. หรือ 16 นิ้ว',
    icon: <Ruler className="w-5 h-5" />,
  },
  {
    id: 'gender',
    label: 'เพศ',
    description: 'เพศชาย',
    icon: <User className="w-5 h-5" />,
  },
];

export default function App() {
  const [answers, setAnswers] = useState<Record<QuestionId, boolean>>({
    snoring: false,
    tired: false,
    observed: false,
    pressure: false,
    bmi: false,
    age: false,
    neck: false,
    gender: false,
  });

  const toggleAnswer = (id: QuestionId) => {
    setAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const resetAnswers = () => {
    setAnswers({
      snoring: false,
      tired: false,
      observed: false,
      pressure: false,
      bmi: false,
      age: false,
      neck: false,
      gender: false,
    });
  };

  const score = useMemo(() => {
    return Object.values(answers).filter(Boolean).length;
  }, [answers]);

  const riskLevel = useMemo(() => {
    const stopScore = [answers.snoring, answers.tired, answers.observed, answers.pressure].filter(Boolean).length;
    const isHighRiskSpecial = stopScore >= 2 && (answers.gender || answers.bmi || answers.neck);

    if (score >= 5 || isHighRiskSpecial) return { 
      label: 'ความเสี่ยงสูง', 
      color: 'text-red-600', 
      bg: 'bg-red-50', 
      border: 'border-red-200',
      icon: <AlertTriangle className="w-8 h-8 text-red-600" />,
      description: 'มีความเสี่ยงสูงในการเกิดภาวะหยุดหายใจขณะหลับจากการอุดกั้น ควรปรึกษาแพทย์เพื่อตรวจการนอนหลับ (Sleep Study)'
    };
    
    if (score >= 3) return { 
      label: 'ความเสี่ยงปานกลาง', 
      color: 'text-amber-600', 
      bg: 'bg-amber-50', 
      border: 'border-amber-200',
      icon: <Info className="w-8 h-8 text-amber-600" />,
      description: 'มีความเสี่ยงปานกลางในการเกิดภาวะหยุดหายใจขณะหลับจากการอุดกั้น ควรสังเกตอาการและปรึกษาผู้เชี่ยวชาญ'
    };
    
    return { 
      label: 'ความเสี่ยงต่ำ', 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50', 
      border: 'border-emerald-200',
      icon: <CheckCircle2 className="w-8 h-8 text-emerald-600" />,
      description: 'มีความเสี่ยงต่ำในการเกิดภาวะหยุดหายใจขณะหลับจากการอุดกั้น'
    };
  }, [score, answers]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-12 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-2xl mb-6 shadow-lg shadow-indigo-200"
          >
            <Activity className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-2"
          >
            แบบประเมินความเสี่ยงภาวะหยุดหายใจขณะหลับจากการอุดกั้น
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 font-medium"
          >
            (STOP-BANG Sleep Apnea Screening)
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-slate-400 max-w-2xl mx-auto"
          >
            เครื่องมือมาตรฐานในการคัดกรองความเสี่ยงภาวะหยุดหายใจขณะหลับ
            กรุณาตอบคำถามทั้ง 8 ข้อเพื่อประเมินผลเบื้องต้น
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Questions Section */}
          <div className="lg:col-span-2 space-y-4">
            {QUESTIONS.map((q, index) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => toggleAnswer(q.id)}
                className={`group cursor-pointer p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${
                  answers[q.id] 
                    ? 'bg-white border-indigo-600 ring-1 ring-indigo-600 shadow-md' 
                    : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${
                  answers[q.id] ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                }`}>
                  {q.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-semibold text-lg ${answers[q.id] ? 'text-indigo-900' : 'text-slate-800'}`}>
                      {q.label}
                    </h3>
                    <div className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${answers[q.id] ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${answers[q.id] ? 'left-7' : 'left-1'}`} />
                    </div>
                  </div>
                  <p className={`text-sm leading-relaxed ${answers[q.id] ? 'text-indigo-700/80' : 'text-slate-500'}`}>
                    {q.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Results Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Score Card */}
              <motion.div 
                layout
                className={`p-8 rounded-3xl border ${riskLevel.bg} ${riskLevel.border} shadow-xl shadow-slate-200/50 relative overflow-hidden`}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-bold uppercase tracking-wider text-slate-400">คะแนนของคุณ</span>
                    <button 
                      onClick={resetAnswers}
                      className="p-2 hover:bg-white/50 rounded-full transition-colors text-slate-400 hover:text-indigo-600"
                      title="เริ่มใหม่"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className={`text-7xl font-black ${riskLevel.color}`}>{score}</span>
                    <span className="text-2xl font-medium text-slate-400">/ 8</span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    {riskLevel.icon}
                    <h2 className={`text-2xl font-bold ${riskLevel.color}`}>
                      {riskLevel.label}
                    </h2>
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                    {riskLevel.description}
                  </p>

                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(score / 8) * 100}%` }}
                      className={`h-full ${score >= 5 ? 'bg-red-500' : score >= 3 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                    />
                  </div>
                </div>
                
                {/* Decorative background element */}
                <div className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none">
                  {riskLevel.icon}
                </div>
              </motion.div>

              {/* Info Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4 text-indigo-600" />
                  เกณฑ์การให้คะแนน
                </h4>
                <ul className="space-y-3 text-sm text-slate-500">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>0 - 2 คะแนน: ความเสี่ยงต่ำ</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>3 - 4 คะแนน: ความเสี่ยงปานกลาง</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span>5 - 8 คะแนน: ความเสี่ยงสูง</span>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-slate-100 italic text-xs leading-relaxed">
                  หมายเหตุ: แบบประเมินนี้ใช้เพื่อการคัดกรองเบื้องต้นเท่านั้น ไม่สามารถใช้แทนการวินิจฉัยโดยแพทย์ผู้เชี่ยวชาญได้
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} แบบประเมิน STOP-BANG ฉบับภาษาไทย</p>
        </footer>
      </div>
    </div>
  );
}
