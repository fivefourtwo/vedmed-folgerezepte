import { useState } from 'react'
import { Package, Store } from 'lucide-react'
import { PHARMACIES } from '../data'

export default function Step2Pharmacy({ data, onChange, onBack, onNext }) {
  const [submitted, setSubmitted] = useState(false)

  const selectedPharmacy = PHARMACIES.find((p) => p.id === data.pharmacyId)
  const isValid = data.pharmacyId !== null && data.deliveryType !== null

  const handlePharmacySelect = (id) => {
    onChange((prev) => ({ ...prev, pharmacyId: id, deliveryType: null }))
  }

  const handleDeliverySelect = (type) => {
    onChange((prev) => ({ ...prev, deliveryType: type }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    if (isValid) onNext()
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-stone-900 mb-1.5">
        Apotheke und Zustellung
      </h2>
      <p className="text-sm text-stone-500 leading-relaxed mb-4">
        Wählen Sie eine Apotheke. Ob Abholung oder Versand, legen Sie danach fest.
      </p>

      {/* Cost note — answers "Kostet das etwas?" exactly where the user first thinks about money */}
      <div className="border-l-4 border-teal-500 bg-teal-50 rounded-r-lg px-4 py-3 mb-7">
        <p className="text-sm text-stone-800 leading-relaxed">
          <strong>VedMed kostet Sie nichts.</strong> Medikament und
          Rezeptgebühr zahlen Sie direkt an die Apotheke.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Pharmacy selection */}
        <div>
          <p className="text-sm font-medium text-stone-700 mb-2.5">
            Apotheke wählen
          </p>
          <div className="space-y-2">
            {PHARMACIES.map((pharmacy) => {
              const isSelected = data.pharmacyId === pharmacy.id
              return (
                <label
                  key={pharmacy.id}
                  className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="pharmacy"
                    value={pharmacy.id}
                    checked={isSelected}
                    onChange={() => handlePharmacySelect(pharmacy.id)}
                    className="mt-0.5 accent-teal-600 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-stone-900">
                      {pharmacy.name}
                    </p>
                    <p className="text-xs text-stone-500 mt-0.5">{pharmacy.city}</p>
                    {pharmacy.canDeliver ? (
                      <p className="text-xs text-stone-400 mt-0.5">
                        Versand möglich · {pharmacy.deliveryNote}
                      </p>
                    ) : (
                      <p className="text-xs text-stone-400 mt-0.5">
                        Nur Abholung
                      </p>
                    )}
                  </div>
                </label>
              )
            })}
          </div>
          {submitted && !data.pharmacyId && (
            <p className="text-xs text-red-500 mt-2">
              Bitte wählen Sie eine Apotheke.
            </p>
          )}
        </div>

        {/* Delivery type — only shown after pharmacy is selected */}
        {selectedPharmacy && (
          <div>
            <p className="text-sm font-medium text-stone-700 mb-2.5">
              Abholen oder liefern lassen?
            </p>
            <div className="grid grid-cols-2 gap-3">
              {/* Pickup — always available */}
              <label
                className={`flex flex-col items-center gap-2.5 p-4 border rounded-xl cursor-pointer transition-colors ${
                  data.deliveryType === 'pickup'
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value="pickup"
                  checked={data.deliveryType === 'pickup'}
                  onChange={() => handleDeliverySelect('pickup')}
                  className="sr-only"
                />
                <Store className="w-5 h-5 text-stone-500" />
                <div className="text-center">
                  <p className="text-sm font-medium text-stone-900">Abholung</p>
                  <p className="text-xs text-stone-500 mt-0.5">In der Apotheke</p>
                </div>
              </label>

              {/* Delivery — disabled if pharmacy can't deliver */}
              <label
                className={`flex flex-col items-center gap-2.5 p-4 border rounded-xl transition-colors ${
                  !selectedPharmacy.canDeliver
                    ? 'border-stone-100 bg-stone-50 opacity-50 cursor-not-allowed'
                    : data.deliveryType === 'delivery'
                    ? 'border-teal-500 bg-teal-50 cursor-pointer'
                    : 'border-stone-200 bg-white hover:border-stone-300 cursor-pointer'
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value="delivery"
                  checked={data.deliveryType === 'delivery'}
                  disabled={!selectedPharmacy.canDeliver}
                  onChange={() =>
                    selectedPharmacy.canDeliver && handleDeliverySelect('delivery')
                  }
                  className="sr-only"
                />
                <Package className="w-5 h-5 text-stone-500" />
                <div className="text-center">
                  <p className="text-sm font-medium text-stone-900">Lieferung</p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {selectedPharmacy.canDeliver
                      ? selectedPharmacy.deliveryNote
                      : 'Nicht verfügbar'}
                  </p>
                </div>
              </label>
            </div>
            {submitted && !data.deliveryType && (
              <p className="text-xs text-red-500 mt-2">
                Bitte wählen Sie Abholung oder Lieferung.
              </p>
            )}
          </div>
        )}

        <div className="flex justify-between items-center pt-1">
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
            Weiter zu Kontaktdaten
          </button>
        </div>
      </form>
    </div>
  )
}
