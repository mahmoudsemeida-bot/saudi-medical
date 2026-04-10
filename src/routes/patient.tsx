import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Plus, User, Phone, Mail } from 'lucide-react'
import type { Appointment } from '../data/mock'

export const Route = createFileRoute('/patient')({
  component: PatientDashboard,
})

function StatusBadge({ status }: { status: Appointment['status'] }) {
  const config = {
    pending: { label: 'قيد الانتظار', cls: 'badge-pending', icon: AlertCircle },
    confirmed: { label: 'مؤكد', cls: 'badge-confirmed', icon: CheckCircle },
    completed: { label: 'مكتمل', cls: 'badge-completed', icon: CheckCircle },
    cancelled: { label: 'ملغي', cls: 'badge-cancelled', icon: XCircle },
  }
  const { label, cls } = config[status]
  return <span className={cls}>{label}</span>
}

function PatientDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'profile'>('upcoming')

  useEffect(() => {
    if (!user) {
      router.navigate({ to: '/auth/login' })
      return
    }
    const stored = JSON.parse(localStorage.getItem('alshifa_bookings') || '[]')
    const userBookings = stored.filter((b: Appointment) => b.patientId === user.id)
    setAppointments(userBookings)
  }, [user, router])

  if (!user) return null

  const today = new Date().toISOString().split('T')[0]
  const upcoming = appointments.filter((a) => a.date >= today && a.status !== 'cancelled')
  const past = appointments.filter((a) => a.date < today || a.status === 'completed')

  const cancelBooking = (id: string) => {
    const stored = JSON.parse(localStorage.getItem('alshifa_bookings') || '[]')
    const updated = stored.map((b: Appointment) =>
      b.id === id ? { ...b, status: 'cancelled' } : b
    )
    localStorage.setItem('alshifa_bookings', JSON.stringify(updated))
    setAppointments(updated.filter((b: Appointment) => b.patientId === user.id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <p className="text-red-200 text-sm">مرحباً بك</p>
                <h1 className="text-2xl font-black">{user.name}</h1>
                <p className="text-red-200 text-sm">{user.email}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                to="/booking"
                className="bg-white text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-1"
              >
                <Plus size={16} />
                حجز جديد
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { value: appointments.length, label: 'إجمالي الحجوزات' },
              { value: upcoming.length, label: 'مواعيد قادمة' },
              { value: past.length, label: 'مواعيد سابقة' },
            ].map(({ value, label }) => (
              <div key={label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <div className="text-2xl font-black">{value}</div>
                <div className="text-red-200 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm border border-gray-100 mb-6 w-fit">
          {[
            { key: 'upcoming', label: 'المواعيد القادمة' },
            { key: 'past', label: 'السجل الطبي' },
            { key: 'profile', label: 'الملف الشخصي' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as typeof activeTab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === key
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Upcoming Appointments */}
        {activeTab === 'upcoming' && (
          <div>
            {upcoming.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                <div className="text-5xl mb-4">📅</div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">لا توجد مواعيد قادمة</h3>
                <p className="text-gray-400 text-sm mb-6">احجز موعدك الآن مع أحد أطبائنا المتخصصين</p>
                <Link to="/booking" className="btn-primary px-6 py-3 rounded-xl font-semibold inline-block">
                  احجز موعداً
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {upcoming.map((apt) => (
                  <div key={apt.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                          👨‍⚕️
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{apt.doctorName}</h3>
                          <p className="text-red-600 text-sm">{apt.specialty}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="flex items-center gap-1 text-xs text-gray-500">
                              <Calendar size={13} className="text-red-400" />
                              {apt.date}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock size={13} className="text-red-400" />
                              {apt.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <StatusBadge status={apt.status} />
                        <div className="flex gap-2">
                          <a
                            href={`https://wa.me/966500000000?text=${encodeURIComponent(`تأكيد موعد مع ${apt.doctorName} بتاريخ ${apt.date} الساعة ${apt.time}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs whatsapp-btn px-3 py-1.5 rounded-lg"
                          >
                            واتساب
                          </a>
                          <button
                            onClick={() => cancelBooking(apt.id)}
                            className="text-xs text-red-500 hover:text-red-700 border border-red-200 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            إلغاء
                          </button>
                        </div>
                      </div>
                    </div>
                    {apt.notes && (
                      <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                        📝 {apt.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Past Appointments */}
        {activeTab === 'past' && (
          <div>
            {past.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                <div className="text-5xl mb-4">📋</div>
                <p className="text-gray-400">لا يوجد سجل طبي سابق</p>
              </div>
            ) : (
              <div className="space-y-3">
                {past.map((apt) => (
                  <div key={apt.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-lg">
                        📋
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-800">{apt.doctorName}</p>
                        <p className="text-xs text-gray-500">{apt.specialty} · {apt.date}</p>
                      </div>
                    </div>
                    <StatusBadge status={apt.status} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 text-lg mb-5">الملف الشخصي</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: User, label: 'الاسم', value: user.name },
                { icon: Mail, label: 'البريد الإلكتروني', value: user.email },
                { icon: Phone, label: 'رقم الجوال', value: user.phone },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                    <Icon size={14} />
                    {label}
                  </div>
                  <div className="font-semibold text-gray-800">{value}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <button
                onClick={() => { logout(); router.navigate({ to: '/' }) }}
                className="text-red-600 hover:text-red-700 text-sm font-medium border border-red-200 px-4 py-2 rounded-xl transition-colors"
              >
                تسجيل الخروج
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
