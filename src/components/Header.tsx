import { useState } from 'react'
import { Link, useRouter } from '@tanstack/react-router'
import { Menu, X, Phone, ChevronDown, User, LogOut, Calendar, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { label: 'الرئيسية', to: '/' },
  { label: 'الأقسام', to: '/departments' },
  { label: 'الأطباء', to: '/doctors' },
  { label: 'حجز موعد', to: '/booking' },
  { label: 'آراء المرضى', to: '/reviews' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
    router.navigate({ to: '/' })
  }

  return (
    <header className="sticky top-0 z-50 glass shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
              ❤
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-bold text-red-600 leading-tight">مجمع الشفاء الطبي</div>
              <div className="text-xs text-gray-500">Al-Shifa Medical Complex</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="nav-link text-gray-700 hover:text-red-600 font-medium text-sm transition-colors"
                activeProps={{ className: 'nav-link text-red-600 font-semibold' }}
                activeOptions={{ exact: link.to === '/' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Phone */}
            <a
              href="tel:920001234"
              className="hidden lg:flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              <Phone size={16} />
              <span>920-001-234</span>
            </a>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 px-3 py-2 rounded-xl text-sm font-medium transition-colors"
                >
                  <User size={16} />
                  <span className="hidden sm:block max-w-24 truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={14} />
                </button>
                {userMenuOpen && (
                  <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-red-100 py-2 z-50">
                    {user.role === 'admin' ? (
                      <Link
                        to="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                      >
                        <LayoutDashboard size={16} />
                        لوحة الإدارة
                      </Link>
                    ) : (
                      <Link
                        to="/patient"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                      >
                        <Calendar size={16} />
                        حجوزاتي
                      </Link>
                    )}
                    <hr className="my-1 border-red-100" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      تسجيل الخروج
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/auth/login"
                  className="hidden sm:block text-sm text-gray-600 hover:text-red-600 font-medium transition-colors"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/booking"
                  className="btn-primary px-4 py-2 rounded-xl text-sm font-semibold"
                >
                  احجز الآن
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-red-100 py-4 px-4 space-y-1 animate-fade-in-up">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block py-3 px-4 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 font-medium transition-colors"
              activeProps={{ className: 'block py-3 px-4 rounded-xl bg-red-50 text-red-600 font-semibold' }}
              activeOptions={{ exact: link.to === '/' }}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-red-100 pt-3 mt-3 space-y-2">
            {!user && (
              <>
                <Link
                  to="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 px-4 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 font-medium text-center border border-red-200"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/auth/register"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary block py-3 px-4 rounded-xl font-semibold text-center"
                >
                  إنشاء حساب
                </Link>
              </>
            )}
            <a
              href="tel:920001234"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-green-50 text-green-700 font-medium"
            >
              <Phone size={16} />
              920-001-234
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
