import { useState } from 'react'
import { Shield } from 'lucide-react'

export default function Step3Contact({ data, onChange, onBack, onNext }) {
  const [touched, setTouched] = useState({})

  const isValid =
    data.name.trim() && data.email.trim() && data.phone.trim()

  const handleChange = (field, value) => {
    onChange((prev) => ({ ...prev, [field]: value }))
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, phone: true })
    if (isValid) onNext()
  }

  const fieldClass = (field) =>
    `w-full px-3 py-2.5 border rounded-xl text-sm text-stone-900 placeholder:text-stone-400 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
      touched[field] && !data[field].trim()
        ? 'border-red-300 bg-red-50'
        : 'border-stone-200'
    }`

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-stone-900 mb-1.5">
        Ihre Kontaktdaten
      </h2>
      <p className="text-sm text-stone-500 leading-relaxed mb-7">
        Die Praxis und die Apotheke melden sich bei Ihnen, wenn das Rezept
        fertig ist oder etwas unklar ist.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-stone-700 mb-1.5"
          >
            Vor- und Nachname
          </label>
          <input
            id="contact-name"
            type="text"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Ihr vollständiger Name"
            autoComplete="name"
            className={fieldClass('name')}
          />
          {touched.name && !data.name.trim() && (
            <p className="text-xs text-red-500 mt-1">
              Bitte geben Sie Ihren Namen ein.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-stone-700 mb-1.5"
          >
            E-Mail-Adresse
          </label>
          <input
            id="contact-email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="ihre@email.de"
            autoComplete="email"
            className={fieldClass('email')}
          />
          {touched.email && !data.email.trim() && (
            <p className="text-xs text-red-500 mt-1">
              Bitte geben Sie Ihre E-Mail-Adresse ein.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-phone"
            className="block text-sm font-medium text-stone-700 mb-1.5"
          >
            Telefonnummer
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="z. B. 0151 12 345 678"
            autoComplete="tel"
            className={fieldClass('phone')}
          />
          {touched.phone && !data.phone.trim() && (
            <p className="text-xs text-red-500 mt-1">
              Bitte geben Sie Ihre Telefonnummer ein.
            </p>
          )}
        </div>

        {/* Data protection note — answers "Wer sieht meine Daten?" right where it's asked */}
        <div className="flex items-start gap-3 border-l-4 border-teal-500 bg-teal-50 rounded-r-lg px-4 py-3">
          <Shield className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-stone-800 leading-relaxed">
            <strong>Ihre Daten sehen genau zwei Stellen:</strong> Ihre Praxis
            und die gewählte Apotheke. Nur für diese Anfrage. Wir geben nichts
            weiter.
          </p>
        </div>

        <div className="flex justify-between items-center pt-2">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2.5 text-sm text-stone-400 hover:text-stone-600 transition-colors"
          >
            ← Zurück
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-teal-700 text-white text-sm font-medium rounded-full shadow-sm hover:bg-teal-800 transition-colors"
          >
            Anfrage abschicken
          </button>
        </div>
      </form>
    </div>
  )
}
