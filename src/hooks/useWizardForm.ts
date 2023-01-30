import { ReactElement, useState } from "react";

export const useWizardForm = (forms: ReactElement[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const next = () => setCurrentStepIndex(prev => {
    if (prev === forms.length - 1) return prev
    return prev + 1
  })

  const back = () => setCurrentStepIndex(prev => {
    if (prev === 0) return prev
    return prev - 1
  })

  return {
    currentForm: forms[currentStepIndex],
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === forms.length - 1,
    next,
    back
  }
}
