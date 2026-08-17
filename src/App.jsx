import { useState } from 'react'
import { track } from '@vercel/analytics'
import { PawPrint } from 'lucide-react'
import ProgressBar from './components/ProgressBar'
import Step0Search from './components/Step0Search'
import Step1Pet from './components/Step1Pet'
import Step2Pharmacy from './components/Step2Pharmacy'
import Step3Contact from './components/Step3Contact'
import Step4Confirmation from './components/Step4Confirmation'

export default function App() {
  const [step, setStep] = useState(0)
  const [selectedPractice, setSelectedPractice] = useState(null)
  const [petData, setPetData] = useState({ name: '', type: '', medication: '', amount: '', dosage: '' })
  const [pharmacyData, setPharmacyData] = useState({ pharmacyId: null, deliveryType: null })
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    zip: '',
    city: '',
  })

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <header className="bg-white border-b border-stone-100 sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setStep(0)}
            className="flex items-center gap-2.5 group"
          >
            <span className="w-9 h-9 rounded-xl bg-teal-700 flex items-center justify-center shadow-sm group-hover:bg-teal-800 transition-colors">
              <PawPrint className="w-[18px] h-[18px] text-white" />
            </span>
            <span className="flex flex-col items-start leading-tight">
              <span className="text-lg font-semibold text-stone-900 tracking-tight">
                VedMed
              </span>
              <span className="text-[11px] text-stone-400">
                Folgerezepte für Ihr Tier
              </span>
            </span>
          </button>
          {step >= 1 && step <= 4 && (
            <span className="text-sm text-stone-400">
              Schritt {step} von 4
            </span>
          )}
        </div>
      </header>

      {step >= 1 && step <= 4 && <ProgressBar currentStep={step} />}

      <main className="max-w-2xl mx-auto px-6 py-10">
        {step === 0 && (
          <Step0Search
            onSelect={(practice) => {
              track('praxis_gewaehlt')
              setSelectedPractice(practice)
              setStep(1)
            }}
          />
        )}

        {step === 1 && (
          <Step1Pet
            practice={selectedPractice}
            data={petData}
            onChange={setPetData}
            onBack={() => setStep(0)}
            onNext={() => {
              track('tier_und_medikament_angegeben')
              setStep(2)
            }}
          />
        )}

        {step === 2 && (
          <Step2Pharmacy
            data={pharmacyData}
            onChange={setPharmacyData}
            onBack={() => setStep(1)}
            onNext={() => {
              track('apotheke_gewaehlt')
              setStep(3)
            }}
          />
        )}

        {step === 3 && (
          <Step3Contact
            data={contactData}
            onChange={setContactData}
            isDelivery={pharmacyData.deliveryType === 'delivery'}
            onBack={() => setStep(2)}
            onNext={() => {
              track('anfrage_abgeschickt')
              setStep(4)
            }}
          />
        )}

        {step === 4 && (
          <Step4Confirmation
            practice={selectedPractice}
            petData={petData}
            pharmacyData={pharmacyData}
            contactData={contactData}
          />
        )}
      </main>
    </div>
  )
}
