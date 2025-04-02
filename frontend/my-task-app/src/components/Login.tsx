import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Importa o CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Alterna entre login e registro
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await api.post('/auth/register', { name, email, password });
        alert('Usuário registrado com sucesso! Faça login.');
        setIsRegistering(false);
      } else {
        const response = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', response.data.token);
        navigate('/tasks');
      }
      setError('');
    } catch (err) {
      setError(isRegistering ? 'Erro ao registrar usuário.' : 'Erro ao fazer login.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isRegistering ? 'Registrar' : 'Login'}</h2>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <div className="input-group">
              <label>Nome</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          )}
          <div className="input-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Senha</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">{isRegistering ? 'Registrar' : 'Login'}</button>
        </form>

        <p className="toggle-form">
          {isRegistering ? (
            <>Já tem uma conta? <a href="#" onClick={() => setIsRegistering(false)}>Faça login</a></>
          ) : (
            <>Não tem uma conta? <a href="#" onClick={() => setIsRegistering(true)}>Registrar</a></>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;

// import { useState } from 'react';
// import api from '../api/axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [error, setError] = useState('');
//   const [isRegistering, setIsRegistering] = useState(false); // Estado para alternar entre Login e Registro
//   const navigate = useNavigate();

//   const handleLoginSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await api.post('/auth/login', { email, password });
//       const token = response.data.token;

//       // Armazenar o token no localStorage
//       localStorage.setItem('token', token);
//       navigate('/tasks');
//     } catch (err) {
//       setError('Erro ao fazer login. Verifique suas credenciais.');
//     }
//   };

//   const handleRegisterSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await api.post('/auth/register', { name, email, password });
//       setIsRegistering(false);
//       setError('');
//       alert('Usuário registrado com sucesso! Faça login.');
//     } catch (err) {
//       setError('Erro ao registrar usuário. Verifique seus dados.');
//     }
//   };

//   return (
//     <div>
//       <h2>{isRegistering ? 'Registrar' : 'Login'}</h2>
//       {error && <p>{error}</p>}

//       <form onSubmit={isRegistering ? handleRegisterSubmit : handleLoginSubmit}>
//         {isRegistering && (
//           <div>
//             <label>Nome</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//         )}
//         <div>
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Senha</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">{isRegistering ? 'Registrar' : 'Login'}</button>
//       </form>

//       <div>
//         <p>
//           {isRegistering ? (
//             <>
//               Já tem uma conta? <a href="#" onClick={() => setIsRegistering(false)}>Faça login</a>
//             </>
//           ) : (
//             <>
//               Não tem uma conta? <a href="#" onClick={() => setIsRegistering(true)}>Registrar</a>
//             </>
//           )}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
