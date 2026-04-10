import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { doctors, departments } from '../data/mock'
import { Star, Clock, Calendar, Filter, Search } from 'lucide-react'

export const Route = createFileRoute('/doctors')({
  component: DoctorsPage,
})

function DoctorsPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = doctors.filter((doc) => {
    const matchSpec = selectedSpecialty === 'all' || doc.specialtySlug === selectedSpecialty
    const matchSearch = !searchQuery || doc.name.includes(searchQuery) || doc.specialty.includes(searchQuery)
    return matchSpec && matchSearch
  })

  return (
    <div className="min-h-screen">
      <div className="hero-bg py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl lg:text-5xl font-black mb-4">كادر الأطباء</h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            نخبة من أفضل الأطباء والاستشاريين في مختلف التخصصات الطبية
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن طبيب..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-200 rounded-xl pr-10 pl-4 py-2.5 text-sm focus:outline-none focus:border-red-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400 flex-shrink-0" />
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-400 bg-white min-w-40"
            >
              <option value="all">كل التخصصات</option>
              {departments.map((d) => (
                <option key={d.slug} value={d.slug}>{d.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-gray-500 text-sm mb-6">{filtered.length} طبيب</p>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((doc) => (
            <div key={doc.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover">
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center text-3xl flex-shrink-0 border-4 border-white shadow-md">
                    👨‍⚕️
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight">{doc.name}</h3>
                    <span className="inline-block bg-red-50 text-red-600 text-xs px-3 py-1 rounded-full mt-1 font-medium">
                      {doc.specialty}
                    </span>
                    <div className="flex items-center gap-1 mt-2">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} size={13} className={s <= Math.round(doc.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                      ))}
                      <span className="text-xs text-gray-500 mr-1">{doc.rating} ({doc.reviewCount})</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-4 leading-relaxed line-clamp-2">{doc.about}</p>

                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock size={13} className="text-red-400" />
                    {doc.experience} سنوات خبرة
                  </span>
                  <span className={`flex items-center gap-1 ${doc.available ? 'text-green-600' : 'text-gray-400'}`}>
                    <span className={`w-2 h-2 rounded-full ${doc.available ? 'bg-green-500' : 'bg-gray-300'}`} />
                    {doc.available ? 'متاح' : 'غير متاح'}
                  </span>
                </div>

                {/* Schedule Preview */}
                <div className="bg-gray-50 rounded-xl p-3 mb-4">
                  <p className="text-xs font-semibold text-gray-600 mb-2">مواعيد العيادة</p>
                  <div className="space-y-1">
                    {doc.schedule.slice(0, 2).map((s) => (
                      <div key={s.day} className="flex items-center justify-between text-xs text-gray-600">
                        <span>{s.day}</span>
                        <span className="text-red-500 font-medium">{s.from} - {s.to}</span>
                      </div>
                    ))}
                    {doc.schedule.length > 2 && (
                      <div className="text-xs text-gray-400">+{doc.schedule.length - 2} أيام أخرى</div>
                    )}
                  </div>
                </div>

                <Link
                  to="/booking"
                  className="btn-primary w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <Calendar size={15} />
                  احجز موعداً
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p>لا يوجد أطباء مطابقون لبحثك</p>
          </div>
        )}
      </div>
    </div>
  )
}
