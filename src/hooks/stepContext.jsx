import { useState } from "react";

export default function useForm(steps){
    const [currentStep,setCurrentStep] = useState(0);
    
    function updateSteps(i,e){
        if(e) e.preventDefault();
        // código funcional que impede ir antes da primeira etapa e depois da ultima etapa
        // if(i<0 || i>= steps.length)return;
        if(i<0){
            return
        }else if(i>= steps.length){
            // Aqui fica o código para enviar os dados do formulario para a API
            const form = document.getElementById('form');
            const radioInputs = form.querySelectorAll('input[type="radio"]:checked');
            console.log(radioInputs[0].value)
        }else{
            setCurrentStep(i);
        }
    }

    return {
        currentStep,
        currentComponent: steps[currentStep],
        updateSteps,
        isFirstStep: currentStep === 0 ? true:false,
    };
}


// Primeiro defini um array onde cada dado é um componente há ser apresentado
