/* eslint-disable react/prop-types */
import { useEffect,useState } from "react";
import { useAnswers } from "../context/answersContext";
import api from "../services/api";

export default function Step4(){
    const {data, updateSetData} = useAnswers();
    // Para exibir as turmas do tipo ensino selecionado
    const [turmas, setTurmas] = useState([]);
    useEffect(()=>{
        async function FetchData(){
            try {
                const response = await api.get(`/turmas/${data.tipoEnsino}`);
                setTurmas(response.data)
              } catch (error) {
                console.error(error);
            }
        };
        FetchData();
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
