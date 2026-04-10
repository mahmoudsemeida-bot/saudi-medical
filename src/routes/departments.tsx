import { createFileRoute, Link } from '@tanstack/react-router'
import { departments } from '../data/mock'
import { ArrowLeft, CheckCircle } from 'lucide-react'

export const Route = createFileRoute('/departments')({
  component: DepartmentsPage,
})

function DepartmentsPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="hero-bg py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl lg:text-5xl font-black mb-4">الأقسام الطبية</h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            نقدم رعاية طبية متكاملة في ستة أقسام متخصصة بأحدث التجهيزات والكوادر البشرية المؤهلة
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept) => (
            <Link
              key={dept.id}
              to="/departments/$slug"
              params={{ slug: dept.slug }}
              className="block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover group"
            >
              {/* Color bar */}
              <div className="h-2" style={{ background: dept.color }} />

              <div className="p-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4"
                  style={{ background: `${dept.color}15` }}
                >
                  {dept.icon}
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {dept.name}
                </h2>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{dept.description}</p>

                <div className="space-y-2 mb-5">
                  {dept.services.slice(0, 3).map((service) => (
                    <div key={service} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} style={{ color: dept.color }} />
                      {service}
                    </div>
                  ))}
                  {dept.services.length > 3 && (
                    <div className="text-xs text-gray-400">+{dept.services.length - 3} خدمات أخرى</div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">{dept.doctorCount} أطباء متاحون</span>
                  <span
                    className="flex items-center gap-1 text-sm font-medium"
                    style={{ color: dept.color }}
                  >
                    عرض التفاصيل <ArrowLeft size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
