import { GameQuestion, MascotOption, TopicId } from '../types/game';

export const HERO_BANNER_URL = '/src/assets/images/garden_hero_banner_1794829337007.jpg';

export const MASCOTS: MascotOption[] = [
  {
    id: 'sprout',
    name: 'น้องต้นกล้า',
    imageUrl: '/src/assets/images/mascot_sprout_1794829336207.jpg',
    accentHex: '#16A34A',
    softBgClass: 'bg-[#ECFDF3]',
    borderClass: 'border-[#86EFAC]',
    textClass: 'text-[#166534]',
  },
  {
    id: 'sunflower',
    name: 'น้องทานตะวัน',
    imageUrl: '/src/assets/images/mascot_sunflower_1794829336836.jpg',
    accentHex: '#D97706',
    softBgClass: 'bg-[#FEFCE8]',
    borderClass: 'border-[#FDE047]',
    textClass: 'text-[#854D0E]',
  },
  {
    id: 'cactus',
    name: 'น้องกระบองเพชร',
    imageUrl: '/src/assets/images/mascot_cactus_1794829337560.jpg',
    accentHex: '#0D9488',
    softBgClass: 'bg-[#F0FDFA]',
    borderClass: 'border-[#5EEAD4]',
    textClass: 'text-[#115E59]',
  },
  {
    id: 'lotus',
    name: 'น้องบัวหลวง',
    imageUrl: '/src/assets/images/mascot_lotus_1794829337944.jpg',
    accentHex: '#DB2777',
    softBgClass: 'bg-[#FDF2F8]',
    borderClass: 'border-[#F9A8D4]',
    textClass: 'text-[#9D174D]',
  },
  {
    id: 'fern',
    name: 'น้องเฟิร์นเขียว',
    imageUrl: '/src/assets/images/mascot_fern_1794829338514.jpg',
    accentHex: '#65A30D',
    softBgClass: 'bg-[#F7FEE7]',
    borderClass: 'border-[#BEF264]',
    textClass: 'text-[#3F6212]',
  },
];

export const DEFAULT_TEAM_NAMES = [
  'ทีมต้นกล้า',
  'ทีมทานตะวัน',
  'ทีมกระบองเพชร',
  'ทีมบัวหลวง',
  'ทีมเฟิร์นเขียว',
];

export const TOPICS: Record<
  TopicId,
  {
    id: TopicId;
    title: string;
    shortTitle: string;
    subtitle: string;
    summaryPoints: string[];
  }
> = {
  organic_substances: {
    id: 'organic_substances',
    title: '1. สารอินทรีย์ในพืช',
    shortTitle: 'สารอินทรีย์ในพืช',
    subtitle: 'สารที่จำเป็นต่อการเจริญเติบโตโดยตรง และสารที่ช่วยป้องกันตัวหรือดึงดูดแมลง',
    summaryPoints: [
      'สารอินทรีย์ที่จำเป็นโดยตรง: คาร์โบไฮเดรต (น้ำตาล, แป้ง, เซลลูโลส), โปรตีน, ลิพิด และกรดนิวคลีอิก',
      'สารอินทรีย์ที่ไม่จำเป็นโดยตรง: แอลคาลอยด์ (คาเฟอีน, นิโคติน, มอร์ฟีน), เทอร์พีน (น้ำมันหอมระเหย, ยางพารา, แคโรทีนอยด์) และฟีนอลิก (แทนนิน, แอนโทไซยานิน, ลิกนิน)',
    ],
  },
  growth_factors: {
    id: 'growth_factors',
    title: '2. ปัจจัยที่มีผลต่อการเจริญเติบโตของพืช',
    shortTitle: 'ปัจจัยการเจริญเติบโต',
    subtitle: 'ปัจจัยภายนอกรอบตัวพืช และปัจจัยภายในอย่างฮอร์โมนพืชทั้ง 5 กลุ่ม',
    summaryPoints: [
      'ปัจจัยภายนอก: แสง (สร้างอาหาร), น้ำ (แรงดันเต่งและตัวทำละลาย), อุณหภูมิ (การทำงานของเอนไซม์), ธาตุอาหาร (N, P, K), แก๊ส CO₂ และ O₂',
      'ฮอร์โมนพืช: ออกซิน (ยืดเซลล์/ออกราก), ไซโทไคนิน (แบ่งเซลล์/แตกตาข้าง), จิบเบอเรลลิน (ยืดปล้อง/งอกเมล็ด), เอทิลีน (แก๊สเร่งผลสุก), กรดแอบไซซิก (พักตัว/ปิดปากใบ)',
    ],
  },
  plant_responses: {
    id: 'plant_responses',
    title: '3. การตอบสนองของพืชต่อสิ่งเร้า',
    shortTitle: 'การตอบสนองต่อสิ่งเร้า',
    subtitle: 'การเคลื่อนไหวที่มีทิศทางสัมพันธ์กับสิ่งเร้า และแบบที่ไม่มีทิศทางสัมพันธ์กับสิ่งเร้า',
    summaryPoints: [
      'มีทิศทางสัมพันธ์กับสิ่งเร้า (Tropism): ยอดเบนเข้าหาแสง (Phototropism), รากลงสู่ดิน (Gravitropism), มือเกาะพันหลัก (Thigmotropism), รากหาน้ำ (Hydrotropism)',
      'ไม่มีทิศทางสัมพันธ์กับสิ่งเร้า (Nastic movement): ใบไมยราบหุบเมื่อถูกสัมผัส, ต้นกาบหอยแครงงับแมลง, ดอกบัวหุบ-บาน, ดอกทิวลิปบานตามอุณหภูมิ',
    ],
  },
};

export const PRAISE_MESSAGES = [
  'เก่งมาก! ตอบถูกเป๊ะเลย',
  'สุดยอดนักพฤกษศาสตร์ประจำห้อง!',
  'เยี่ยมยอด! ความรู้ชีววิทยาแน่นมาก',
  'ปังไม่ไหว! เก็บคะแนนเข้าทีมสำเร็จ',
  'ถูกต้องแล้ว! สวนพืชเบ่งบานเพราะทีมนี้',
  'แม่นยำสุด ๆ ไปเลยทีมนี้!',
];

export const QUESTION_BANK: GameQuestion[] = [
  // =========================================================
  // หัวข้อ 1: สารอินทรีย์ในพืช (10 ข้อ)
  // =========================================================
  {
    id: 'org-1',
    topic: 'organic_substances',
    type: 'multiple_choice',
    points: 10,
    prompt: 'สารอินทรีย์ข้อใดที่จัดเป็น "สารที่จำเป็นต่อการเจริญเติบโตของพืชโดยตรง" ทั้งหมด?',
    options: [
      'คาร์โบไฮเดรต โปรตีน ลิพิด',
      'คาเฟอีน แทนนิน ยางพารา',
      'นิโคติน ลิกนิน น้ำมันหอมระเหย',
      'ฟลาโวนอยด์ มอร์ฟีน กรดนิวคลีอิก',
    ],
    correctIndex: 0,
    explanation:
      'คาร์โบไฮเดรต โปรตีน ลิพิด และกรดนิวคลีอิก เป็นสารอินทรีย์หลักที่พืชใช้สร้างเซลล์ พลังงาน และดำรงชีวิตโดยตรง',
  },
  {
    id: 'org-2',
    topic: 'organic_substances',
    type: 'multiple_choice',
    points: 10,
    prompt: 'สารอินทรีย์ที่ให้ "รสฝาด" ในใบชา เปลือกมังคุด หรือกล้วยดิบ ช่วยป้องกันสัตว์มากิน จัดอยู่ในกลุ่มใด?',
    options: ['คาร์โบไฮเดรต', 'แทนนิน (กลุ่มฟีนอลิก)', 'กรดนิวคลีอิก', 'ไขมันและน้ำมัน'],
    correctIndex: 1,
    explanation:
      'แทนนินเป็นสารประกอบฟีนอลิก (ไม่จำเป็นต่อการเจริญเติบโตโดยตรง) มีรสฝาด ช่วยป้องกันศัตรูพืชและเชื้อรา',
  },
  {
    id: 'org-3',
    topic: 'organic_substances',
    type: 'multiple_choice',
    points: 10,
    prompt: 'น้ำยางพารา น้ำมันตะไคร้หอม และรงควัตถุแคโรทีนอยด์ จัดเป็นสารอินทรีย์กลุ่มใดในพืช?',
    options: ['โปรตีน', 'กรดนิวคลีอิก', 'เทอร์พีน / เทอร์พีนอยด์', 'แอลคาลอยด์'],
    correctIndex: 2,
    explanation:
      'เทอร์พีน (Terpenes) มักไม่ละลายน้ำ เช่น น้ำมันหอมระเหย ยางพารา และแคโรทีนอยด์ที่ให้สีเหลืองส้มแก่ดอกไม้หรือผลไม้',
  },
  {
    id: 'org-4',
    topic: 'organic_substances',
    type: 'true_false',
    points: 10,
    prompt: 'ถูกหรือผิด: "เซลลูโลส" ซึ่งเป็นส่วนประกอบหลักของผนังเซลล์พืช เป็นสารอินทรีย์กลุ่มคาร์โบไฮเดรตที่จำเป็นต่อการเจริญเติบโตโดยตรง',
    correctAnswer: true,
    explanation:
      'ถูกต้อง! เซลลูโลสเป็นพอลิแซ็กคาไรด์ (คาร์โบไฮเดรต) ที่ใช้สร้างผนังเซลล์พืช จึงจำเป็นต่อโครงสร้างและการเจริญเติบโตโดยตรง',
  },
  {
    id: 'org-5',
    topic: 'organic_substances',
    type: 'true_false',
    points: 10,
    prompt: 'ถูกหรือผิด: สารอินทรีย์ที่ไม่จำเป็นต่อการเจริญเติบโตโดยตรง เช่น คาเฟอีน หรือน้ำมันหอมระเหย ไม่มีประโยชน์ใด ๆ ต่อต้นพืชเลย',
    correctAnswer: false,
    explanation:
      'ผิด! แม้ไม่จำเป็นต่อการสร้างเซลล์โดยตรง แต่สารเหล่านี้มีประโยชน์มาก เช่น ป้องกันแมลงศัตรูพืช หรือส่งกลิ่นและสีดึงดูดแมลงมาช่วยผสมเกสร',
  },
  {
    id: 'org-6',
    topic: 'organic_substances',
    type: 'multiple_choice',
    points: 10,
    prompt: 'สารใดต่อไปนี้จัดอยู่ในกลุ่ม "แอลคาลอยด์ (Alkaloid)" ที่มีธาตุไนโตรเจนเป็นองค์ประกอบ?',
    options: ['น้ำตาลซูโครสและแป้ง', 'คาเฟอีนและนิโคติน', 'ลิกนินและเพกทิน', 'น้ำมันปาล์มและขี้ผึ้ง'],
    correctIndex: 1,
    explanation:
      'คาเฟอีน (ในกาแฟ/ชา) นิโคติน (ในยาสูบ) และมอร์ฟีน ล้วนเป็นสารกลุ่มแอลคาลอยด์ที่มีรสขมหรือมีฤทธิ์ต่อระบบประสาทของสัตว์กินพืช',
  },
  {
    id: 'org-7',
    topic: 'organic_substances',
    type: 'multiple_choice',
    points: 10,
    prompt: 'รงควัตถุ "แอนโทไซยานิน" ที่ทำให้ดอกอัญชันมีสีน้ำเงินม่วง และช่วยดึงดูดแมลงผสมเกสร จัดเป็นสารกลุ่มใด?',
    options: ['ฟีนอลิก (ฟลาโวนอยด์)', 'คาร์โบไฮเดรต', 'กรดอะมิโน', 'ลิพิด'],
    correctIndex: 0,
    explanation:
      'แอนโทไซยานินเป็นสารกลุ่มฟลาโวนอยด์ ซึ่งเป็นส่วนหนึ่งของสารประกอบฟีนอลิก ช่วยให้สีสันสดใสแก่ดอกและผลเพื่อดึงดูดแมลง',
  },
  {
    id: 'org-8',
    topic: 'organic_substances',
    type: 'bonus',
    points: 20,
    prompt: 'คำถามโบนัส! พืชลำเลียงน้ำตาลในท่อโฟลเอ็ม (Phloem) ในรูปใดเป็นหลัก และสะสมพลังงานไว้ในหัวมันหรือเมล็ดในรูปใด?',
    options: [
      'ลำเลียงในรูปซูโครส และสะสมในรูปแป้ง',
      'ลำเลียงในรูปแป้ง และสะสมในรูปเซลลูโลส',
      'ลำเลียงในรูปกลูโคส และสะสมในรูปโปรตีน',
      'ลำเลียงในรูปฟรักโทส และสะสมในรูปลิกนิน',
    ],
    correctIndex: 0,
    explanation:
      'พืชลำเลียงน้ำตาลผ่านท่อโฟลเอ็มในรูป "ซูโครส" และมักเก็บสะสมคาร์โบไฮเดรตสำรองไว้ในรูป "แป้ง"',
  },
  {
    id: 'org-9',
    topic: 'organic_substances',
    type: 'special_mission',
    points: 15,
    missionMode: 'classify',
    prompt: 'ภารกิจพิเศษ! แยกสารอินทรีย์ทั้ง 3 ชนิดนี้ให้ถูกกลุ่มว่าจำเป็นหรือไม่จำเป็นต่อการเจริญเติบโตโดยตรง',
    buckets: ['จำเป็นต่อการเจริญเติบโตโดยตรง', 'ไม่จำเป็นต่อการเจริญเติบโตโดยตรง'],
    items: [
      { id: 'i1', label: 'โปรตีน (สร้างเอนไซม์ในเซลล์)', correctBucketIndex: 0 },
      { id: 'i2', label: 'น้ำมันหอมระเหยในใบมะกรูด', correctBucketIndex: 1 },
      { id: 'i3', label: 'กรดนิวคลีอิก (DNA และ RNA)', correctBucketIndex: 0 },
    ],
    explanation:
      'โปรตีนและกรดนิวคลีอิกจำเป็นต่อการทำงานของเซลล์โดยตรง ส่วนน้ำมันหอมระเหยเป็นเทอร์พีนที่ช่วยส่งกลิ่นไล่แมลงหรือดึงดูดแมลง',
  },
  {
    id: 'org-10',
    topic: 'organic_substances',
    type: 'special_mission',
    points: 15,
    missionMode: 'match',
    prompt: 'ภารกิจพิเศษ! จับคู่สารอินทรีย์ที่ไม่จำเป็นโดยตรงกับบทบาทหรือตัวอย่างให้ถูกต้องทั้ง 3 คู่',
    leftHeader: 'กลุ่มสารอินทรีย์',
    rightHeader: 'ตัวอย่าง / ลักษณะเด่น',
    pairs: [
      { id: 'p1', left: 'แอลคาลอยด์', right: 'คาเฟอีน นิโคติน ป้องกันสัตว์กินพืช' },
      { id: 'p2', left: 'เทอร์พีน', right: 'น้ำยางพาราและน้ำมันหอมระเหย' },
      { id: 'p3', left: 'ฟีนอลิก', right: 'แทนนินรสฝาดและสีแอนโทไซยานิน' },
    ],
    explanation:
      'แอลคาลอยด์มักมีฤทธิ์ต่อสัตว์ (คาเฟอีน/นิโคติน), เทอร์พีนพบในยางพาราและน้ำมันหอมระเหย, ฟีนอลิกพบในแทนนินและรงควัตถุแอนโทไซยานิน',
  },

  // =========================================================
  // หัวข้อ 2: ปัจจัยที่มีผลต่อการเจริญเติบโตของพืช (12 ข้อ)
  // =========================================================
  {
    id: 'gro-1',
    topic: 'growth_factors',
    type: 'multiple_choice',
    points: 10,
    prompt: 'ข้อใดเป็น "ปัจจัยภายนอก" ที่มีผลต่อการเจริญเติบโตของพืชทั้งหมด?',
    options: [
      'แสง น้ำ ธาตุอาหาร แก๊สคาร์บอนไดออกไซด์',
      'ออกซิน น้ำ อุณหภูมิ จิบเบอเรลลิน',
      'ไซโทไคนิน แสง พันธุกรรม เอทิลีน',
      'กรดแอบไซซิก ธาตุอาหาร ความชื้น',
    ],
    correctIndex: 0,
    explanation:
      'แสง น้ำ ธาตุอาหาร อุณหภูมิ และแก๊สต่าง ๆ เป็นปัจจัยภายนอก ส่วนฮอร์โมนพืช (ออกซิน ไซโทไคนิน ฯลฯ) และพันธุกรรม เป็นปัจจัยภายใน',
  },
  {
    id: 'gro-2',
    topic: 'growth_factors',
    type: 'multiple_choice',
    points: 10,
    prompt: 'หากต้องการบำรุงต้นไม้ให้ "ใบเขียวสด เจริญเติบโตทางลำต้นและใบได้ดี" ควรใส่ปุ๋ยที่มีธาตุอาหารหลักใดสูง?',
    options: ['ไนโตรเจน (N)', 'ฟอสฟอรัส (P)', 'โพแทสเซียม (K)', 'แคลเซียม (Ca)'],
    correctIndex: 0,
    explanation:
      'ไนโตรเจน (N) เป็นองค์ประกอบสำคัญของคลอโรฟิลล์และกรดอะมิโน จึงช่วยสร้างใบเขียวและเร่งการเจริญเติบโตของลำต้นและใบ',
  },
  {
    id: 'gro-3',
    topic: 'growth_factors',
    type: 'multiple_choice',
    points: 10,
    prompt: 'พืชดูดแก๊สใดเข้าไปใช้เป็นสารตั้งต้นในกระบวนการสังเคราะห์ด้วยแสงเพื่อสร้างน้ำตาล?',
    options: ['แก๊สออกซิเจน (O₂)', 'แก๊สคาร์บอนไดออกไซด์ (CO₂)', 'แก๊สไนโตรเจน (N₂)', 'แก๊สมีเทน (CH₄)'],
    correctIndex: 1,
    explanation:
      'พืชใช้แก๊สคาร์บอนไดออกไซด์ (CO₂) ร่วมกับน้ำและพลังงานแสงในการสังเคราะห์ด้วยแสง ส่วน O₂ ใช้ในการหายใจระดับเซลล์',
  },
  {
    id: 'gro-4',
    topic: 'growth_factors',
    type: 'true_false',
    points: 10,
    prompt: 'ถูกหรือผิด: รากพืชต้องการ "แก๊สออกซิเจน (O₂)" ในดินเพื่อใช้ในการหายใจระดับเซลล์ หากน้ำท่วมขังนานรากอาจเน่าตายได้',
    correctAnswer: true,
    explanation:
      'ถูกต้อง! เซลล์รากพืชต้องหายใจระดับเซลล์โดยใช้ออกซิเจนเพื่อสร้างพลังงาน ATP สำหรับดูดแร่ธาตุ หากดินแฉะขาดอากาศ รากจะตายได้',
  },
  {
    id: 'gro-5',
    topic: 'growth_factors',
    type: 'multiple_choice',
    points: 10,
    prompt: 'ฮอร์โมนพืชชนิดใดที่มีสถานะเป็น "แก๊ส" และนิยมใช้ในการบ่มผลไม้ เช่น กล้วย หรือมะม่วง ให้สุกเร็วขึ้น?',
    options: ['ออกซิน', 'ไซโทไคนิน', 'เอทิลีน', 'กรดแอบไซซิก'],
    correctIndex: 2,
    explanation:
      'เอทิลีน (Ethylene) เป็นฮอร์โมนพืชชนิดเดียวที่เป็นแก๊ส มีบทบาทสำคัญในการเร่งการสุกของผลไม้และการหลุดร่วงของใบ',
  },
  {
    id: 'gro-6',
    topic: 'growth_factors',
    type: 'multiple_choice',
    points: 10,
    prompt: 'ชาวสวนตัดแต่งกิ่ง "ยอดอ่อน" ของต้นชบาออก เพื่อให้แตกพุ่มและแตกกิ่งข้างมากขึ้น เป็นผลจากการลดฮอร์โมนใดที่ยอด?',
    options: ['ออกซิน (Auxin)', 'จิบเบอเรลลิน (Gibberellin)', 'เอทิลีน (Ethylene)', 'กรดแอบไซซิก (ABA)'],
    correctIndex: 0,
    explanation:
      'ปลายยอดสร้าง "ออกซิน" ที่คอยยับยั้งการเจริญของตาข้าง (Apical dominance) เมื่อตัดยอดออก ออกซินลดลง ตาข้างจึงแตกพุ่มได้ดี',
  },
  {
    id: 'gro-7',
    topic: 'growth_factors',
    type: 'multiple_choice',
    points: 10,
    prompt: 'ฮอร์โมนใดช่วยกระตุ้น "การงอกของเมล็ด" ยืดปล้องลำต้น และช่วยให้ช่อองุ่นผลใหญ่ไร้เมล็ด?',
    options: ['กรดแอบไซซิก', 'จิบเบอเรลลิน', 'เอทิลีน', 'ออกซิน'],
    correctIndex: 1,
    explanation:
      'จิบเบอเรลลิน (Gibberellin) กระตุ้นการยืดตัวของปล้อง ทำลายการพักตัวของเมล็ด และใช้ในการผลิตองุ่นไร้เมล็ดขนาดใหญ่',
  },
  {
    id: 'gro-8',
    topic: 'growth_factors',
    type: 'true_false',
    points: 10,
    prompt: 'ถูกหรือผิด: เมื่อพืชประสบภาวะขาดน้ำอย่างหนัก พืชจะสร้างฮอร์โมน "กรดแอบไซซิก (ABA)" เพิ่มขึ้นเพื่อกระตุ้นให้ปากใบปิด',
    correctAnswer: true,
    explanation:
      'ถูกต้อง! กรดแอบไซซิก (ABA) ช่วยให้พืชทนต่อความแห้งแล้งโดยกระตุ้นให้ปากใบปิด ลดการสูญเสียน้ำ และช่วยรักษาการพักตัวของเมล็ด',
  },
  {
    id: 'gro-9',
    topic: 'growth_factors',
    type: 'multiple_choice',
    points: 10,
    prompt: 'ฮอร์โมน "ไซโทไคนิน (Cytokinin)" มีหน้าที่เด่นในข้อใด?',
    options: [
      'กระตุ้นการแบ่งเซลล์ และชะลอการแก่ชราของใบ',
      'เร่งให้ใบไม้ร่วงหล่นในฤดูแล้ง',
      'ทำให้เมล็ดเข้าสู่ระยะพักตัวไม่ยอมงอก',
      'เร่งการสุกและเปลี่ยนสีของผลไม้',
    ],
    correctIndex: 0,
    explanation:
      'ไซโทไคนินสร้างมากที่ปลายราก มีหน้าที่กระตุ้นการแบ่งเซลล์ ส่งเสริมการแตกตาข้าง และช่วยชะลอความแก่ของใบและผักตัดดอก',
  },
  {
    id: 'gro-10',
    topic: 'growth_factors',
    type: 'bonus',
    points: 20,
    prompt: 'คำถามโบนัส! ในการเพาะเลี้ยงเนื้อเยื่อพืช หากต้องการชักนำให้แคลลัส (กลุ่มเซลล์) แตกเป็น "ยอด" จำนวนมาก ควรปรับสัดส่วนฮอร์โมนอย่างไร?',
    options: [
      'ไซโทไคนิน สูงกว่า ออกซิน',
      'ออกซิน สูงกว่า ไซโทไคนิน',
      'ใช้กรดแอบไซซิกอย่างเดียว',
      'ใช้แก๊สเอทิลีนความเข้มข้นสูง',
    ],
    correctIndex: 0,
    explanation:
      'สัดส่วนไซโทไคนิน > ออกซิน จะกระตุ้นการเกิดยอด (Shoot) แต่ถ้า ออกซิน > ไซโทไคนิน จะกระตุ้นการเกิดราก (Root)',
  },
  {
    id: 'gro-11',
    topic: 'growth_factors',
    type: 'special_mission',
    points: 15,
    missionMode: 'match',
    prompt: 'ภารกิจพิเศษ! จับคู่ฮอร์โมนพืชกับบทบาทเด่นในการเพาะปลูกให้ถูกต้องทั้ง 3 คู่',
    leftHeader: 'ฮอร์โมนพืช',
    rightHeader: 'หน้าที่ / การนำไปใช้',
    pairs: [
      { id: 'h1', left: 'ออกซิน', right: 'ชุบกิ่งปักชำเพื่อกระตุ้นการออกราก' },
      { id: 'h2', left: 'เอทิลีน', right: 'บ่มผลไม้ให้สุกและเร่งดอกสับปะรด' },
      { id: 'h3', left: 'กรดแอบไซซิก', right: 'ปิดปากใบเมื่อขาดน้ำและชะลอการงอก' },
    ],
    explanation:
      'ออกซินเร่งรากกิ่งตอน/กิ่งปักชำ, เอทิลีนเร่งผลสุก, และกรดแอบไซซิก (ABA) ควบคุมการปิดปากใบและระยะพักตัว',
  },
  {
    id: 'gro-12',
    topic: 'growth_factors',
    type: 'special_mission',
    points: 15,
    missionMode: 'classify',
    prompt: 'ภารกิจพิเศษ! แยกปัจจัยต่อไปนี้ว่าจัดเป็น "ปัจจัยภายนอก" หรือ "ปัจจัยภายใน" ของพืช',
    buckets: ['ปัจจัยภายนอก', 'ปัจจัยภายใน'],
    items: [
      { id: 'f1', label: 'ความเข้มแสงและช่วงแสง', correctBucketIndex: 0 },
      { id: 'f2', label: 'ฮอร์โมนจิบเบอเรลลิน', correctBucketIndex: 1 },
      { id: 'f3', label: 'ธาตุอาหาร N-P-K ในดิน', correctBucketIndex: 0 },
    ],
    explanation:
      'แสงและธาตุอาหารในดินมาจากสิ่งแวดล้อม (ปัจจัยภายนอก) ส่วนฮอร์โมนจิบเบอเรลลินพืชสร้างขึ้นเอง (ปัจจัยภายใน)',
  },

  // =========================================================
  // หัวข้อ 3: การตอบสนองของพืชต่อสิ่งเร้า (10 ข้อ)
  // =========================================================
  {
    id: 'res-1',
    topic: 'plant_responses',
    type: 'multiple_choice',
    points: 10,
    prompt: 'ต้นกล้าที่วางไว้ริมหน้าต่างเอนลำต้นโค้งเข้าหาแสงแดด การตอบสนองแบบนี้เรียกว่าอะไร?',
    options: [
      'Phototropism (การเบนเข้าหาแสง)',
      'Thigmonasty (การหุบเมื่อสัมผัส)',
      'Gravitropism (การตอบสนองต่อแรงโน้มถ่วง)',
      'Thermonasty (การบานตามอุณหภูมิ)',
    ],
    correctIndex: 0,
    explanation:
      'ลำต้นเบนเข้าหาทิศทางของแสง เรียกว่า Positive Phototropism เพราะออกซินสะสมด้านมืดมากกว่าด้านสว่าง ทำให้ด้านมืดยืดยาวกว่า',
  },
  {
    id: 'res-2',
    topic: 'plant_responses',
    type: 'multiple_choice',
    points: 10,
    prompt: 'เมื่อวางกระถางต้นไม้ตะแคงแนวนอน รากจะโค้งลงสู่พื้นดินเสมอ สิ่งเร้าหลักของการตอบสนองนี้คืออะไร?',
    options: ['แรงโน้มถ่วงของโลก', 'กระแสลม', 'การสัมผัสพื้นดิน', 'อุณหภูมิอากาศ'],
    correctIndex: 0,
    explanation:
      'รากพืชเจริญลงตามทิศทางแรงโน้มถ่วงของโลก เรียกว่า Positive Gravitropism ส่วนยอดพืชเจริญขึ้นต้านแรงโน้มถ่วง (Negative Gravitropism)',
  },
  {
    id: 'res-3',
    topic: 'plant_responses',
    type: 'multiple_choice',
    points: 10,
    prompt: 'มือเกาะ (Tendril) ของต้นตำลึงหรือบวบที่เลื้อยพันรอบหลักไม้ เป็นการตอบสนองชนิดใด?',
    options: [
      'Hydrotropism (ตอบสนองต่อน้ำ)',
      'Thigmotropism (ตอบสนองต่อการสัมผัสแบบมีทิศทาง)',
      'Photonasty (บานเมื่อมีแสง)',
      'Chemotropism (ตอบสนองต่อสารเคมี)',
    ],
    correctIndex: 1,
    explanation:
      'มือเกาะของไม้เลื้อยพันรอบสิ่งที่มาสัมผัส โดยมีทิศทางสัมพันธ์กับตำแหน่งที่สัมผัส จึงเรียกว่า Thigmotropism',
  },
  {
    id: 'res-4',
    topic: 'plant_responses',
    type: 'true_false',
    points: 10,
    prompt: 'ถูกหรือผิด: เมื่อเราเอามือไปแตะใบ "ไมยราบ" แล้วใบหุบลงทันที ถือเป็นการตอบสนองที่มีทิศทางสัมพันธ์กับทิศที่มือไปสัมผัส',
    correctAnswer: false,
    explanation:
      'ผิด! ไม่ว่าเราจะแตะจากด้านบน ด้านล่าง หรือด้านข้าง ใบไมยราบจะหุบเข้าในทิศทางเดิมเสมอ จึงจัดเป็นการตอบสนองแบบ "ไม่มีทิศทางสัมพันธ์กับสิ่งเร้า" (Thigmonasty)',
  },
  {
    id: 'res-5',
    topic: 'plant_responses',
    type: 'multiple_choice',
    points: 10,
    prompt: 'กลไกสำคัญที่ทำให้ใบไมยราบหุบลงอย่างรวดเร็วเมื่อถูกสัมผัส เกิดจากการเปลี่ยนแปลงใดที่โคนก้านใบ (พัลไวนัส)?',
    options: [
      'แรงดันเต่ง (Turgor pressure) ลดลงอย่างรวดเร็วเพราะน้ำไหลออก',
      'เซลล์แบ่งตัวเพิ่มขึ้นอย่างรวดเร็วทันที',
      'พืชสร้างแป้งมาอุดตันท่อลำเลียงน้ำ',
      'ปากใบเปิดกว้างขึ้นจนใบหนักและพับลง',
    ],
    correctIndex: 0,
    explanation:
      'การหุบของใบไมยราบเกิดจากไอออนและน้ำไหลออกจากเซลล์บริเวณโคนก้านใบ (Pulvinus) ทำให้แรงดันเต่งลดลง ใบจึงพับหุบอย่างรวดเร็ว',
  },
  {
    id: 'res-6',
    topic: 'plant_responses',
    type: 'true_false',
    points: 10,
    prompt: 'ถูกหรือผิด: การที่ต้นจามจุรี (ก้ามปู) และต้นกระถินหุบใบในเวลากลางคืน และกางใบในตอนเช้า เรียกว่า Nyctinasty (การหลับของพืช)',
    correctAnswer: true,
    explanation:
      'ถูกต้อง! Nyctinasty เป็นการตอบสนองแบบไม่มีทิศทางสัมพันธ์กับสิ่งเร้า โดยพืชหุบใบตอนกลางคืนและกางใบตอนกลางวันจากแรงดันเต่ง',
  },
  {
    id: 'res-7',
    topic: 'plant_responses',
    type: 'multiple_choice',
    points: 10,
    prompt: 'การงอกของ "หลอดเรณู" ลงไปตามก้านเกสรเพศเมียเพื่อเข้าสู่ออวุล จัดเป็นการตอบสนองต่อสิ่งเร้าใด?',
    options: [
      'สารเคมี (Chemotropism)',
      'เสียง (Sonotropism)',
      'อุณหภูมิ (Thermonasty)',
      'แสงแดด (Phototropism)',
    ],
    correctIndex: 0,
    explanation:
      'หลอดเรณูงอกเข้าหาออวุลโดยอาศัยสัญญาณสารเคมีจากออวุล เป็นตัวอย่างของ Chemotropism (มีทิศทางสัมพันธ์กับสิ่งเร้า)',
  },
  {
    id: 'res-8',
    topic: 'plant_responses',
    type: 'bonus',
    points: 20,
    prompt: 'คำถามโบนัส! ข้อใดต่อไปนี้เป็นการตอบสนองแบบ "ไม่มีทิศทางสัมพันธ์กับสิ่งเร้า (Nastic movement)" ทั้งหมด?',
    options: [
      'ต้นกาบหอยแครงงับแมลง และดอกทิวลิปบานเมื่ออุณหภูมิสูงขึ้น',
      'ยอดพืชเบนเข้าหาแสง และรากพืชงอกลงสู่ดิน',
      'เถาตำลึงพันหลัก และรากพืชชอนไชไปหาแหล่งน้ำ',
      'หลอดเรณูงอกเข้าสู่ออวุล และยอดต้นกล้าเอนเข้าหาหน้าต่าง',
    ],
    correctIndex: 0,
    explanation:
      'ต้นกาบหอยแครงงับแมลง (Thigmonasty) และดอกทิวลิปบานตามอุณหภูมิ (Thermonasty) มีทิศทางการเคลื่อนไหวคงที่ ไม่ขึ้นกับทิศของสิ่งเร้า',
  },
  {
    id: 'res-9',
    topic: 'plant_responses',
    type: 'special_mission',
    points: 15,
    missionMode: 'classify',
    prompt: 'ภารกิจพิเศษ! จัดกลุ่มการตอบสนองของพืชทั้ง 3 เหตุการณ์นี้ให้ถูกต้อง',
    buckets: ['มีทิศทางสัมพันธ์กับสิ่งเร้า', 'ไม่มีทิศทางสัมพันธ์กับสิ่งเร้า'],
    items: [
      { id: 'r1', label: 'รากพืชงอกเข้าหาบริเวณที่มีน้ำชื้น', correctBucketIndex: 0 },
      { id: 'r2', label: 'ใบไมยราบหุบเมื่อโดนนิ้วสัมผัส', correctBucketIndex: 1 },
      { id: 'r3', label: 'ดอกบัวบานตอนเช้าและหุบตอนเย็น', correctBucketIndex: 1 },
    ],
    explanation:
      'รากหาน้ำ (Hydrotropism) มีทิศทางมุ่งสู่แหล่งน้ำ ส่วนไมยราบหุบใบและดอกบัวหุบ-บานเป็นการเคลื่อนไหวที่มีทิศทางตายตัว (Nastic movement)',
  },
  {
    id: 'res-10',
    topic: 'plant_responses',
    type: 'special_mission',
    points: 15,
    missionMode: 'match',
    prompt: 'ภารกิจพิเศษ! จับคู่ตัวอย่างพฤติกรรมพืชกับชื่อการตอบสนองให้ถูกต้องทั้ง 3 คู่',
    leftHeader: 'พฤติกรรมของพืช',
    rightHeader: 'รูปแบบการตอบสนอง',
    pairs: [
      { id: 'm1', left: 'ยอดทานตะวันหันเข้าหาดวงอาทิตย์', right: 'Phototropism' },
      { id: 'm2', left: 'มือเกาะตำลึงพันรอบกิ่งไม้', right: 'Thigmotropism' },
      { id: 'm3', left: 'ต้นกาบหอยแครงหุบใบจับแมลง', right: 'Thigmonasty' },
    ],
    explanation:
      'เข้าหาแสง = Phototropism, พันหลักเมื่อสัมผัสแบบมีทิศทาง = Thigmotropism, และงับแมลงแบบทิศทางคงที่ = Thigmonasty',
  },
];

function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Builds a randomized, well-paced deck of questions for a game session.
 * Guarantees a balanced mix of 4-choice, True/False, Special Missions (+15), and Bonus (+20) questions.
 */
export function buildGameDeck(
  totalQuestions: number,
  topicFilter: TopicId | 'all'
): GameQuestion[] {
  const pool =
    topicFilter === 'all'
      ? QUESTION_BANK
      : QUESTION_BANK.filter((q) => q.topic === topicFilter);

  const regular = shuffleArray(
    pool.filter((q) => q.type === 'multiple_choice' || q.type === 'true_false')
  );
  const specials = shuffleArray(pool.filter((q) => q.type === 'special_mission'));
  const bonuses = shuffleArray(pool.filter((q) => q.type === 'bonus'));

  // When filtering a single topic (10-12 questions), repeat/supplement cleanly if user selected 20+ or cap naturally
  if (topicFilter !== 'all') {
    const combined = shuffleArray([...regular, ...specials, ...bonuses]);
    if (combined.length >= totalQuestions) {
      return combined.slice(0, totalQuestions);
    }
    // If single topic has fewer than totalQuestions, fill remaining from all topics so every game stays 20-30 questions
    const remainingNeeded = totalQuestions - combined.length;
    const otherPool = shuffleArray(QUESTION_BANK.filter((q) => q.topic !== topicFilter));
    return [...combined, ...otherPool.slice(0, remainingNeeded)];
  }

  // Full deck mode (32 questions total): pick balanced counts
  const targetSpecialCount = totalQuestions >= 25 ? 5 : 4;
  const targetBonusCount = totalQuestions >= 25 ? 3 : 3;
  const targetRegularCount = Math.max(0, totalQuestions - targetSpecialCount - targetBonusCount);

  const chosenSpecials = specials.slice(0, targetSpecialCount);
  const chosenBonuses = bonuses.slice(0, targetBonusCount);
  const chosenRegular = regular.slice(0, targetRegularCount);

  // Interleave special & bonus questions smoothly throughout the game rather than clumping them
  const deck: GameQuestion[] = [...chosenRegular];
  const exciting = shuffleArray([...chosenSpecials, ...chosenBonuses]);

  exciting.forEach((item, idx) => {
    const step = Math.max(2, Math.floor(deck.length / (exciting.length + 1)));
    const insertAt = Math.min(deck.length, (idx + 1) * step + idx);
    deck.splice(insertAt, 0, item);
  });

  return deck.slice(0, totalQuestions);
}
