import { useState } from "react";
import { useAnswers } from "../context/answersContext";
import api from '../services/api';

export default function useForm(steps){
    const [currentStep,setCurrentStep] = useState(0);
    const {data} = useAnswers();

    async function lastStep(){
        // Aqui fica o código para enviar os dados do formulario para a API
        const form = document.getElementById('form');
        let radioInputs = form.querySelectorAll('input[type="radio"]:checked');
        radioInputs = Array.from(radioInputs)

        let textInputs = form.querySelectorAll('input[type="text"]');
        textInputs = Array.from(textInputs)

        const formRespostas = data.perguntas.flatMap((pergunta)=>{
            if(pergunta.tipo == 'F'){
                return data.materias.map((materia)=>{
                    const radio = radioInputs.find(item => item.name == `${pergunta.id}${materia.id_materia}${materia.id_professor}`);
                    return {
                        pergunta_id: pergunta.id,
                        materia_id: materia.id_materia,
                        resposta: null,
                        avaliacao: radio.value,
                        professor_id: materia.id_professor,
                        turma_id: data.turma
                    }
                })
            }else{
                return data.materias.map((materia)=>{
                    const text = textInputs.find(item => item.name == `${pergunta.id}${materia.id_materia}${materia.id_professor}`);
                    return {
                        pergunta_id: pergunta.id,
                        materia_id: materia.id_materia,
                        resposta: text.value,
                        avaliacao: null,
                        professor_id: materia.id_professor,
                        turma_id: data.turma
                    }
                })
            }
        })

        console.log(formRespostas)
        await api.post('/relacaoAulas', {respostas:formRespostas})
        .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.error(error);
          });
    }

    function updateSteps(i,e){
        if(e) e.preventDefault();
        // código funcional que impede ir antes da primeira etapa e depois da ultima etapa
        // if(i<0 || i>= steps.length)return;
        if(i<0){
            return

        }else if(i>= steps.length){
            lastStep();

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
