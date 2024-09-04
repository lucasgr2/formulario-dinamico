/* eslint-disable react/jsx-key */
import logoif from '../assets/logoif.png';
// Estado das etapas
import  UseForm  from '../hooks/stepContext.jsx';

// Etapas do Formulário
import FormStart from './step1.jsx';
//import FormTerm from './formTerm';
//import FormType from './formType';
//import FormTurma from './formTurma';


export default function FormularioLayout(){ 
    
     
    const FormsComponents = [
        <FormStart />,
        //<FormTerm />,
        //<FormType />,
        //<FormTurma />,
        //  ...(data.tipoEnsino === "Superior"
        //    ? [
        //        <FormDisciplina key="disciplina1" />,
        //        <FormFinal key="final" />
        //      ]
        //    : [
        //        <FormFinal key="final" />
        //      ])
       ];

     const {currentStep, currentComponent, updateSteps, isFirstStep} = UseForm(FormsComponents);

     let buttonName ="";
     if(currentStep===0){ buttonName = "Iniciar"}else {buttonName="Avançar";}
    return(
        <div className='max-w-lg m-auto my-5 shadow-xl rounded-lg p-3'>
            <div>
                <img className='logoif' src={logoif} alt="" />
            </div>
            <form onSubmit={(e)=>updateSteps(currentStep+1,e)}>
                <div>
                    {currentComponent}
                </div><br /><br />
                <div className='flex justify-evenly'>
                    {!isFirstStep &&
                        <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' type="button" onClick={()=>updateSteps(currentStep-1)}>
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