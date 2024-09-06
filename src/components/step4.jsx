/* eslint-disable react/prop-types */
import { useEffect,useState } from "react";
import { useAnswers } from "../context/answersContext";

export default function Step4(){
    const {data, updateSetData} = useAnswers();
    // Para exibir as turmas do tipo ensino selecionado
    const [turmas, setTurmas] = useState([]);
    useEffect(()=>{
        fetch(`http://localhost:3333/turmas/${data.tipoEnsino}`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
            },
        })
            .then((response)=>response.json())
            .then((data)=>{setTurmas(data)})
            .catch((err)=>console.log(err))
    },[])
    //Para passar para o formulario as materias da respectiva turma
    return(
        <>
            <h1 className="form__titulo">Ensino {data.tipoEnsino}</h1>
            <div className="form__options__container" >
            {turmas.map((turma)=>
                    <label key={turma.id}>
                    <input type="radio" className="radio-input" name="turma" value= {turma.turma} id={turma.id} key={turma.id} checked ={data.turma==turma.id} onChange={(e)=>{updateSetData("turma",e.target.id)}} required/>
                    <span className="radio-tile">
                        <span className="radio-label">{turma.turma}</span>
                    </span>
                    </label>
            )}
            </div>
        </>           
    )
      
  }
