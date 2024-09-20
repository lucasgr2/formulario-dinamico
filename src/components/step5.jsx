/* eslint-disable react/prop-types */
import { useState,useEffect } from "react";
import { useAnswers } from "../context/answersContext";

export default function Step5(){
    const [materias, setMaterias] = useState([]);
    const {data,updateSetData} = useAnswers();
    useEffect(()=>{
        async function fetchData() {
            const materiasResponse = await fetch(`http://localhost:3333/materias/${data.turma}`);
            const materiasData = await materiasResponse.json();
            setMaterias(materiasData);
        }
        fetchData()
        },[])
        
    return(
        <>
        <h1 className="form__titulo text-2xl font-bold text-green-900 text-center">Seleção de Disciplinas</h1>
        <div className="checkbox__container">
        {materias.map((materia) => (
            <label key={materia.id}>
            <input className="radio-input" type="checkbox" checked={data.materias.includes(materia.id)}
                            onChange={(e) => {
                                const materiaId = materia.id;
                                const isChecked = e.target.checked;
                                const updatedMaterias = isChecked
                                  ? [...data.materias, materiaId] // Adiciona a matéria ao array
                                  : data.materias.filter((id) => id !== materiaId); // Remove a matéria do array
                                updateSetData('materias', updatedMaterias);
                              }}
                        />
            <span className="radio-tile">
                <span className="radio-label">{materia.materia}</span>  
            </span>
            </label>
          ))}
          </div>
        </>
    )
}