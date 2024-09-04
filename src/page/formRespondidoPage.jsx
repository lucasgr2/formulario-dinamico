
export default function FormRespondidoPage({status,setStatus}){
    function alterarStatus(){
        setStatus(3)
    }

    return(
        <>
            <h1>{status}</h1>
            <h1>Você já respondeu o formulário.</h1>
            <h2>Não é possível responder novamente.</h2>
            <p>Caso isso seja um engano entra em contato com a administração</p>
            <button  onClick = {alterarStatus} >aperte</button>
        </>
    )
}