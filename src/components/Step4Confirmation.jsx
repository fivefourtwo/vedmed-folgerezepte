import { useState } from 'react'
import { track } from '@vercel/analytics'
import { CheckCircle, Clock, User, QrCode, UserRound } from 'lucide-react'
import { PHARMACIES } from '../data'

/* Deterministic pseudo QR code, prototype only */
function PseudoQr() {
  const size = 21
  let seed = 42
  const rand = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648
    return seed / 2147483648
  }

  const inFinder = (x, y) => {
    const corners = [
      [0, 0],
      [size - 7, 0],
      [0, size - 7],
    ]
    return corners.some(([cx, cy]) => {
      const dx = x - cx
      const dy = y - cy
      if (dx < 0 || dx > 6 || dy < 0 || dy > 6) return false
      const ring = Math.min(dx, dy, 6 - dx, 6 - dy)
      return ring === 0 || ring >= 2
    })
  }

  const cells = []
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const nearFinder =
        (x < 8 && y < 8) || (x >= size - 8 && y < 8) || (x < 8 && y >= size - 8)
      const filled = nearFinder ? inFinder(x, y) : rand() > 0.5
      if (filled) cells.push([x, y])
    }
  }

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-32 h-32"
      shapeRendering="crispEdges"
      role="img"
      aria-label="QR-Code mit Ihren Angaben"
    >
      <rect width={size} height={size} fill="white" />
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#111827" />
      ))}
    </svg>
  )
}

export default function Step4Confirmation({
  practice,
  petData,
  pharmacyData,
  contactData,
}) {
  const [saveChoice, setSaveChoice] = useState(null)

  const chooseSave = (choice) => {
    track('daten_gesichert', { art: choice })
    setSaveChoice(choice)
  }

  const pharmacy = PHARMACIES.find((p) => p.id === pharmacyData.pharmacyId)
  const isDelivery = pharmacyData.deliveryType === 'delivery'

  return (
    <div className="w-full">
      {/* Success header */}
      <div className="flex items-start gap-4 mb-8">
        <CheckCircle className="w-9 h-9 text-teal-600 flex-shrink-0 mt-0.5" />
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            Anfrage abgeschickt
          </h2>
          <p className="text-sm text-stone-500 mt-0.5">
            Die Bestätigung geht an {contactData.email}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* What happens now */}
        <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-5">
          <h3 className="text-sm font-semibold text-stone-900 mb-4">
            Was passiert jetzt?
          </h3>
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                1
              </span>
              <p className="text-sm text-stone-700 leading-relaxed">
                <strong>{practice?.name}</strong> bekommt Ihre Anfrage und
                prüft, ob es ein Folgerezept für <strong>{petData.name}</strong>{' '}
                gibt.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                2
              </span>
              <p className="text-sm text-stone-700 leading-relaxed">
                Stellt die Praxis das Rezept aus, geht es direkt an{' '}
                <strong>{pharmacy?.name}</strong>.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                3
              </span>
              <p className="text-sm text-stone-700 leading-relaxed">
                {isDelivery ? (
                  <>
                    Die Apotheke schickt <strong>{petData.medication}</strong>{' '}
                    an Sie los. Sie bekommen eine Versandbestätigung.
                  </>
                ) : (
                  <>
                    Die Apotheke legt <strong>{petData.medication}</strong> für
                    Sie bereit und meldet sich, sobald Sie abholen können.
                  </>
                )}
              </p>
            </li>
          </ol>
        </div>

        {/* Who's next + timing */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <User className="w-3.5 h-3.5 text-stone-400" />
              <p className="text-xs font-medium text-stone-400 uppercase tracking-wide">
                Als Nächstes
              </p>
            </div>
            <p className="text-sm text-stone-800">
              Ihre Praxis prüft die Anfrage.
            </p>
          </div>
          <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <p className="text-xs font-medium text-stone-400 uppercase tracking-wide">
                Wie lange?
              </p>
            </div>
            <p className="text-sm text-stone-800">Meist ein bis zwei Werktage.</p>
          </div>
        </div>

        {/* Vet decides — this stays a request, not an order */}
        <div className="border-l-4 border-teal-500 bg-teal-50 rounded-r-lg px-4 py-3">
          <p className="text-sm text-stone-800 leading-relaxed">
            <strong>Ihre Anfrage ist unverbindlich.</strong> Ob es ein Rezept
            gibt, entscheidet Ihre Tierärztin oder Ihr Tierarzt, nicht VedMed.
          </p>
        </div>

        {/* Save for next time — this is where the account becomes tangible */}
        <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-5">
          <h3 className="text-sm font-semibold text-stone-900 mb-1">
            Für die nächste Anfrage
          </h3>
          <p className="text-sm text-stone-500 leading-relaxed mb-4">
            Sichern Sie Ihre Angaben, dann ist die nächste Anfrage in wenigen
            Klicks fertig. Sie entscheiden, wo die Daten liegen.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => chooseSave('profile')}
              className={`flex flex-col items-start gap-2 p-4 border rounded-xl text-left transition-colors ${
                saveChoice === 'profile'
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <UserRound className="w-5 h-5 text-stone-500" />
              <span className="text-sm font-medium text-stone-900">
                Im Profil speichern
              </span>
              <span className="text-xs text-stone-500 leading-relaxed">
                Tier, Medikament und Apotheke bleiben bei VedMed hinterlegt.
                Ihren Zugangslink bekommen Sie per E-Mail.
              </span>
            </button>

            <button
              type="button"
              onClick={() => chooseSave('qr')}
              className={`flex flex-col items-start gap-2 p-4 border rounded-xl text-left transition-colors ${
                saveChoice === 'qr'
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <QrCode className="w-5 h-5 text-stone-500" />
              <span className="text-sm font-medium text-stone-900">
                Als QR-Code sichern
              </span>
              <span className="text-xs text-stone-500 leading-relaxed">
                Ihre Angaben stecken im Code und bleiben auf Ihrem Gerät. Beim
                nächsten Mal scannen Sie ihn, alles ist wieder ausgefüllt.
              </span>
            </button>
          </div>

          {saveChoice === 'profile' && (
            <div className="flex items-start gap-2.5 mt-4 pt-4 border-t border-stone-100">
              <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-stone-700 leading-relaxed">
                Erledigt. Der Zugangslink geht an{' '}
                <strong>{contactData.email}</strong>. Kein Passwort nötig.
              </p>
            </div>
          )}

          {saveChoice === 'qr' && (
            <div className="flex items-start gap-4 mt-4 pt-4 border-t border-stone-100">
              <div className="border border-stone-200 rounded-xl p-2 flex-shrink-0">
                <PseudoQr />
              </div>
              <p className="text-sm text-stone-700 leading-relaxed pt-1">
                Speichern Sie das Bild dort, wo Sie es wiederfinden. VedMed
                behält keine Kopie Ihrer Angaben.
              </p>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-stone-50 border border-stone-100 rounded-xl p-4">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">
            Ihre Anfrage
          </p>
          <dl className="space-y-2 text-sm">
            <div className="flex gap-3">
              <dt className="text-stone-400 w-24 flex-shrink-0">Tier</dt>
              <dd className="text-stone-800">
                {petData.name}
                {petData.type ? ` (${petData.type})` : ''}
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-stone-400 w-24 flex-shrink-0">Medikament</dt>
              <dd className="text-stone-800">
                {petData.medication}, {petData.amount} Tabletten,{' '}
                {petData.dosage} pro Tag
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-stone-400 w-24 flex-shrink-0">Praxis</dt>
              <dd className="text-stone-800">{practice?.name}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-stone-400 w-24 flex-shrink-0">Apotheke</dt>
              <dd className="text-stone-800">
                {pharmacy?.name} · {isDelivery ? 'Versand' : 'Abholung'}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
