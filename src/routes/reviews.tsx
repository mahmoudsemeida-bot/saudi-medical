import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { reviews as mockReviews } from '../data/mock'
import { Star, ThumbsUp, ChevronDown } from 'lucide-react'

export const Route = createFileRoute('/reviews')({
  component: ReviewsPage,
})

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={s <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}
        />
      ))}
    </div>
  )
}

function ReviewsPage() {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', doctor: '', specialty: '', rating: 5, comment: '' })
  const [submitted, setSubmitted] = useState(false)
  const [localReviews, setLocalReviews] = useState(mockReviews)

  const avgRating = localReviews.reduce((sum, r) => sum + r.rating, 0) / localReviews.length
  const ratingDist = [5, 4, 3, 2, 1].map((r) => ({
    stars: r,
    count: localReviews.filter((rev) => Math.round(rev.rating) === r).length,
    pct: (localReviews.filter((rev) => Math.round(rev.rating) === r).length / localReviews.length) * 100,
  }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newReview = {
      id: `r_${Date.now()}`,
      patientName: form.name,
      doctorName: form.doctor,
      specialty: form.specialty,
      rating: form.rating,
      comment: form.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
    }
    setLocalReviews((prev) => [newReview, ...prev])
    setSubmitted(true)
    setForm({ name: '', doctor: '', specialty: '', rating: 5, comment: '' })
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="hero-bg py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl lg:text-5xl font-black mb-4">آراء مرضانا</h1>
          <p className="text-gray-200 text-lg max-w-xl mx-auto">
            تجارب حقيقية من مرضى مجمع الشفاء الطبي
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Overall Rating */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="text-center">
              <div className="text-6xl font-black text-gray-900">{avgRating.toFixed(1)}</div>
              <StarRating rating={avgRating} size={24} />
              <p className="text-gray-500 text-sm mt-2">{localReviews.length} تقييم</p>
            </div>
            <div className="flex-1 w-full space-y-2">
              {ratingDist.map(({ stars, count, pct }) => (
                <div key={stars} className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-4 text-left">{stars}</span>
                  <Star size={14} className="text-yellow-400 fill-yellow-400 flex-shrink-0" />
                  <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-6">{count}</span>
                </div>
              ))}
            </div>
            <div className="sm:text-right text-center">
              <button
                onClick={() => setShowForm(!showForm)}
                className="btn-primary px-6 py-3 rounded-xl font-semibold text-sm"
              >
                أضف تقييمك
              </button>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-xl mb-6 flex items-center gap-2">
            <Star size={18} className="text-green-500" />
            شكراً لتقييمك! سيساعد تقييمك المرضى الآخرين.
          </div>
        )}

        {/* Review Form */}
        {showForm && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100 mb-8 animate-fade-in-up">
            <h3 className="font-bold text-gray-900 text-lg mb-5">أضف تقييمك</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">اسمك</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-400"
                    placeholder="اسمك الكريم"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">اسم الطبيب</label>
                  <input
                    type="text"
                    value={form.doctor}
                    onChange={(e) => setForm((f) => ({ ...f, doctor: e.target.value }))}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-400"
                    placeholder="اسم الطبيب"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">التخصص</label>
                <input
                  type="text"
                  value={form.specialty}
                  onChange={(e) => setForm((f) => ({ ...f, specialty: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-400"
                  placeholder="مثال: طب الأطفال"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">تقييمك</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, rating: s }))}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        size={28}
                        className={s <= form.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">تعليقك</label>
                <textarea
                  value={form.comment}
                  onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                  required
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-400 resize-none"
                  placeholder="شاركنا تجربتك..."
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="btn-primary px-6 py-2.5 rounded-xl font-semibold text-sm">
                  إرسال التقييم
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2.5 rounded-xl text-sm border border-gray-200 text-gray-500 hover:bg-gray-50"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {localReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-red-100 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                    {review.patientName[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{review.patientName}</div>
                    <div className="text-xs text-gray-400">{review.doctorName}</div>
                    {review.specialty && (
                      <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full mt-0.5 inline-block">
                        {review.specialty}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-xs text-gray-400">{review.date}</div>
              </div>
              <StarRating rating={review.rating} size={14} />
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">"{review.comment}"</p>
              {review.helpful > 0 && (
                <div className="flex items-center gap-1 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
                  <ThumbsUp size={13} />
                  <span>{review.helpful} شخصاً وجد هذا مفيداً</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
