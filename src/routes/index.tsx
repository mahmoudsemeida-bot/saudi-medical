import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'
import { departments, doctors, reviews, stats } from '../data/mock'
import { Star, ArrowLeft, Phone, CheckCircle, Award, Users, Clock, Calendar } from 'lucide-react'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend, Filler)

export const Route = createFileRoute('/')({
  component: HomePage,
})

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={14} className={s <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
      ))}
    </div>
  )
}

function HomePage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const chartData = {
    labels: stats.monthlyData.labels,
    datasets: [
      {
        label: 'المرضى',
        data: stats.monthlyData.patients,
        backgroundColor: 'rgba(229, 62, 62, 0.7)',
        borderRadius: 6,
      },
    ],
  }

  const appointmentsData = {
    labels: stats.monthlyData.labels,
    datasets: [
      {
        label: 'المواعيد',
        data: stats.monthlyData.appointments,
        borderColor: '#E53E3E',
        backgroundColor: 'rgba(229, 62, 62, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#E53E3E',
      },
    ],
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg text-white py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                مجمع طبي متكامل | رعاية على مدار الساعة
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black mb-6 leading-tight">
                صحتك
                <span className="block text-red-300">أولويتنا الأولى</span>
              </h1>
              <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-lg">
                مجمع الشفاء الطبي يقدم رعاية صحية شاملة بأحدث التقنيات الطبية وأكفأ الكوادر المتخصصة في جميع المجالات الطبية.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/booking"
                  className="btn-primary px-8 py-4 rounded-2xl text-lg font-bold flex items-center gap-2"
                >
                  <Calendar size={20} />
                  احجز موعدك الآن
                </Link>
                <a
                  href="https://wa.me/966500000000?text=مرحبا، أود الاستفسار عن خدمات المجمع الطبي"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-btn px-8 py-4 rounded-2xl text-lg font-bold flex items-center gap-2"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  واتساب
                </a>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 animate-fade-in-up delay-200">
              {[
                { icon: Users, value: '12,450+', label: 'مريض تم علاجه' },
                { icon: Award, value: '18', label: 'طبيب متخصص' },
                { icon: CheckCircle, value: '97%', label: 'نسبة الرضا' },
                { icon: Clock, value: '24/7', label: 'خدمة متواصلة' },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="glass rounded-2xl p-5 text-center card-hover">
                  <Icon size={32} className="text-red-400 mx-auto mb-2" />
                  <div className="text-3xl font-black text-white mb-1">{value}</div>
                  <div className="text-sm text-gray-300">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-red-600 font-semibold text-sm uppercase tracking-widest">أقسامنا الطبية</span>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mt-2 mb-4">
              تخصصات طبية شاملة
            </h2>
            <div className="section-divider mx-auto" />
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              نقدم رعاية طبية متكاملة عبر أقسام متخصصة بكادر طبي من الأطباء والاستشاريين ذوي الخبرة
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <Link
                key={dept.id}
                to="/departments/$slug"
                params={{ slug: dept.slug }}
                className="block bg-white border border-gray-100 rounded-2xl p-6 card-hover group shadow-sm hover:shadow-red-100"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: `${dept.color}15` }}
                >
                  {dept.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {dept.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{dept.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{dept.doctorCount} أطباء</span>
                  <span className="text-red-500 group-hover:translate-x-[-4px] transition-transform flex items-center gap-1 text-sm font-medium">
                    عرض التفاصيل <ArrowLeft size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Charts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-red-600 font-semibold text-sm uppercase tracking-widest">إحصائياتنا</span>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mt-2 mb-4">أرقام تتحدث عن نفسها</h2>
            <div className="section-divider mx-auto" />
          </div>
          {mounted && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">عدد المرضى شهرياً</h3>
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true } },
                  }}
                />
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">المواعيد شهرياً</h3>
                <Line
                  data={appointmentsData}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true } },
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Top Doctors */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="text-red-600 font-semibold text-sm uppercase tracking-widest">فريق طبي</span>
              <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mt-2 mb-2">نخبة أطبائنا</h2>
              <div className="section-divider" />
            </div>
            <Link to="/doctors" className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1 text-sm">
              عرض الكل <ArrowLeft size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.slice(0, 6).map((doc) => (
              <div key={doc.id} className="bg-white border border-gray-100 rounded-2xl p-6 card-hover shadow-sm text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border-4 border-white shadow-md">
                  👨‍⚕️
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{doc.name}</h3>
                <p className="text-red-600 text-sm mb-2">{doc.specialty}</p>
                <div className="flex items-center justify-center gap-1 mb-3">
                  <StarRating rating={doc.rating} />
                  <span className="text-xs text-gray-500">({doc.reviewCount})</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">{doc.experience} سنوات خبرة</p>
                <Link
                  to="/booking"
                  className="btn-primary w-full py-2 rounded-xl text-sm font-semibold block"
                >
                  احجز موعداً
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="text-red-600 font-semibold text-sm uppercase tracking-widest">آراء المرضى</span>
              <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mt-2 mb-2">ماذا يقول مرضانا</h2>
              <div className="section-divider" />
            </div>
            <Link to="/reviews" className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1 text-sm">
              كل التقييمات <ArrowLeft size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="bg-white rounded-2xl p-6 shadow-sm border border-red-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                    {review.patientName[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{review.patientName}</div>
                    <div className="text-xs text-gray-500">{review.doctorName}</div>
                  </div>
                  <div className="mr-auto">
                    <StarRating rating={review.rating} />
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="hero-bg py-16 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl lg:text-4xl font-black mb-4">هل تحتاج إلى رعاية طبية؟</h2>
          <p className="text-gray-200 text-lg mb-8">
            فريقنا الطبي جاهز لمساعدتك على مدار الساعة. احجز موعدك الآن أو تواصل معنا عبر واتساب
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/booking" className="btn-primary px-8 py-4 rounded-2xl font-bold text-lg">
              احجز موعداً مجانياً
            </Link>
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              واتساب الآن
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
