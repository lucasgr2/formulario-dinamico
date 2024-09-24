# Formulário Dinâmico 

## 🚀 Objetivo

Criar um formulário com multi etapas onde as opções em cada etapa variam de acordo com a seleção do usuário, os dados são recebidos de uma API e ao final do preenchemento as respostas do usuário são enviadas para um endpoint da API.

## Ponto de Partida

Esse projeto tem como premissa vir após uma tela de login que após autenticar o usuário redireciona para página do formulário, passando por props/context a informação se o usuário logado já respondeu o formulário, se o formulário está indisponível ou se ele pode responder o formulário.Sendo Apresentado uma tela diferente para cada um desses casos.
Nesse projeto o login não está presente então para averiguar cada uma das variações é preciso alterar o conteudo da props manualmente no código.

## Problemas do código
- Utilizar integração com página de login para disponibilizar o context para alterar as telas (como a final de respondido)
- Colocar um loading entre as etapas para aguardar resposta da API
- Estilizar para versão mobile
- Proteção para requisição autenticada
- Consertar a etapa de seleção de disciplina para que ela possa guardar as etapas do formulario

## 🛠️ Construído com

- Vite.js
- React.js
- Tailwind
- Axios

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo LICENSE.md para detalhes.

---
Feito com ❤️ por [Lucas Gomes](https://github.com/lucasgr2) 😊