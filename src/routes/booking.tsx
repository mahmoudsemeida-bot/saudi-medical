import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { departments, doctors, timeSlots } from '../data/mock'
import { useAuth } from '../context/AuthContext'
import { CheckCircle, Calendar, Clock, User, ChevronLeft, ChevronRight, Phone } from 'lucide-react'

export const Route = createFileRoute('/booking')({
  component: BookingPage,
})

type Step = 1 | 2 | 3 | 4

interface BookingData {
  specialty: string
  doctorId: string
  date: string
  time: string
  notes: string
}

function BookingPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [booking, setBooking] = useState<BookingData>({
    specialty: '',
    doctorId: '',
    date: '',
    time: '',
    notes: '',
  })
  const [confirmed, setConfirmed] = useState(false)
  const [bookingId, setBookingId] = useState('')

  const availableDoctors = booking.specialty
    ? doctors.filter((d) => d.specialtySlug === booking.specialty)
    : doctors

  const selectedDoctor = doctors.find((d) => d.id === booking.doctorId)
  const selectedDept = departments.find((d) => d.slug === booking.specialty)

  const handleConfirm = async () => {
    if (!user) {
      router.navigate({ to: '/auth/login' })
      return
    }
    // Save booking to localStorage
    const newBooking = {
      id: `bk_${Date.now()}`,
      patientId: user.id,
      patientName: user.name,
      doctorId: booking.doctorId,
      doctorName: selectedDoctor?.name || '',
      specialty: selectedDept?.name || '',
      date: booking.date,
      time: booking.time,
      status: 'confirmed',
      notes: booking.notes,
    }
    const existing = JSON.parse(localStorage.getItem('alshifa_bookings') || '[]')
    existing.push(newBooking)
    localStorage.setItem('alshifa_bookings', JSON.stringify(existing))
    setBookingId(newBooking.id)
    setConfirmed(true)
  }

  const whatsappMessage = selectedDoctor
    ? `مرحباً، أود تأكيد موعدي مع ${selectedDoctor.name} بتاريخ ${booking.date} الساعة ${booking.time}`
    : ''

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">تم تأكيد الحجز!</h2>
          <p className="text-gray-500 mb-1 text-sm">رقم الحجز: <span className="font-mono text-gray-700">{bookingId}</span></p>
          <div className="bg-gray-50 rounded-xl p-4 mt-4 mb-6 text-right space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">الطبيب:</span>
              <span className="font-semibold">{selectedDoctor?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">التخصص:</span>
              <span>{selectedDept?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">التاريخ:</span>
              <span>{booking.date}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">الوقت:</span>
              <span>{booking.time}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            تم إرسال تأكيد الحجز. يمكنك أيضاً تأكيد الموعد عبر واتساب
          </p>
          <div className="space-y-3">
            <a
              href={`https://wa.me/966500000000?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              تأكيد عبر واتساب
            </a>
            <Link to="/patient" className="block text-center text-red-600 hover:text-red-700 text-sm font-medium">
              عرض حجوزاتي
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="hero-bg py-12 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl lg:text-4xl font-black mb-2">حجز موعد طبي</h1>
          <p className="text-gray-200">احجز موعدك في أقل من دقيقتين</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-10 gap-0">
          {[
            { n: 1, label: 'التخصص' },
            { n: 2, label: 'الطبيب' },
            { n: 3, label: 'الموعد' },
            { n: 4, label: 'التأكيد' },
          ].map(({ n, label }, idx) => (
            <div key={n} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    step > n
                      ? 'bg-green-500 text-white'
                      : step === n
                      ? 'bg-red-600 text-white shadow-lg scale-110'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step > n ? <CheckCircle size={18} /> : n}
                </div>
                <span className={`text-xs mt-1 ${step === n ? 'text-red-600 font-semibold' : 'text-gray-400'}`}>
                  {label}
                </span>
              </div>
              {idx < 3 && (
                <div className={`w-16 h-1 mx-1 rounded transition-all ${step > n ? 'bg-green-400' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
          {/* Step 1: Specialty */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">اختر التخصص الطبي</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {departments.map((dept) => (
                  <button
                    key={dept.id}
                    onClick={() => { setBooking(b => ({ ...b, specialty: dept.slug, doctorId: '' })); setStep(2) }}
                    className={`p-4 rounded-xl border-2 text-center transition-all hover:border-red-400 hover:bg-red-50 ${
                      booking.specialty === dept.slug ? 'border-red-500 bg-red-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="text-3xl mb-2">{dept.icon}</div>
                    <div className="text-sm font-semibold text-gray-800">{dept.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{dept.doctorCount} أطباء</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Doctor */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">اختر الطبيب</h2>
              <div className="space-y-3">
                {availableDoctors.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => { setBooking(b => ({ ...b, doctorId: doc.id })); setStep(3) }}
                    className={`w-full p-4 rounded-xl border-2 text-right flex items-center gap-4 transition-all hover:border-red-400 hover:bg-red-50 ${
                      booking.doctorId === doc.id ? 'border-red-500 bg-red-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                      👨‍⚕️
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900">{doc.name}</div>
                      <div className="text-red-600 text-sm">{doc.specialty}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map((s) => (
                            <span key={s} className={`text-xs ${s <= Math.round(doc.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">{doc.experience} سنوات خبرة</span>
                      </div>
                    </div>
                    <ChevronLeft size={18} className="text-gray-400 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Date & Time */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">اختر التاريخ والوقت</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar size={15} className="inline ml-1 text-red-500" />
                    تاريخ الموعد
                  </label>
                  <input
                    type="date"
                    value={booking.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setBooking(b => ({ ...b, date: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-400 text-left"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Clock size={15} className="inline ml-1 text-red-500" />
                    الوقت المفضل
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setBooking(b => ({ ...b, time: slot }))}
                        className={`py-2 px-2 rounded-lg text-xs font-medium border transition-all ${
                          booking.time === slot
                            ? 'bg-red-600 text-white border-red-600'
                            : 'border-gray-200 text-gray-600 hover:border-red-400 hover:bg-red-50'
                        }`}
                        dir="ltr"
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ملاحظات (اختياري)</label>
                  <textarea
                    value={booking.notes}
                    onChange={(e) => setBooking(b => ({ ...b, notes: e.target.value }))}
                    placeholder="اذكر سبب الزيارة أو أي ملاحظات خاصة..."
                    rows={3}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-400 text-sm resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">تأكيد الحجز</h2>
              <div className="bg-red-50 border border-red-100 rounded-2xl p-5 space-y-3 mb-6">
                {[
                  { icon: '🏥', label: 'التخصص', value: selectedDept?.name },
                  { icon: '👨‍⚕️', label: 'الطبيب', value: selectedDoctor?.name },
                  { icon: '📅', label: 'التاريخ', value: booking.date },
                  { icon: '🕐', label: 'الوقت', value: booking.time },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">{icon} {label}</span>
                    <span className="font-semibold text-gray-900">{value}</span>
                  </div>
                ))}
                {booking.notes && (
                  <div className="pt-2 border-t border-red-200">
                    <span className="text-gray-500 text-sm">📝 ملاحظات: </span>
                    <span className="text-sm text-gray-700">{booking.notes}</span>
                  </div>
                )}
              </div>

              {!user && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4 text-sm text-yellow-800">
                  ⚠️ يجب تسجيل الدخول لتأكيد الحجز.{' '}
                  <Link to="/auth/login" className="text-yellow-900 font-bold underline">
                    تسجيل الدخول الآن
                  </Link>
                </div>
              )}

              <button
                onClick={handleConfirm}
                className="btn-primary w-full py-4 rounded-xl font-bold text-lg"
              >
                {user ? 'تأكيد الحجز' : 'تسجيل الدخول لتأكيد الحجز'}
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1) as Step)}
              disabled={step === 1}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={18} />
              السابق
            </button>
            {step < 4 && (
              <button
                onClick={() => setStep((s) => Math.min(4, s + 1) as Step)}
                disabled={
                  (step === 1 && !booking.specialty) ||
                  (step === 2 && !booking.doctorId) ||
                  (step === 3 && (!booking.date || !booking.time))
                }
                className="btn-primary flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                التالي
                <ChevronLeft size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
