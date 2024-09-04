/* eslint-disable react/prop-types */
import { useState,useEffect } from "react";
export default function FormFinal({data,updateSetData}){
  console.log(data)
  const [perguntas, setPerguntas] = useState([]);
  const [materias, setMaterias] = useState([]);
  const t =["Sempre","Quase sempre","Ás vezes","Raramente","Nunca"];
  // Realiza a requisição das tabelas de perguntas e matérias
  useEffect(()=>{
    async function fetchData() {
      const perguntasResponse = await fetch("http://localhost:3333/perguntas");
      const perguntasData = await perguntasResponse.json();
      setPerguntas(perguntasData);
      const materiasResponse = await fetch(`http://localhost:3333/MateriaProfessor/${data.turma}`);
      const materiasData = await materiasResponse.json();
      setMaterias(materiasData);
      if (data.materias.length > 0){
        const arrayFiltrado = await materiasData.filter(objeto => data.materias.includes(objeto.id));
        setMaterias(arrayFiltrado);
      }  
    }
    fetchData()
  },[])
  // Renderiza os dados das tabelas
  return (
    <div className="form__final__container">
      {/* MAPEANDO POR PERGUNTA */}
      {perguntas.map((pergunta) => (
        //SE FOR DE MARCAR
        pergunta.tipo === "F" ? (
          <div key={pergunta.id}>
            <h3 key={pergunta.id} className="final__pergunta__fechada">{`${pergunta.id}. ${pergunta.pergunta}`}</h3>
            {/* PASSANDO O TEXTO DAS OPÇÕES */}
            <div className="form__options">
              {t.map((item, index) => (
                <p key={index} className={`P${index}`}>{item}</p>
              ))}
            </div>
            {/* MAPEANDO AS MATERIAS */}
            {materias.map((materia) => (
              materia.professores.map((professor) => (
                
                <div key={materia.id} className="form__options"> 
                {console.log(professor)}
                <div className="form__options__title">
                  <h2 key={materia.id} className="form__final__text">{materia.materia}</h2>
                  <h2 key={materia.id} className="form__final__text">{professor.nome}</h2>
                </div>

                <input type="radio" name={`${pergunta.id}${materia.id}`} id="" value="0" required />
                <input type="radio" name={`${pergunta.id}${materia.id}`} id="" value="1" required />
                <input type="radio" name={`${pergunta.id}${materia.id}`} id="" value="2" required />
                <input type="radio" name={`${pergunta.id}${materia.id}`} id="" value="3" required />
                <input type="radio" name={`${pergunta.id}${materia.id}`} id="" value="4" required />
              </div>
              ))
            ))}
          </div>
        ) : (
          <div key={pergunta.id}>
            <h3 key={pergunta.id}>{`${pergunta.id}. ${pergunta.pergunta}`}</h3>
            {materias.map((materia) => (
              materia.professores.map((professor) => (
              <div key={materia.id}>
                <h2 key={materia.id}>{materia.materia}</h2>
                <h2 key={materia.id}>{professor.nome}</h2>
                <br></br><br></br>
                <input type="text" name={`${pergunta.id}${materia.idMateria}`} id="" />
              </div>
              ))
            ))}
          </div>
        )
      ))}
    </div>
  );
}