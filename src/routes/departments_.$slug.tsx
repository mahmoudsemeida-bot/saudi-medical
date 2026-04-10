import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { departments, doctors } from '../data/mock'
import { CheckCircle, Clock, Calendar, Star, Phone, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/departments/$slug')({
  component: DepartmentDetailPage,
  loader: ({ params }) => {
    const dept = departments.find((d) => d.slug === params.slug)
    if (!dept) throw notFound()
    return dept
  },
})

function DepartmentDetailPage() {
  const dept = Route.useLoaderData()
  const deptDoctors = doctors.filter((d) => d.specialtySlug === dept.slug)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="hero-bg py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
            <Link to="/" className="hover:text-white">الرئيسية</Link>
            <ArrowRight size={14} className="rotate-180" />
            <Link to="/departments" className="hover:text-white">الأقسام</Link>
            <ArrowRight size={14} className="rotate-180" />
            <span>{dept.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            >
              {dept.icon}
            </div>
            <div>
              <h1 className="text-4xl font-black mb-2">{dept.name}</h1>
              <p className="text-gray-200 text-lg">{dept.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">عن القسم</h2>
              <p className="text-gray-600 leading-relaxed">{dept.longDescription}</p>
            </div>

            {/* Services */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">الخدمات المقدمة</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {dept.services.map((service) => (
                  <div key={service} className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
                    <CheckCircle size={18} className="text-red-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Doctors */}
            {deptDoctors.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">أطباء القسم</h2>
                <div className="space-y-4">
                  {deptDoctors.map((doc) => (
                    <div key={doc.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                        👨‍⚕️
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900">{doc.name}</h3>
                        <p className="text-red-600 text-sm mb-1">{doc.specialty}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map((s) => (
                              <Star key={s} size={12} className={s <= Math.round(doc.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">{doc.rating} ({doc.reviewCount} تقييم)</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">{doc.about}</p>
                        <div className="flex flex-wrap gap-2">
                          {doc.schedule.map((s) => (
                            <span key={s.day} className="text-xs bg-white border border-gray-200 px-2 py-1 rounded-lg text-gray-600 flex items-center gap-1">
                              <Clock size={10} />{s.day}: {s.from} - {s.to}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Link
                        to="/booking"
                        className="btn-primary px-4 py-2 rounded-xl text-sm font-semibold flex-shrink-0 flex items-center gap-1"
                      >
                        <Calendar size={14} />
                        احجز
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Booking */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3">احجز موعدك الآن</h3>
              <p className="text-red-100 text-sm mb-5">
                احجز موعدك في قسم {dept.name} وسنتواصل معك في أقرب وقت
              </p>
              <Link
                to="/booking"
                className="bg-white text-red-600 hover:bg-red-50 px-6 py-3 rounded-xl font-bold text-sm w-full block text-center transition-colors"
              >
                حجز موعد الآن
              </Link>
              <a
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn mt-3 px-6 py-3 rounded-xl font-bold text-sm w-full flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                واتساب
              </a>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">للتواصل</h3>
              <div className="space-y-3">
                <a href="tel:920001234" className="flex items-center gap-3 text-gray-600 hover:text-red-600 transition-colors">
                  <Phone size={18} className="text-red-500" />
                  <span className="text-sm">920-001-234</span>
                </a>
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock size={18} className="text-red-500" />
                  <span className="text-sm">السبت - الخميس: 8ص - 10م</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
