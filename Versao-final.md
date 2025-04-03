# **Trabalho Final - Sistemas Web - Resultados**

## *Discente: Ivyna Alves Santos Magalhães*

<!-- Este documento tem como objetivo apresentar o projeto desenvolvido, considerando o que foi definido na proposta e o produto final. -->

### Resumo

  Este trabalho tem como foco o desenvolvimento de um sistema web chamado bePlanner, destinado à organização e gerenciamento de tarefas por meio da criação de notas. 
  O objetivo é oferecer uma ferramenta eficiente que auxilie os usuários no planejamento de atividades diárias, promovendo maior controle e produtividade.

### 1. Funcionalidades implementadas

Cadastro de Tarefas: Criar e editar tarefas.

Visualização de Tarefas: Exibir as tarefas cadastradas de forma organizada.

Listagem: Permitir a classificação das notas como pendentes ou concluídas.

Atualizações: Alterar o status ou as informações de uma nota.

Calendário Integrado: Para definição dos prazos das notas.
  
### 2. Funcionalidades previstas e não implementadas

Listagem por Status e Prazo: Priorizar pelo prazo.

Notificações: Alertar o usuário sobre prazos e atualizações importantes.

Exibir as tarefas em um calendário interativo para facilitar o planejamento visual.

### 3. Principais desafios e dificuldades

Os maiores desafios para iniciantes são a curva de aprendizado do React (gerenciamento de estado, efeitos, integração de bibliotecas) e a sincronização com o MongoDB (lidar com operações assíncronas, erros e validação). 
Além disso, o projeto enfrenta dificuldades com layout responsivo, usabilidade, performance e manutenção. As soluções atuais funcionam, mas podem ser otimizadas com práticas como validação de dados, responsividade, e abstração de código.


### 4. Instruções para instalação e execução-

## 1. Pré-requisitos
Antes de instalar a aplicação, certifique-se de ter os seguintes itens instalados no seu sistema:

- **Node.js** (versão 16 ou superior) - [Baixar aqui](https://nodejs.org/)
- **MongoDB** (local ou Atlas) - [Baixar aqui](https://www.mongodb.com/try/download/community)
- **Git** (opcional, mas recomendado) - [Baixar aqui](https://git-scm.com/)

---

## 2. Instalação e Configuração do Backend

### **Clonar o Repositório**
Se ainda não tiver o projeto baixado, clone-o com:

git clone https://github.com/Ivynaaa/Trabalho-Pratico-Web.git

### **Instalar as Dependências**

npm install

### **Configurar as Variáveis de Ambiente**

Crie um arquivo .env na raiz do backend e adicione as seguintes configurações:

PORT=5000
MONGO_URI=mongodb://localhost:27017/seu-banco  # Ou sua URI do MongoDB Atlas
JWT_SECRET=sua_chave_secreta_segura

### **Iniciar o Servidor**

npx nodemon server.js

## 3. Instalação e Execução do Frontend

### **Acessar o Diretório do Frontend**

cd ../frontend

### **Instalar as Dependências**

npm install

### **Configurar as Variáveis de Ambiente**

Definir Diretamente no Código  

Se o backend sempre rodar no mesmo local, defina a URL manualmente dentro do código:

```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // URL fixa do backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

### **Iniciar o Frontend**

Para rodar o frontend, execute:

npm run dev

### 5. Referências

REACT. Environment Variables. Disponível em: https://create-react-app.dev/docs/adding-custom-environment-variables/. Acesso em: 02 abr. 2025.

NODE.JS. process.env. Disponível em: https://nodejs.org/api/process.html#process_process_env. Acesso em: 02 abr. 2025.
