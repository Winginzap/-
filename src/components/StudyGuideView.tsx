import { ArrowLeft, Play } from 'lucide-react';

interface StudyGuideViewProps {
  onBack: () => void;
  onStartSetup: () => void;
}

export function StudyGuideView({ onBack, onStartSetup }: StudyGuideViewProps) {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#15803D] hover:text-[#14532D] cursor-pointer mb-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับหน้าหลัก</span>
          </button>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#132A1C]">
            สรุปบทเรียนชีววิทยา บทที่ 3: การดำรงชีวิตของพืช
          </h1>
          <p className="text-sm sm:text-base text-[#3F624C]">
            อ่านทบทวนสั้น ๆ เข้าใจง่าย ก่อนลงสนามตอบคำถาม
          </p>
        </div>

        <button
          type="button"
          onClick={onStartSetup}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm sm:text-base font-semibold text-white bg-[#16A34A] hover:bg-[#15803D] rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>พร้อมแล้ว เริ่มเกมเลย</span>
        </button>
      </div>

      {/* Topic 1 */}
      <section className="bg-white border border-[#D8EAD2] rounded-2xl p-6 sm:p-8 space-y-5">
        <div>
          <p className="text-xs font-semibold text-[#15803D]">หัวข้อที่ 1</p>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#132A1C]">
            สารอินทรีย์ในพืช
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-[#F6FAF4] border border-[#DCEAD7] space-y-2.5">
            <h3 className="font-display text-lg font-bold text-[#14532D]">
              สารอินทรีย์ที่จำเป็นต่อการเจริญเติบโตโดยตรง
            </h3>
            <p className="text-sm text-[#3F624C]">
              เป็นสารหลักที่ใช้สร้างโครงสร้างเซลล์ ให้พลังงาน และควบคุมการทำงานพื้นฐานของพืช
            </p>
            <ul className="space-y-1.5 text-sm text-[#1E3A28] pt-1">
              <li>• <strong>คาร์โบไฮเดรต:</strong> ซูโครส (ลำเลียงในโฟลเอ็ม), แป้ง (สะสมพลังงาน), เซลลูโลส (สร้างผนังเซลล์)</li>
              <li>• <strong>โปรตีน:</strong> สร้างเอนไซม์และโครงสร้างของเซลล์พืช</li>
              <li>• <strong>ลิพิด:</strong> ส่วนประกอบเยื่อหุ้มเซลล์ และน้ำมันสะสมในเมล็ด</li>
              <li>• <strong>กรดนิวคลีอิก:</strong> DNA และ RNA สำหรับเก็บและถ่ายทอดข้อมูลพันธุกรรม</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-[#FEFCE8] border border-[#FDE68A] space-y-2.5">
            <h3 className="font-display text-lg font-bold text-[#854D0E]">
              สารอินทรีย์ที่ไม่จำเป็นต่อการเจริญเติบโตโดยตรง
            </h3>
            <p className="text-sm text-[#713F12]">
              ไม่ได้สร้างเซลล์โดยตรง แต่ช่วยป้องกันศัตรูพืช ไล่แมลง หรือดึงดูดแมลงผสมเกสร
            </p>
            <ul className="space-y-1.5 text-sm text-[#422006] pt-1">
              <li>• <strong>แอลคาลอยด์ (มีไนโตรเจน):</strong> คาเฟอีน, นิโคติน, มอร์ฟีน มีรสขมหรือออกฤทธิ์ต่อสัตว์กินพืช</li>
              <li>• <strong>เทอร์พีน / เทอร์พีนอยด์:</strong> น้ำมันหอมระเหย (ตะไคร้, มะกรูด), ยางพารา, รงควัตถุแคโรทีนอยด์</li>
              <li>• <strong>ฟีนอลิก:</strong> แทนนิน (รสฝาดในชา/กล้วยดิบ), แอนโทไซยานิน (สีม่วง/แดงในดอกไม้), ลิกนิน</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Topic 2 */}
      <section className="bg-white border border-[#D8EAD2] rounded-2xl p-6 sm:p-8 space-y-5">
        <div>
          <p className="text-xs font-semibold text-[#15803D]">หัวข้อที่ 2</p>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#132A1C]">
            ปัจจัยที่มีผลต่อการเจริญเติบโตของพืช
          </h2>
        </div>

        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-[#F6FAF4] border border-[#DCEAD7] space-y-2">
            <h3 className="font-display text-lg font-bold text-[#14532D]">
              ปัจจัยภายนอก (สิ่งแวดล้อมรอบตัวพืช)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 text-sm text-[#1E3A28]">
              <div className="bg-white p-3.5 rounded-lg border border-[#E2EFE0]">
                <strong>แสง:</strong> แหล่งพลังงานสังเคราะห์ด้วยแสง และช่วยกระตุ้นการเปิดปากใบ
              </div>
              <div className="bg-white p-3.5 rounded-lg border border-[#E2EFE0]">
                <strong>น้ำ:</strong> ตัวทำละลาย รักษาแรงดันเต่งให้เซลล์ขยายขนาด และร่วมสังเคราะห์ด้วยแสง
              </div>
              <div className="bg-white p-3.5 rounded-lg border border-[#E2EFE0]">
                <strong>อุณหภูมิ:</strong> ควบคุมความเร็วในการทำงานของเอนไซม์ในพืช
              </div>
              <div className="bg-white p-3.5 rounded-lg border border-[#E2EFE0]">
                <strong>ธาตุอาหารหลัก:</strong> N สร้างใบเขียว, P สร้างดอก/ราก/ATP, K คุมปากใบ/สะสมแป้ง
              </div>
              <div className="bg-white p-3.5 rounded-lg border border-[#E2EFE0] sm:col-span-2">
                <strong>แก๊ส:</strong> แก๊ส CO₂ ใช้สร้างน้ำตาลในการสังเคราะห์ด้วยแสง ส่วนแก๊ส O₂ ใช้ในการหายใจระดับเซลล์ (โดยเฉพาะราก)
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-display text-lg font-bold text-[#14532D]">
              ปัจจัยภายใน: ฮอร์โมนพืช 5 กลุ่มหลัก
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-sm">
              <div className="p-4 rounded-xl bg-[#ECFDF3] border border-[#BBF7D0] space-y-1.5">
                <p className="font-display font-bold text-[#14532D]">ออกซิน (Auxin)</p>
                <p className="text-[#2E523B] leading-relaxed">
                  ยืดตัวเซลล์ ข่มตาข้าง (ตัดยอดจึงแตกพุ่ม) กระตุ้นการออกรากในกิ่งปักชำ
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#F0FDFA] border border-[#99F6E4] space-y-1.5">
                <p className="font-display font-bold text-[#115E59]">ไซโทไคนิน</p>
                <p className="text-[#134E4A] leading-relaxed">
                  กระตุ้นการแบ่งเซลล์ ส่งเสริมการแตกตาข้าง ชะลอการแก่ชราของใบ
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#FEFCE8] border border-[#FDE047] space-y-1.5">
                <p className="font-display font-bold text-[#854D0E]">จิบเบอเรลลิน</p>
                <p className="text-[#713F12] leading-relaxed">
                  ยืดปล้องลำต้น ทำลายระยะพักตัวของเมล็ด ช่วยให้องุ่นติดผลใหญ่ไร้เมล็ด
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#FFF7ED] border border-[#FED7AA] space-y-1.5">
                <p className="font-display font-bold text-[#9A3412]">เอทิลีน (แก๊ส)</p>
                <p className="text-[#7C2D12] leading-relaxed">
                  ฮอร์โมนแก๊ส! เร่งผลไม้ให้สุก กระตุ้นการหลุดร่วงของใบและดอก
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] space-y-1.5">
                <p className="font-display font-bold text-[#991B1B]">กรดแอบไซซิก (ABA)</p>
                <p className="text-[#7F1D1D] leading-relaxed">
                  ยับยั้งการงอก รักษาการพักตัวของเมล็ด กระตุ้นการปิดปากใบเมื่อขาดน้ำ
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topic 3 */}
      <section className="bg-white border border-[#D8EAD2] rounded-2xl p-6 sm:p-8 space-y-5">
        <div>
          <p className="text-xs font-semibold text-[#15803D]">หัวข้อที่ 3</p>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#132A1C]">
            การตอบสนองของพืชต่อสิ่งเร้า
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-[#F6FAF4] border border-[#DCEAD7] space-y-2.5">
            <h3 className="font-display text-lg font-bold text-[#14532D]">
              มีทิศทางสัมพันธ์กับสิ่งเร้า (Tropism)
            </h3>
            <p className="text-sm text-[#3F624C]">
              ทิศทางการเจริญเติบโตของพืชขึ้นอยู่กับทิศทางที่สิ่งเร้าเข้ามา
            </p>
            <ul className="space-y-1.5 text-sm text-[#1E3A28] pt-1">
              <li>• <strong>Phototropism:</strong> ยอดเบนเข้าหาแสง (+) · รากหนีแสง (-)</li>
              <li>• <strong>Gravitropism:</strong> รากงอกลงหาแรงโน้มถ่วง (+) · ยอดงอกขึ้น (-)</li>
              <li>• <strong>Thigmotropism:</strong> มือเกาะตำลึง บวบ พันรอบหลักเมื่อสัมผัส</li>
              <li>• <strong>Hydrotropism:</strong> รากเจริญเข้าหาแหล่งน้ำและความชื้น</li>
              <li>• <strong>Chemotropism:</strong> หลอดเรณูงอกเข้าหาออวุลตามสารเคมี</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-[#FEFCE8] border border-[#FDE68A] space-y-2.5">
            <h3 className="font-display text-lg font-bold text-[#854D0E]">
              ไม่มีทิศทางสัมพันธ์กับสิ่งเร้า (Nastic Movement)
            </h3>
            <p className="text-sm text-[#713F12]">
              มักเกิดจากการเปลี่ยนแปลงแรงดันเต่งของน้ำ ทิศทางคงที่เสมอไม่ว่าจะกระตุ้นจากทางใด
            </p>
            <ul className="space-y-1.5 text-sm text-[#422006] pt-1">
              <li>• <strong>Thigmonasty:</strong> ใบไมยราบหุบเมื่อถูกสัมผัส · กาบหอยแครงงับแมลง</li>
              <li>• <strong>Nyctinasty:</strong> การหุบใบของจามจุรีหรือกระถินในตอนกลางคืน</li>
              <li>• <strong>Photonasty:</strong> ดอกบัวและดอกคุณนายตื่นสายบานเมื่อมีแสง</li>
              <li>• <strong>Thermonasty:</strong> ดอกทิวลิปบานเมื่ออุณหภูมิสูงขึ้น</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
