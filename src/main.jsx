import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import FormularioPage from './page/formularioPage.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  //O status pode ser = 0 (Form Desativado) , 1 (Já Respondido) , 2 (Disponivel)

  <StrictMode>
    <FormularioPage />
  </StrictMode>,
)
