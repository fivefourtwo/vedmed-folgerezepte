import { useState } from 'react'
import { Search, MapPin, CheckCircle, ArrowRight, Check } from 'lucide-react'
import { PRACTICES } from '../data'

export default function Step0Search({ onSelect }) {
  const [query, setQuery] = useState('')
  const [inviteForm, setInviteForm] = useState({ practiceInfo: '', email: '' })
  const [inviteSent, setInviteSent] = useState(false)

  const trimmed = query.trim()
  const hasQuery = trimmed.length >= 2

  const results = hasQuery
    ? PRACTICES.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed.toLowerCase()) ||
          p.city.toLowerCase().includes(trimmed.toLowerCase()) ||
          p.zip.includes(trimmed)
      )
    : []

  const showNoResult = hasQuery && results.length === 0

  const handleInviteSubmit = (e) => {
    e.preventDefault()
    setInviteSent(true)
  }

  return (
    <div className="w-full">
      {/* Hero — what this is and why it helps, headline signals the account */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-stone-900 mb-4 leading-snug tracking-tight">
          Folgerezepte für Ihr Tier,
          <br />
          <span className="text-teal-700">ohne Weg in die Praxis</span>
        </h1>
        <p className="text-stone-500 leading-relaxed mb-6">
          Ihr Tier bekommt ein Dauermedikament. Wenn der Vorrat zur Neige
          geht, fragen Sie hier das nächste Rezept an. Ihre Praxis prüft die
          Anfrage, die Apotheke gibt das Medikament aus oder verschickt es.
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
          {[
            'Kein Termin nötig. Die Anfrage dauert wenige Minuten.',
            'Sie holen das Medikament in der Apotheke ab oder bekommen es per Post.',
            'VedMed kostet Sie nichts. Sie zahlen nur Medikament und Rezeptgebühr.',
            'Mit der ersten Anfrage entsteht Ihr Zugang. Beim nächsten Mal ist alles schon eingetragen.',
          ].map((benefit) => (
            <li key={benefit} className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-teal-700" />
              </span>
              <span className="text-sm text-stone-700 leading-relaxed">
                {benefit}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Prototype hint — visually set apart from product copy */}
      <div className="mb-6 border border-dashed border-stone-300 rounded-xl px-4 py-3 bg-white">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1">
          Prototyp
        </p>
        <p className="text-sm text-stone-600 leading-relaxed">
          «Dr. Muster» ist als Partnerpraxis hinterlegt. Jede andere Eingabe
          führt zum Fall, dass die Praxis noch kein Partner ist.
        </p>
      </div>

      {/* Search field */}
      <div className="mb-1">
        <label
          htmlFor="search"
          className="block text-sm font-medium text-stone-700 mb-1.5"
        >
          Bei welcher Praxis ist Ihr Tier in Behandlung?
        </label>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4 pointer-events-none" />
          <input
            id="search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Name, Ort oder PLZ"
            autoFocus
            className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-xl text-stone-900 placeholder:text-stone-400 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <ul className="mt-3 space-y-2">
          {results.map((p) => (
            <li key={p.id}>
              <button
                onClick={() => onSelect(p)}
                className="w-full text-left p-4 bg-white border border-stone-200 rounded-xl shadow-sm hover:border-teal-400 hover:bg-teal-50 transition-colors group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-stone-900 group-hover:text-teal-800 truncate">
                      {p.name}
                    </p>
                    <p className="text-sm text-stone-500 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      {p.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs bg-teal-50 text-teal-700 border border-teal-200 rounded-full px-2.5 py-0.5 font-medium">
                      Partnerpraxis
                    </span>
                    <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-teal-500 transition-colors" />
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Empty state before first search */}
      {!hasQuery && (
        <p className="mt-3 text-sm text-stone-400">
          Rezepte laufen immer über Ihre eigene Praxis. Deshalb suchen Sie sie
          hier zuerst.
        </p>
      )}

      {/* No result → invite flow */}
      {showNoResult && !inviteSent && (
        <div className="mt-4 bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-stone-100">
            <p className="font-medium text-stone-900 mb-1">
              Ihre Praxis ist noch kein Partner
            </p>
            <p className="text-sm text-stone-500 leading-relaxed">
              Das lässt sich ändern. Wir laden Ihre Praxis ein. Sobald sie
              mitmacht, bekommen Sie Bescheid und stellen Ihre erste Anfrage.
            </p>
          </div>

          <form onSubmit={handleInviteSubmit} className="p-5 space-y-4">
            <div>
              <label
                htmlFor="practice-info"
                className="block text-sm font-medium text-stone-700 mb-1.5"
              >
                Name oder Ort Ihrer Praxis
              </label>
              <input
                id="practice-info"
                type="text"
                value={inviteForm.practiceInfo}
                onChange={(e) =>
                  setInviteForm((f) => ({ ...f, practiceInfo: e.target.value }))
                }
                placeholder="z. B. Tierarztpraxis Dr. Hoffmann, Nordhausen"
                required
                className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="invite-email"
                className="block text-sm font-medium text-stone-700 mb-1.5"
              >
                Ihre E-Mail-Adresse
              </label>
              <input
                id="invite-email"
                type="email"
                value={inviteForm.email}
                onChange={(e) =>
                  setInviteForm((f) => ({ ...f, email: e.target.value }))
                }
                placeholder="ihre@email.de"
                required
                className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={!inviteForm.practiceInfo.trim() || !inviteForm.email.trim()}
              className="w-full bg-teal-700 text-white py-2.5 rounded-full shadow-sm text-sm font-medium hover:bg-teal-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Praxis einladen
            </button>
          </form>
        </div>
      )}

      {/* Invite sent confirmation */}
      {inviteSent && (
        <div className="mt-4 p-5 bg-teal-50 border border-teal-200 rounded-xl">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-teal-900">
                Danke, das ist unterwegs.
              </p>
              <p className="text-sm text-teal-700 mt-1 leading-relaxed">
                Wir schreiben Ihre Praxis an. Sobald sie dabei ist, bekommen
                Sie eine E-Mail an <strong>{inviteForm.email}</strong>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
