import { Link } from '@tanstack/react-router'
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                ❤
              </div>
              <div>
                <div className="text-white font-bold text-lg">مجمع الشفاء الطبي</div>
                <div className="text-gray-400 text-xs">Al-Shifa Medical Complex</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              مجمع طبي متكامل يقدم رعاية صحية شاملة بأعلى المعايير العالمية. نلتزم بصحتك وسلامتك في كل خطوة.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 relative">
              روابط سريعة
              <span className="absolute bottom-0 right-0 w-10 h-0.5 bg-red-500 -mb-1" />
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'الصفحة الرئيسية', to: '/' },
                { label: 'الأقسام الطبية', to: '/departments' },
                { label: 'كادر الأطباء', to: '/doctors' },
                { label: 'حجز موعد', to: '/booking' },
                { label: 'آراء المرضى', to: '/reviews' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-red-400 text-sm transition-colors flex items-center gap-1"
                  >
                    <span className="text-red-500">←</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 relative">
              الأقسام الطبية
              <span className="absolute bottom-0 right-0 w-10 h-0.5 bg-red-500 -mb-1" />
            </h3>
            <ul className="space-y-2">
              {[
                { label: '🩺 الطب الباطني', to: '/departments/internal-medicine' },
                { label: '🦷 طب الأسنان', to: '/departments/dentistry' },
                { label: '👶 طب الأطفال', to: '/departments/pediatrics' },
                { label: '🦴 جراحة العظام', to: '/departments/orthopedics' },
                { label: '🧴 طب الجلدية', to: '/departments/dermatology' },
                { label: '🩻 الأشعة التشخيصية', to: '/departments/radiology' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-red-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 relative">
              تواصل معنا
              <span className="absolute bottom-0 right-0 w-10 h-0.5 bg-red-500 -mb-1" />
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-400">شارع الملك فهد، حي العليا، الرياض 11564</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-red-400 flex-shrink-0" />
                <a href="tel:920001234" className="text-sm text-gray-400 hover:text-red-400 transition-colors">
                  920-001-234
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-red-400 flex-shrink-0" />
                <a href="mailto:info@alshifa.com" className="text-sm text-gray-400 hover:text-red-400 transition-colors">
                  info@alshifa.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-400">
                  <div>السبت - الخميس: 8ص - 10م</div>
                  <div>الجمعة: 2م - 9م</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 text-center">
            © 2026 مجمع الشفاء الطبي. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-red-400 transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-red-400 transition-colors">الشروط والأحكام</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
