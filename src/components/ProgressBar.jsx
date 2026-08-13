import { Check } from 'lucide-react'

const STEPS = [
  { n: 1, label: 'Tier & Medikament' },
  { n: 2, label: 'Apotheke' },
  { n: 3, label: 'Kontakt' },
  { n: 4, label: 'Bestätigung' },
]

export default function ProgressBar({ currentStep }) {
  return (
    <div className="bg-white border-b border-stone-100">
      <div className="max-w-2xl mx-auto px-6 py-4">
        <div className="flex items-center">
          {STEPS.map((s, i) => {
            const isDone = currentStep > s.n
            const isCurrent = currentStep === s.n

            return (
              <div key={s.n} className="flex items-center flex-1 last:flex-none">
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 transition-colors ${
                      isDone
                        ? 'bg-teal-600 text-white'
                        : isCurrent
                        ? 'bg-teal-600 text-white ring-4 ring-teal-100'
                        : 'bg-stone-200 text-stone-400'
                    }`}
                  >
                    {isDone ? <Check className="w-3.5 h-3.5" /> : s.n}
                  </div>
                  <span
                    className={`text-xs hidden sm:block whitespace-nowrap ${
                      isCurrent
                        ? 'text-stone-900 font-medium'
                        : isDone
                        ? 'text-stone-500'
                        : 'text-stone-400'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>

                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-3 transition-colors ${
                      currentStep > s.n ? 'bg-teal-300' : 'bg-stone-200'
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
