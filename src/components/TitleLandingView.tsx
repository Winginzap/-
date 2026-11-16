import { useState } from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Leaf,
  Play,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';
import { HERO_BANNER_URL, MASCOTS, TOPICS } from '../data/questions';
import { MascotAvatar } from './MascotAvatar';

interface TitleLandingViewProps {
  onStartSetup: () => void;
  onOpenStudyGuide: () => void;
}

export function TitleLandingView({ onStartSetup, onOpenStudyGuide }: TitleLandingViewProps) {
  const [bannerError, setBannerError] = useState(false);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Hero Section: Balanced 2-column stretch */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white border border-[#D8EAD2] rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="lg:col-span-6 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <p className="text-sm font-medium text-[#15803D]">
              ชีววิทยา ม.ปลาย · บทที่ 3 เรื่อง การดำรงชีวิตของพืช
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#132A1C] leading-tight text-balance">
              ภารกิจพิชิตอาณาจักรพืช
            </h1>
            <p className="text-base sm:text-lg text-[#2E523B] leading-relaxed max-w-xl">
              เกมตอบคำถามชวนสนุกสำหรับนักเรียนมัธยม แบ่งทีมแข่งขัน 2–5 ทีม เพื่อทบทวนเรื่องสารอินทรีย์ในพืช
              ปัจจัยการเจริญเติบโต ฮอร์โมนพืช และการตอบสนองต่อสิ่งเร้าอย่างเข้าใจง่าย
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onStartSetup}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-white bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] rounded-xl transition-all cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] focus-visible:ring-offset-2"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>ตั้งค่าทีมและเริ่มเกม</span>
              </button>

              <button
                type="button"
                onClick={onOpenStudyGuide}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-base font-semibold text-[#14532D] bg-[#FEF9C3] hover:bg-[#FEF08A] border border-[#FDE047] rounded-xl transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CA8A04]"
              >
                <BookOpen className="w-5 h-5 text-[#A16207]" />
                <span>สรุปบทเรียนก่อนเล่น</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#3F624C]">
              <span>คลังคำถาม 32 ข้อ (สุ่มใหม่ทุกรอบ)</span>
              <span aria-hidden="true">·</span>
              <span>4 ตัวเลือก · ถูก-ผิด · ภารกิจพิเศษ · โบนัส</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="w-full h-64 sm:h-80 lg:h-full min-h-[280px] rounded-2xl overflow-hidden border border-[#D8EAD2] bg-[#EAF7E6] flex items-center justify-center">
            {!bannerError ? (
              <img
                src={HERO_BANNER_URL}
                alt="ภาพประกอบสวนพืชและธรรมชาติแสนสดใสสำหรับเกมภารกิจพิชิตอาณาจักรพืช"
                referrerPolicy="no-referrer"
                onError={() => setBannerError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="p-8 text-center space-y-3">
                <Leaf className="w-16 h-16 text-[#16A34A] mx-auto" />
                <p className="font-display text-lg font-semibold text-[#14532D]">
                  สวนแห่งการเรียนรู้อาณาจักรพืช
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mascot Lineup Strip */}
      <section className="bg-white border border-[#D8EAD2] rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="font-display text-xl font-bold text-[#132A1C]">
              เลือกตัวแทนประจำทีมสุดน่ารัก (2–5 ทีม)
            </h2>
            <p className="text-sm text-[#3F624C]">
              แต่ละทีมมีตัวการ์ตูนพืชประจำทีม พร้อมระบบสลับเทิร์นตอบคำถามอัตโนมัติ
            </p>
          </div>
          <button
            type="button"
            onClick={onStartSetup}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#15803D] hover:text-[#14532D] cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>ไปหน้าเลือกทีม</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {MASCOTS.map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-[#F8FCF6] border border-[#E2EFE0]"
            >
              <MascotAvatar mascotId={m.id} size="md" />
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold text-[#132A1C] truncate">
                  {m.name}
                </p>
                <p className="text-xs text-[#4B6B56]">ตัวแทนทีม</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rules & Scoring System */}
      <section id="rules-section" className="space-y-5 scroll-mt-24">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#132A1C]">
            กติกาและการคิดคะแนน
          </h2>
          <p className="text-sm sm:text-base text-[#3F624C] mt-1">
            เข้าใจง่าย เล่นสนุกได้ทั้งห้องเรียนหรือกลุ่มเพื่อน แม้มีพื้นฐานชีววิทยาไม่มากก็ร่วมสนุกได้
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#D8EAD2] rounded-2xl p-5 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#ECFDF3] border border-[#BBF7D0] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
            </div>
            <h3 className="font-display text-lg font-bold text-[#132A1C]">
              คำถามปกติ (+10 คะแนน)
            </h3>
            <p className="text-sm text-[#3F624C] leading-relaxed">
              มีทั้งแบบ 4 ตัวเลือก และแบบถูกหรือผิด ตอบถูกได้ 10 คะแนน พร้อมข้อความชื่นชม
            </p>
          </div>

          <div className="bg-white border border-[#D8EAD2] rounded-2xl p-5 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDFA] border border-[#99F6E4] flex items-center justify-center">
              <Award className="w-5 h-5 text-[#0D9488]" />
            </div>
            <h3 className="font-display text-lg font-bold text-[#132A1C]">
              ภารกิจพิเศษ (+15 คะแนน)
            </h3>
            <p className="text-sm text-[#3F624C] leading-relaxed">
              มินิเกมจับคู่ฮอร์โมนพืชหรือจัดหมวดหมู่สารอินทรีย์ ทำครบถูกต้องรับทันที 15 คะแนน
            </p>
          </div>

          <div className="bg-white border border-[#D8EAD2] rounded-2xl p-5 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FEFCE8] border border-[#FDE047] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#CA8A04]" />
            </div>
            <h3 className="font-display text-lg font-bold text-[#132A1C]">
              คำถามโบนัส (+20 คะแนน)
            </h3>
            <p className="text-sm text-[#3F624C] leading-relaxed">
              ข้อท้าทายชวนคิดวิเคราะห์ระดับมัธยม หากตอบถูกทีมจะคว้าโบนัสก้อนโต 20 คะแนน
            </p>
          </div>

          <div className="bg-white border border-[#D8EAD2] rounded-2xl p-5 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#EA580C]" />
            </div>
            <h3 className="font-display text-lg font-bold text-[#132A1C]">
              จับเวลา 15–20 วินาที
            </h3>
            <p className="text-sm text-[#3F624C] leading-relaxed">
              แต่ละทีมผลัดกันตอบสลับรอบ หากตอบผิดหรือหมดเวลาจะมีเฉลยและคำอธิบายสั้น ๆ ให้เรียนรู้ทันที
            </p>
          </div>
        </div>
      </section>

      {/* Biology Content Coverage */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#132A1C]">
              เนื้อหาที่ครอบคลุมในบทที่ 3 การดำรงชีวิตของพืช
            </h2>
            <p className="text-sm sm:text-base text-[#3F624C] mt-1">
              ครบทั้ง 3 หัวข้อสำคัญตามหลักสูตรชีววิทยาระดับมัธยมศึกษา
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenStudyGuide}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#15803D] hover:text-[#14532D] cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>เปิดอ่านคู่มือทบทวนฉบับเต็ม</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {Object.values(TOPICS).map((topic) => (
            <article
              key={topic.id}
              className="bg-white border border-[#D8EAD2] rounded-2xl p-6 flex flex-col justify-between gap-4"
            >
              <div className="space-y-2.5">
                <h3 className="font-display text-lg font-bold text-[#14532D]">
                  {topic.title}
                </h3>
                <p className="text-sm text-[#3F624C] leading-relaxed">{topic.subtitle}</p>
              </div>
              <ul className="space-y-2 pt-3 border-t border-[#E6F1E2] text-sm text-[#1E3A28]">
                {topic.summaryPoints.map((pt, idx) => (
                  <li key={idx} className="leading-relaxed">
                    • {pt}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Final Callout Banner */}
      <section className="bg-[#14532D] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#FDE047] text-sm font-medium">
            <Users className="w-4 h-4" />
            <span>พร้อมสำหรับ 2–5 ทีม · ทีมที่คะแนนสูงสุดเป็นผู้ชนะ</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold">
            พร้อมประลองความรู้ในอาณาจักรพืชแล้วหรือยัง?
          </h2>
        </div>

        <button
          type="button"
          onClick={onStartSetup}
          className="inline-flex items-center gap-2.5 px-6 py-3.5 text-base font-bold text-[#132A1C] bg-[#FACC15] hover:bg-[#FDE047] active:scale-[0.98] rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          <Trophy className="w-5 h-5 text-[#854D0E]" />
          <span>เริ่มจัดทีมแข่งขัน</span>
        </button>
      </section>
    </main>
  );
}
