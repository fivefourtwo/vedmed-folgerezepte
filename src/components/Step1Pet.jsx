import { useState } from 'react'
import { Building2, Info, Dog, Cat, Rabbit, Bird, PawPrint, MoreHorizontal } from 'lucide-react'
import { PET_TYPES } from '../data'

const PET_ICONS = {
  Hund: Dog,
  Katze: Cat,
  Kleintier: Rabbit,
  Vogel: Bird,
  Pferd: PawPrint,
  Sonstiges: MoreHorizontal,
}

export default function Step1Pet({ practice, data, onChange, onBack, onNext }) {
  const [touched, setTouched] = useState({})

  const isNum = (v) => v !== '' && Number(v) > 0

  const isValid =
    data.name.trim() &&
    data.type &&
    data.medication.trim() &&
    isNum(data.amount) &&
    isNum(data.dosage)

  const handleChange = (field, value) => {
    onChange((prev) => ({ ...prev, [field]: value }))
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched({ name: true, type: true, medication: true, amount: true, dosage: true })
    if (isValid) onNext()
  }

  const showError = (field, check) => touched[field] && !check

  const fieldClass = (invalid) =>
    `w-full px-3 py-2.5 border rounded-xl text-sm text-stone-900 placeholder:text-stone-400 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
      invalid ? 'border-red-300 bg-red-50' : 'border-stone-200'
    }`

  const numWrapClass = (invalid) =>
    `flex items-center border rounded-xl bg-white focus-within:ring-2 focus-within:ring-teal-500 ${
      invalid ? 'border-red-300' : 'border-stone-200'
    }`

  return (
    <div className="w-full">
      {/* Selected practice — reassurance that we're on track */}
      <div className="flex items-center gap-2 text-sm text-teal-800 bg-teal-50 border border-teal-200 rounded-xl px-4 py-2.5 mb-7">
        <Building2 className="w-4 h-4 flex-shrink-0" />
        <span>
          Anfrage an: <strong>{practice?.name}</strong>
        </span>
      </div>

      <h2 className="text-xl font-semibold text-stone-900 mb-1.5">
        Tier und Medikament
      </h2>
      <p className="text-sm text-stone-500 leading-relaxed mb-4">
        Diese Angaben gehen an Ihre Praxis.
      </p>

      {/* Trust note: this is a request, not an order */}
      <div className="border-l-4 border-teal-500 bg-teal-50 rounded-r-lg px-4 py-3 mb-7">
        <p className="text-sm text-stone-800 leading-relaxed">
          <strong>Das ist eine Anfrage, keine Bestellung.</strong> Ob es ein
          Rezept gibt, entscheidet Ihre Tierärztin oder Ihr Tierarzt.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Pet type — icon cards instead of a dropdown */}
        <div>
          <p className="text-sm font-medium text-stone-700 mb-1.5">Tierart</p>
          <div className="grid grid-cols-3 gap-2.5">
            {PET_TYPES.map(({ value, hint }) => {
              const Icon = PET_ICONS[value]
              const isSelected = data.type === value
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleChange('type', value)}
                  className={`flex flex-col items-center gap-1.5 px-3 py-4 border rounded-xl transition-colors ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50 shadow-sm'
                      : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      isSelected ? 'text-teal-700' : 'text-stone-400'
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      isSelected ? 'text-teal-800' : 'text-stone-700'
                    }`}
                  >
                    {value}
                  </span>
                  {hint && (
                    <span className="text-[11px] text-stone-400 leading-tight text-center">
                      {hint}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
          {showError('type', data.type) && (
            <p className="text-xs text-red-500 mt-2">
              Bitte wählen Sie eine Tierart.
            </p>
          )}
        </div>

        {/* Pet name */}
        <div>
          <label
            htmlFor="pet-name"
            className="block text-sm font-medium text-stone-700 mb-1.5"
          >
            Name des Tieres
          </label>
          <input
            id="pet-name"
            type="text"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="z. B. Bello"
            className={fieldClass(showError('name', data.name.trim()))}
          />
          {showError('name', data.name.trim()) && (
            <p className="text-xs text-red-500 mt-1">
              Bitte geben Sie einen Namen ein.
            </p>
          )}
        </div>

        {/* Medication */}
        <div>
          <label
            htmlFor="medication"
            className="block text-sm font-medium text-stone-700 mb-1.5"
          >
            Medikament
          </label>
          <input
            id="medication"
            type="text"
            value={data.medication}
            onChange={(e) => handleChange('medication', e.target.value)}
            placeholder="Name des Medikaments"
            className={fieldClass(showError('medication', data.medication.trim()))}
          />
          <p className="flex items-start gap-1.5 text-xs text-stone-500 mt-1.5">
            <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
            Der genaue Name steht auf der Verpackung oder dem letzten Rezept.
          </p>
          {showError('medication', data.medication.trim()) && (
            <p className="text-xs text-red-500 mt-1">
              Bitte geben Sie das Medikament an.
            </p>
          )}
        </div>

        {/* Amount and dosage — numbers only, fixed unit inside the field */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-stone-700 mb-1.5"
            >
              Menge
            </label>
            <div className={numWrapClass(showError('amount', isNum(data.amount)))}>
              <input
                id="amount"
                type="number"
                min="1"
                value={data.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                placeholder="30"
                className="w-full px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 bg-transparent rounded-xl focus:outline-none"
              />
              <span className="pr-3 text-sm text-stone-500 select-none whitespace-nowrap">
                Tabletten
              </span>
            </div>
            {showError('amount', isNum(data.amount)) && (
              <p className="text-xs text-red-500 mt-1">
                Bitte geben Sie eine Zahl ein.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="dosage"
              className="block text-sm font-medium text-stone-700 mb-1.5"
            >
              Dosierung
            </label>
            <div className={numWrapClass(showError('dosage', isNum(data.dosage)))}>
              <input
                id="dosage"
                type="number"
                min="1"
                value={data.dosage}
                onChange={(e) => handleChange('dosage', e.target.value)}
                placeholder="1"
                className="w-full px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 bg-transparent rounded-xl focus:outline-none"
              />
              <span className="pr-3 text-sm text-stone-500 select-none whitespace-nowrap">
                pro Tag
              </span>
            </div>
            {showError('dosage', isNum(data.dosage)) && (
              <p className="text-xs text-red-500 mt-1">
                Bitte geben Sie eine Zahl ein.
              </p>
            )}
          </div>
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
            Weiter zur Apotheke
          </button>
        </div>
      </form>
    </div>
  )
}
