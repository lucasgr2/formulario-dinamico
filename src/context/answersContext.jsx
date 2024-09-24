/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react"

const answersContext = createContext({});

const answersTemplate = {
    tipoEnsino: "",
    turma:"",
    perguntas:[],
    materias: [],
    respostas: [],
}

function AnswersProvider({children}){
    const [data,setData] = useState(answersTemplate);
    const updateSetData = (itemTemplate, valor)=>{
        setData((prev)=>({...prev,[itemTemplate]:valor}))
    };

    return(
        <answersContext.Provider value ={{data,updateSetData}}>
            {children}
        </answersContext.Provider>
    )
}

function useAnswers(){
    const context = useContext(answersContext);
    return context;
}

export {answersContext, AnswersProvider, useAnswers};