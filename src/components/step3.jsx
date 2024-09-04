/* eslint-disable react/prop-types */
import { useAnswers } from "../../hooks/answersContext";

function FormType(){
  const{data,updateSetData} = useAnswers();
  return(
    <div>
      <h1 className='form__titulo'>Tipo de Ensino</h1>
      <div className="form__options__container">
        <label>
          <input className="radio-input" type="radio" name="ensino" id="medio" value="medio" checked ={data.tipoEnsino==="medio"} onChange={(e)=>updateSetData("tipoEnsino",e.target.value)} required/>
            <span className="radio-tile">
              <span className="radio-label">Técnico</span>
            </span>
        </label>
        <label>
          <input className="radio-input" type="radio" name="ensino" id="superior" value="Superior" checked ={data.tipoEnsino==="Superior"} onChange={(e)=>updateSetData("tipoEnsino",e.target.value)} required />
            <span className="radio-tile">
              <span className="radio-label">Superior</span>
            </span>
        </label>
      </div>
    </div>
  )
    
}

export default FormType;