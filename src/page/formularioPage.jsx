/* eslint-disable react/prop-types */
import { useState } from 'react'
import FormularioLayout from '../components/formulariolayout.jsx';
import { AnswersProvider } from '../context/answersContext.jsx';
import FormDesativadoPage from './formDesativadoPage.jsx';
import FormRespondidoPage from './formRespondidoPage.jsx';
import FormSucessoPage from './formSucessoPage.jsx';
 //O status pode ser = 0 (Form Desativado) , 1 (Já Respondido) , 2 (Disponivel) , 3 (Enviado com Sucesso)
function FormularioPage() {
  //ESSE STATE DEVE SER FORNECIDO PELO CONTEXT DE LOGIN NA APLICAÇÃO FINAL
  const [status, setStatus] = useState(1);
  if(status == 0){
    return( <FormDesativadoPage/> )
  }else if(status == 1){
    return( <FormRespondidoPage status = {status} setStatus = {setStatus}/> )
  }else if(status == 2){
    return (
      <AnswersProvider>
        <FormularioLayout {...status}/>
      </AnswersProvider>   
    )
  }else if(status == 3){
    return( <FormSucessoPage/> )
  }
}

export default FormularioPage;
