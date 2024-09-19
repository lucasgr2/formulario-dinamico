/* eslint-disable react/jsx-key */
import logoif from '../assets/logoif.png';
// Estado das etapas
import  UseForm  from '../hooks/stepContext.jsx';
// Context das respostas
import { useAnswers } from '../context/answersContext.jsx';

// Etapas do Formulário
import Step1 from './step1.jsx';
import Step2 from './step2.jsx';
import Step3 from './step3.jsx';
import Step4 from './step4.jsx';
import Step5 from './step5.jsx';
import StepForm from './stepform.jsx';


export default function FormularioLayout(){ 
    const {data} = useAnswers();
     
    const FormsComponents = [
        <Step1 />,
        <Step2 />,
        <Step3 />,
        <Step4 />,
          ...(data.tipoEnsino === "Superior"
           ? [
                <Step5 key="disciplina1" />,
                <StepForm key="final" />
              ]
            : [
               <StepForm key="final" />
              ])
       ];

     const {currentStep, currentComponent, updateSteps, isFirstStep} = UseForm(FormsComponents);

     let buttonName ="";
     if(currentStep===0){ buttonName = "Iniciar"}else {buttonName="Avançar";}
    return(
        <div className='max-w-lg m-auto my-5 shadow-xl rounded-lg p-3'>
            <div>
                <img className='logoif' src={logoif} alt="" />
            </div>
            <form id='form' onSubmit={(e)=>updateSteps(currentStep+1,e)}>
                <div>
                    {currentComponent}
                </div><br /><br />
                <div className='flex justify-evenly'>
                    {!isFirstStep &&
                        <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' type="button" onClick={()=>updateSteps(currentStep-1,)}>
                            <span>Voltar</span>
                        </button>
                    }
                    <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' type="submit" >
                        <span>{buttonName}</span>
                    </button>
                </div>
            </form> 
        </div>
    )
}