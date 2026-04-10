export interface Doctor {
  id: string
  name: string
  specialty: string
  specialtySlug: string
  rating: number
  reviewCount: number
  experience: number
  image: string
  about: string
  schedule: { day: string; from: string; to: string }[]
  available: boolean
  phone: string
}

export interface Department {
  id: string
  slug: string
  name: string
  icon: string
  description: string
  longDescription: string
  services: string[]
  color: string
  doctorCount: number
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  specialty: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
}

export interface Review {
  id: string
  patientName: string
  doctorName: string
  specialty: string
  rating: number
  comment: string
  date: string
  helpful: number
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: 'male' | 'female'
  bloodType?: string
  role: 'patient' | 'admin' | 'doctor'
}

export const departments: Department[] = [
  {
    id: '1',
    slug: 'internal-medicine',
    name: 'الطب الباطني',
    icon: '🩺',
    description: 'رعاية شاملة لأمراض الجهاز الهضمي والقلب والرئتين',
    longDescription:
      'قسم الطب الباطني يقدم خدمات تشخيصية وعلاجية شاملة لمختلف الأمراض الداخلية. يضم نخبة من أطباء الاستشاريين ذوي الخبرة العالية في تشخيص وعلاج أمراض القلب والأوعية الدموية والجهاز الهضمي وأمراض الغدد الصماء والروماتيزم.',
    services: ['فحص القلب والأوعية الدموية', 'علاج أمراض الجهاز الهضمي', 'الغدد الصماء والسكري', 'أمراض الكلى', 'الروماتيزم والمفاصل'],
    color: '#E53E3E',
    doctorCount: 4,
  },
  {
    id: '2',
    slug: 'dentistry',
    name: 'طب الأسنان',
    icon: '🦷',
    description: 'خدمات متكاملة لصحة الفم والأسنان وتجميل الابتسامة',
    longDescription:
      'قسم طب الأسنان يوفر رعاية شاملة لصحة الفم والأسنان باستخدام أحدث التقنيات. من الحشوات والتركيبات إلى زراعة الأسنان والتقويم وتجميل الابتسامة.',
    services: ['تنظيف الأسنان', 'الحشوات التجميلية', 'تقويم الأسنان', 'زراعة الأسنان', 'تبييض الأسنان', 'علاج اللثة'],
    color: '#3182CE',
    doctorCount: 3,
  },
  {
    id: '3',
    slug: 'pediatrics',
    name: 'طب الأطفال',
    icon: '👶',
    description: 'رعاية صحية متخصصة للأطفال من الولادة حتى المراهقة',
    longDescription:
      'قسم طب الأطفال يهتم بصحة الأطفال من الولادة حتى سن الثامنة عشرة. يقدم القسم خدمات الرعاية الأولية والتطعيمات والمتابعة الدورية وعلاج الأمراض.',
    services: ['الرعاية الأولية للأطفال', 'التطعيمات والمناعة', 'متابعة النمو والتطور', 'علاج الأمراض الحادة', 'الرعاية الحديثية'],
    color: '#38A169',
    doctorCount: 3,
  },
  {
    id: '4',
    slug: 'orthopedics',
    name: 'جراحة العظام',
    icon: '🦴',
    description: 'علاج إصابات العظام والمفاصل والعمود الفقري',
    longDescription:
      'قسم جراحة العظام والمفاصل يختص بتشخيص وعلاج أمراض وإصابات الجهاز الحركي. يضم جراحين متخصصين في استبدال المفاصل وجراحة العمود الفقري وعلاج الكسور.',
    services: ['جراحة استبدال المفاصل', 'علاج الكسور', 'جراحة العمود الفقري', 'علاج آلام المفاصل', 'إصابات الرياضة'],
    color: '#D69E2E',
    doctorCount: 3,
  },
  {
    id: '5',
    slug: 'dermatology',
    name: 'طب الجلدية',
    icon: '🧴',
    description: 'تشخيص وعلاج أمراض الجلد والشعر والأظافر',
    longDescription:
      'قسم الجلدية والتجميل يقدم خدمات شاملة لأمراض الجلد والتجميل الطبي. يضم متخصصين في علاج حالات الجلد المزمنة والحادة وإجراء العمليات التجميلية.',
    services: ['علاج حب الشباب', 'أمراض الجلد المزمنة', 'ليزر الجلد', 'التجميل الطبي', 'علاج البهاق والصدفية'],
    color: '#805AD5',
    doctorCount: 2,
  },
  {
    id: '6',
    slug: 'radiology',
    name: 'الأشعة التشخيصية',
    icon: '🩻',
    description: 'تصوير طبي متقدم بأحدث الأجهزة التشخيصية',
    longDescription:
      'قسم الأشعة التشخيصية مجهز بأحدث أجهزة التصوير الطبي. يقدم خدمات الأشعة السينية والأشعة المقطعية والرنين المغناطيسي والموجات فوق الصوتية.',
    services: ['الأشعة السينية', 'الأشعة المقطعية CT', 'الرنين المغناطيسي MRI', 'الموجات فوق الصوتية', 'تصوير الثدي'],
    color: '#2B6CB0',
    doctorCount: 2,
  },
]

export const doctors: Doctor[] = [
  {
    id: 'd1',
    name: 'د. أحمد محمد الزهراني',
    specialty: 'الطب الباطني',
    specialtySlug: 'internal-medicine',
    rating: 4.9,
    reviewCount: 128,
    experience: 15,
    image: '',
    about: 'استشاري الطب الباطني وأمراض القلب، حاصل على البورد الأمريكي. خبرة واسعة في علاج أمراض القلب والأوعية الدموية.',
    schedule: [
      { day: 'الأحد', from: '09:00', to: '13:00' },
      { day: 'الثلاثاء', from: '09:00', to: '13:00' },
      { day: 'الخميس', from: '16:00', to: '20:00' },
    ],
    available: true,
    phone: '+966501234567',
  },
  {
    id: 'd2',
    name: 'د. سارة عبدالله الحربي',
    specialty: 'الطب الباطني',
    specialtySlug: 'internal-medicine',
    rating: 4.8,
    reviewCount: 95,
    experience: 12,
    image: '',
    about: 'استشارية الطب الباطني وأمراض الغدد الصماء والسكري. متخصصة في علاج مرض السكري وأمراض الغدة الدرقية.',
    schedule: [
      { day: 'الاثنين', from: '10:00', to: '14:00' },
      { day: 'الأربعاء', from: '10:00', to: '14:00' },
      { day: 'السبت', from: '09:00', to: '13:00' },
    ],
    available: true,
    phone: '+966502345678',
  },
  {
    id: 'd3',
    name: 'د. خالد إبراهيم العتيبي',
    specialty: 'طب الأسنان',
    specialtySlug: 'dentistry',
    rating: 4.9,
    reviewCount: 112,
    experience: 10,
    image: '',
    about: 'متخصص في تجميل الأسنان وزراعتها. حاصل على شهادة الزمالة في طب الأسنان التجميلي من المملكة المتحدة.',
    schedule: [
      { day: 'الأحد', from: '14:00', to: '20:00' },
      { day: 'الثلاثاء', from: '14:00', to: '20:00' },
      { day: 'الأربعاء', from: '09:00', to: '13:00' },
    ],
    available: true,
    phone: '+966503456789',
  },
  {
    id: 'd4',
    name: 'د. منى عبدالرحمن القحطاني',
    specialty: 'طب الأسنان',
    specialtySlug: 'dentistry',
    rating: 4.7,
    reviewCount: 87,
    experience: 8,
    image: '',
    about: 'متخصصة في تقويم الأسنان وعلاج اللثة. حاصلة على الماجستير في تقويم الأسنان.',
    schedule: [
      { day: 'الاثنين', from: '09:00', to: '13:00' },
      { day: 'الخميس', from: '09:00', to: '13:00' },
      { day: 'السبت', from: '14:00', to: '18:00' },
    ],
    available: true,
    phone: '+966504567890',
  },
  {
    id: 'd5',
    name: 'د. فيصل محمد الدوسري',
    specialty: 'طب الأطفال',
    specialtySlug: 'pediatrics',
    rating: 4.9,
    reviewCount: 203,
    experience: 18,
    image: '',
    about: 'استشاري طب الأطفال وحديثي الولادة. خبرة واسعة في رعاية الأطفال المبتسرين وأمراض الأطفال الحديثة.',
    schedule: [
      { day: 'الأحد', from: '09:00', to: '13:00' },
      { day: 'الاثنين', from: '16:00', to: '20:00' },
      { day: 'الأربعاء', from: '09:00', to: '13:00' },
      { day: 'الخميس', from: '16:00', to: '20:00' },
    ],
    available: true,
    phone: '+966505678901',
  },
  {
    id: 'd6',
    name: 'د. نورة سعد الشمري',
    specialty: 'طب الأطفال',
    specialtySlug: 'pediatrics',
    rating: 4.8,
    reviewCount: 156,
    experience: 11,
    image: '',
    about: 'استشارية طب الأطفال. متخصصة في أمراض الجهاز التنفسي لدى الأطفال والحساسية.',
    schedule: [
      { day: 'الثلاثاء', from: '09:00', to: '13:00' },
      { day: 'الخميس', from: '09:00', to: '13:00' },
      { day: 'السبت', from: '10:00', to: '14:00' },
    ],
    available: true,
    phone: '+966506789012',
  },
  {
    id: 'd7',
    name: 'د. عمر عبدالله المطيري',
    specialty: 'جراحة العظام',
    specialtySlug: 'orthopedics',
    rating: 4.8,
    reviewCount: 74,
    experience: 14,
    image: '',
    about: 'استشاري جراحة العظام والمفاصل. متخصص في جراحة استبدال مفصل الركبة والورك.',
    schedule: [
      { day: 'الأحد', from: '16:00', to: '20:00' },
      { day: 'الثلاثاء', from: '16:00', to: '20:00' },
      { day: 'الأربعاء', from: '16:00', to: '20:00' },
    ],
    available: true,
    phone: '+966507890123',
  },
  {
    id: 'd8',
    name: 'د. ريم محمد الغامدي',
    specialty: 'طب الجلدية',
    specialtySlug: 'dermatology',
    rating: 4.9,
    reviewCount: 189,
    experience: 9,
    image: '',
    about: 'استشارية الجلدية والتجميل الطبي. متخصصة في علاج حب الشباب وتجديد شباب البشرة بالليزر.',
    schedule: [
      { day: 'الاثنين', from: '14:00', to: '20:00' },
      { day: 'الأربعاء', from: '14:00', to: '20:00' },
      { day: 'الجمعة', from: '10:00', to: '14:00' },
    ],
    available: true,
    phone: '+966508901234',
  },
  {
    id: 'd9',
    name: 'د. وليد حسن العسيري',
    specialty: 'الأشعة التشخيصية',
    specialtySlug: 'radiology',
    rating: 4.7,
    reviewCount: 62,
    experience: 13,
    image: '',
    about: 'استشاري الأشعة التشخيصية والتدخلية. متخصص في التصوير بالرنين المغناطيسي وأشعة الأوعية.',
    schedule: [
      { day: 'الأحد', from: '08:00', to: '16:00' },
      { day: 'الثلاثاء', from: '08:00', to: '16:00' },
      { day: 'الخميس', from: '08:00', to: '12:00' },
    ],
    available: true,
    phone: '+966509012345',
  },
]

export const appointments: Appointment[] = [
  {
    id: 'a1',
    patientId: 'u1',
    patientName: 'محمد علي السهلي',
    doctorId: 'd1',
    doctorName: 'د. أحمد محمد الزهراني',
    specialty: 'الطب الباطني',
    date: '2026-04-15',
    time: '10:00',
    status: 'confirmed',
    notes: 'مراجعة دورية',
  },
  {
    id: 'a2',
    patientId: 'u2',
    patientName: 'فاطمة عبدالله الحمدان',
    doctorId: 'd5',
    doctorName: 'د. فيصل محمد الدوسري',
    specialty: 'طب الأطفال',
    date: '2026-04-16',
    time: '09:30',
    status: 'pending',
  },
  {
    id: 'a3',
    patientId: 'u3',
    patientName: 'عبدالرحمن سعد النومي',
    doctorId: 'd3',
    doctorName: 'د. خالد إبراهيم العتيبي',
    specialty: 'طب الأسنان',
    date: '2026-04-12',
    time: '14:00',
    status: 'completed',
  },
  {
    id: 'a4',
    patientId: 'u1',
    patientName: 'محمد علي السهلي',
    doctorId: 'd8',
    doctorName: 'د. ريم محمد الغامدي',
    specialty: 'طب الجلدية',
    date: '2026-04-18',
    time: '16:00',
    status: 'confirmed',
  },
  {
    id: 'a5',
    patientId: 'u4',
    patientName: 'هند محمد الزيد',
    doctorId: 'd7',
    doctorName: 'د. عمر عبدالله المطيري',
    specialty: 'جراحة العظام',
    date: '2026-04-20',
    time: '17:00',
    status: 'pending',
  },
]

export const reviews: Review[] = [
  {
    id: 'r1',
    patientName: 'محمد أحمد',
    doctorName: 'د. فيصل محمد الدوسري',
    specialty: 'طب الأطفال',
    rating: 5,
    comment: 'طبيب ممتاز ومتعاون، أولادي يحبونه كثيراً. يشرح الحالة بوضوح ويأخذ وقته مع كل مريض. أنصح به بشدة.',
    date: '2026-03-15',
    helpful: 24,
  },
  {
    id: 'r2',
    patientName: 'سلمى عبدالله',
    doctorName: 'د. ريم محمد الغامدي',
    specialty: 'طب الجلدية',
    rating: 5,
    comment: 'الدكتورة ريم خبيرة في مجالها. العلاج الذي وصفته أحدث فرقاً كبيراً في بشرتي خلال أسابيع قليلة.',
    date: '2026-03-20',
    helpful: 31,
  },
  {
    id: 'r3',
    patientName: 'أحمد الغامدي',
    doctorName: 'د. خالد إبراهيم العتيبي',
    specialty: 'طب الأسنان',
    rating: 5,
    comment: 'تجربة زراعة الأسنان مع الدكتور خالد كانت رائعة. النتيجة مذهلة والمتابعة ممتازة.',
    date: '2026-03-25',
    helpful: 18,
  },
  {
    id: 'r4',
    patientName: 'نوال المطيري',
    doctorName: 'د. سارة عبدالله الحربي',
    specialty: 'الطب الباطني',
    rating: 4,
    comment: 'دكتورة محترمة ومتمكنة. إدارة حالة السكري تحسنت كثيراً بعد متابعتها.',
    date: '2026-04-01',
    helpful: 15,
  },
  {
    id: 'r5',
    patientName: 'عبدالعزيز السلمي',
    doctorName: 'د. عمر عبدالله المطيري',
    specialty: 'جراحة العظام',
    rating: 5,
    comment: 'بعد عملية الركبة، عدت للمشي بشكل طبيعي. الدكتور عمر جراح ماهر جداً والفريق الطبي رائع.',
    date: '2026-04-05',
    helpful: 28,
  },
  {
    id: 'r6',
    patientName: 'منى الحربي',
    doctorName: 'د. نورة سعد الشمري',
    specialty: 'طب الأطفال',
    rating: 5,
    comment: 'الدكتورة نورة صبورة جداً مع الأطفال. ابنتي كانت خائفة لكنها استطاعت أن تكسب ثقتها بسرعة.',
    date: '2026-04-08',
    helpful: 22,
  },
]

export const users: User[] = [
  {
    id: 'u1',
    name: 'محمد علي السهلي',
    email: 'mohammed@example.com',
    phone: '+966501111111',
    dateOfBirth: '1985-06-15',
    gender: 'male',
    bloodType: 'A+',
    role: 'patient',
  },
  {
    id: 'u2',
    name: 'فاطمة عبدالله الحمدان',
    email: 'fatima@example.com',
    phone: '+966502222222',
    dateOfBirth: '1990-03-22',
    gender: 'female',
    bloodType: 'O+',
    role: 'patient',
  },
  {
    id: 'u3',
    name: 'عبدالرحمن سعد النومي',
    email: 'abdulrahman@example.com',
    phone: '+966503333333',
    dateOfBirth: '1978-11-08',
    gender: 'male',
    bloodType: 'B+',
    role: 'patient',
  },
  {
    id: 'admin1',
    name: 'مدير النظام',
    email: 'admin@alshifa.com',
    phone: '+966500000001',
    dateOfBirth: '1980-01-01',
    gender: 'male',
    role: 'admin',
  },
]

export const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30',
]

export const stats = {
  totalPatients: 12450,
  totalDoctors: 18,
  totalAppointments: 3280,
  satisfactionRate: 97,
  monthlyData: {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    patients: [980, 1120, 1050, 1340, 1280, 1450],
    appointments: [420, 510, 480, 620, 590, 680],
    revenue: [125000, 142000, 138000, 168000, 155000, 185000],
  },
  departmentStats: {
    labels: ['الباطنية', 'الأسنان', 'الأطفال', 'العظام', 'الجلدية', 'الأشعة'],
    data: [35, 20, 25, 10, 7, 3],
  },
}
