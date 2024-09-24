/* eslint-disable react/prop-types */
import { useState,useEffect } from "react";
import { useAnswers } from "../context/answersContext";

export default function StepForm(){
  // Context das respostas
  const {data,updateSetData} = useAnswers();
  // Estado para receber as perguntas da API
  const [perguntas, setPerguntas] = useState([]);
  // Estado para receber as materias da API de acordo com a turma
  const [materias, setMaterias] = useState([]);
  
  const t =["Sempre","Quase sempre","Ás vezes","Raramente","Nunca"];
  
  // Realiza a requisição das tabelas de perguntas e matérias
  useEffect(()=>{
    async function fetchData() {

      const perguntasResponse = await fetch("http://localhost:3333/perguntas");
      const perguntasData = await perguntasResponse.json();
      setPerguntas(perguntasData);
      updateSetData('perguntas' ,perguntasData);

      const materiasResponse = await fetch(`http://localhost:3333/relacaoAulas/${data.turma}`);
      const materiasData = await materiasResponse.json();
      setMaterias(materiasData);

      if (data.materias.length > 0){
        const arrayFiltrado = await materiasData.filter(objeto => data.materias.includes(objeto.id_materia));
        setMaterias(arrayFiltrado);
        updateSetData('materias' ,arrayFiltrado);
      }else{
        updateSetData('materias' ,materiasData);
      }
    }
    fetchData();
  },[])


  // Renderiza os dados das tabelas
  return (
    <>
      <h1 className="text-2xl font-bold text-green-900 text-center">FICHA DE AVALIAÇÃO DO <br/> DOCENTE PELO DISCENTE DO IFNMG </h1>
      <p className="text-base font-normal  text-center">(Aprovado pela resolução CONSUP Nº 79, de 23 de dezembro de 2019)</p>

      <div>
        {/* MAPEANDO POR PERGUNTA */}
        {perguntas.map((pergunta) => (
          //SE FOR DE MARCAR
          pergunta.tipo === "F" ? (
            <div className="grid grid-cols-5 gap-y-4 mt-7" key={pergunta.id}>
              <h3 key={pergunta.id} className="font-medium col-span-5">{`${pergunta.id}. ${pergunta.pergunta}`}</h3>
              {/* PASSANDO O TEXTO DAS OPÇÕES */}
              <div className="col-start-3 col-end-6 text-xs flex justify-around ">
                {t.map((item, index) => (
                  <p key={index} className={`P${index}`}>{item}</p>
                ))}
              </div>
              {/* MAPEANDO AS MATERIAS */}
              {materias.map((materia) => (
              
                <div key={materia.id_materia} className="grid grid-cols-subgrid col-span-5 "> 
                  <div className="text-sm font-medium col-start-1 col-end-3">
                    <h2 >{materia.materias.materia}</h2>
                    <h2 >{materia.professores.nome}</h2>
                  </div>
                  <div className=" col-start-3 col-end-6 flex justify-around">
                    <input type="radio" name={`${pergunta.id}${materia.id_materia}${materia.id_professor}`}  id="" value="4" required />
                    <input type="radio" name={`${pergunta.id}${materia.id_materia}${materia.id_professor}`}  id="" value="3" required />
                    <input type="radio" name={`${pergunta.id}${materia.id_materia}${materia.id_professor}`}  id="" value="2" required />
                    <input type="radio" name={`${pergunta.id}${materia.id_materia}${materia.id_professor}`}  id="" value="1" required />
                    <input type="radio" name={`${pergunta.id}${materia.id_materia}${materia.id_professor}`}  id="" value="0" required />
                  </div>
                </div>
              ))}

            </div>
        ) : (
          <div key={pergunta.id}>
            <h3 key={pergunta.id} className="font-medium mt-7">{`${pergunta.id}. ${pergunta.pergunta}`}</h3>
            {materias.map((materia) => (
              
              <div key={materia.id_materia} className="mt-8" >
                <h2 key={materia.id_materia}>{`${materia.materias.materia} (${materia.professores.nome})`}</h2>
                
                <input type="text" className="border rounded-md h-20 p-5" maxLength={200} placeholder="Escreva aqui..." name={`${pergunta.id}${materia.id_materia}${materia.id_professor}`} id="" />
              </div>
              
            ))}
          </div>
        )
      ))}
    </div>
    </>
  );
}