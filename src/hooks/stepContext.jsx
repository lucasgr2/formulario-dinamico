import { useState } from "react";

export default function useForm(steps){
    const [currentStep,setCurrentStep] = useState(0);
    
    function updateSteps(i,e){
        if(e) e.preventDefault();
        if(i<0 || i>= steps.length)return;
        setCurrentStep(i);
    }

    return {
        currentStep,
        currentComponent: steps[currentStep],
        updateSteps,
        isFirstStep: currentStep === 0 ? true:false,
    };
}


// Primeiro defini um array onde cada dado é um componente há ser apresentado
