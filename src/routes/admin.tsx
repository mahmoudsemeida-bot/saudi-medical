import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, ArcElement,
  Title, Tooltip, Legend,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import { useAuth } from '../context/AuthContext'
import { appointments as mockAppts, doctors, users, departments, stats } from '../data/mock'
import type { Appointment } from '../data/mock'
import { Users, Calendar, Star, TrendingUp, CheckCircle, Clock, AlertCircle, Trash2 } from 'lucide-react'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

export const Route = createFileRoute('/admin')({
  component: AdminDashboard,
})

type AdminTab = 'overview' | 'appointments' | 'doctors' | 'patients'

function StatusBadge({ status }: { status: Appointment['status'] }) {
  const map = {
    pending: 'badge-pending',
    confirmed: 'badge-confirmed',
    completed: 'badge-completed',
    cancelled: 'badge-cancelled',
  }
  const labels = { pending: 'قيد الانتظار', confirmed: 'مؤكد', completed: 'مكتمل', cancelled: 'ملغي' }
  return <span className={map[status]}>{labels[status]}</span>
}

function AdminDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [tab, setTab] = useState<AdminTab>('overview')
  const [mounted, setMounted] = useState(false)
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.navigate({ to: '/' })
      return
    }
    setMounted(true)
    const stored = JSON.parse(localStorage.getItem('alshifa_bookings') || '[]')
    setAllAppointments([...mockAppts, ...stored])
  }, [user, router])

  if (!user || user.role !== 'admin') return null

  const kpis = [
    { icon: Users, value: users.length + 12000, label: 'إجمالي المرضى', color: 'from-blue-500 to-blue-600', change: '+12%' },
    { icon: Calendar, value: allAppointments.length, label: 'إجمالي الحجوزات', color: 'from-red-500 to-red-600', change: '+8%' },
    { icon: Star, value: doctors.length, label: 'عدد الأطباء', color: 'from-purple-500 to-purple-600', change: '' },
    { icon: TrendingUp, value: '97%', label: 'نسبة الرضا', color: 'from-green-500 to-green-600', change: '+2%' },
  ]

  const patientsChartData = {
    labels: stats.monthlyData.labels,
    datasets: [{
      label: 'المرضى',
      data: stats.monthlyData.patients,
      backgroundColor: 'rgba(229, 62, 62, 0.8)',
      borderRadius: 6,
    }],
  }

  const deptChartData = {
    labels: stats.departmentStats.labels,
    datasets: [{
      data: stats.departmentStats.data,
      backgroundColor: ['#E53E3E', '#3182CE', '#38A169', '#D69E2E', '#805AD5', '#2B6CB0'],
      borderWidth: 0,
    }],
  }

  const statusCount = allAppointments.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-red-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-black mb-1">لوحة الإدارة</h1>
          <p className="text-gray-300 text-sm">مجمع الشفاء الطبي - إدارة شاملة للمنظومة الصحية</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm border border-gray-100 mb-8 w-fit flex-wrap">
          {[
            { key: 'overview', label: '📊 نظرة عامة' },
            { key: 'appointments', label: '📅 الحجوزات' },
            { key: 'doctors', label: '👨‍⚕️ الأطباء' },
            { key: 'patients', label: '👥 المرضى' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key as AdminTab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === key ? 'bg-red-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map(({ icon: Icon, value, label, color, change }) => (
                <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <div className="text-2xl font-black text-gray-900">{typeof value === 'number' ? value.toLocaleString() : value}</div>
                  <div className="text-sm text-gray-500 mt-0.5">{label}</div>
                  {change && <div className="text-xs text-green-600 font-medium mt-1">{change}</div>}
                </div>
              ))}
            </div>

            {/* Status Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { status: 'pending', icon: AlertCircle, color: 'text-yellow-600 bg-yellow-50' },
                { status: 'confirmed', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
                { status: 'completed', icon: CheckCircle, color: 'text-blue-600 bg-blue-50' },
                { status: 'cancelled', icon: Clock, color: 'text-red-600 bg-red-50' },
              ].map(({ status, icon: Icon, color }) => (
                <div key={status} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-xl font-black text-gray-900">{statusCount[status] || 0}</div>
                    <StatusBadge status={status as Appointment['status']} />
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            {mounted && (
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4">المرضى شهرياً</h3>
                  <Bar data={patientsChartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4">توزيع المرضى على الأقسام</h3>
                  <div className="max-w-sm mx-auto">
                    <Doughnut
                      data={deptChartData}
                      options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Appointments Table */}
        {tab === 'appointments' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-900 text-lg">جميع الحجوزات ({allAppointments.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full admin-table">
                <thead>
                  <tr>
                    <th>المريض</th>
                    <th>الطبيب</th>
                    <th>التخصص</th>
                    <th>التاريخ</th>
                    <th>الوقت</th>
                    <th>الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {allAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-red-50 transition-colors">
                      <td className="font-medium text-gray-900">{apt.patientName}</td>
                      <td className="text-gray-700">{apt.doctorName}</td>
                      <td className="text-gray-500 text-sm">{apt.specialty}</td>
                      <td className="text-gray-600 text-sm" dir="ltr">{apt.date}</td>
                      <td className="text-gray-600 text-sm" dir="ltr">{apt.time}</td>
                      <td><StatusBadge status={apt.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Doctors Table */}
        {tab === 'doctors' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-900 text-lg">كادر الأطباء ({doctors.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full admin-table">
                <thead>
                  <tr>
                    <th>الاسم</th>
                    <th>التخصص</th>
                    <th>التقييم</th>
                    <th>سنوات الخبرة</th>
                    <th>عدد المراجعات</th>
                    <th>الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doc) => (
                    <tr key={doc.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-red-100 rounded-full flex items-center justify-center text-base">👨‍⚕️</div>
                          <span className="font-medium text-gray-900">{doc.name}</span>
                        </div>
                      </td>
                      <td><span className="text-sm text-red-600 bg-red-50 px-2 py-0.5 rounded-full">{doc.specialty}</span></td>
                      <td>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span className="text-sm font-medium">{doc.rating}</span>
                        </div>
                      </td>
                      <td className="text-sm text-gray-600">{doc.experience} سنة</td>
                      <td className="text-sm text-gray-600">{doc.reviewCount}</td>
                      <td>
                        <span className={doc.available ? 'badge-confirmed' : 'badge-cancelled'}>
                          {doc.available ? 'متاح' : 'غير متاح'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Patients Table */}
        {tab === 'patients' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-900 text-lg">المرضى المسجلون ({users.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full admin-table">
                <thead>
                  <tr>
                    <th>الاسم</th>
                    <th>البريد الإلكتروني</th>
                    <th>الجوال</th>
                    <th>الدور</th>
                    <th>الحجوزات</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {u.name[0]}
                          </div>
                          <span className="font-medium text-gray-900">{u.name}</span>
                        </div>
                      </td>
                      <td className="text-sm text-gray-600" dir="ltr">{u.email}</td>
                      <td className="text-sm text-gray-600" dir="ltr">{u.phone}</td>
                      <td>
                        <span className={u.role === 'admin' ? 'badge-confirmed' : 'badge-completed'}>
                          {u.role === 'admin' ? 'مدير' : 'مريض'}
                        </span>
                      </td>
                      <td className="text-sm text-gray-600">
                        {allAppointments.filter(a => a.patientId === u.id).length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
