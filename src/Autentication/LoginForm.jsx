import { Link } from 'react-router-dom';
import axios from "axios";

// import { Link } from "react-router-dom"; // Certifique-se de ter importado o Link do react-router-dom
import { useState } from "react";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [user, setUser] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();





    try {


      if(!user.trim() || !senha.trim()){
        setError("Todos os Campos Precisam ser Preenchidos")
        return
      }

      if (senha.length < 6 || senha.length > 50) {
        setError("A senha deve ter entre 6 e 50 caracteres");
        return;
      }


      const response = await axios.post('https://social-compass-server.onrender.com/auth/login', {
        username: user,
        password: senha
      });


      const token = response.data.token;
      const userId = response.data.user.id
    
    localStorage.setItem("token",  token);
  localStorage.setItem("userId", userId)

   localStorage.setItem("user", JSON.stringify(user))

      

      console.log('Usuário logado com sucesso:', response.data);

      setUser('');
      setSenha('');
      setError('');

      
    } catch (error) {
      setError('Usuário e/ou Senha inválidos. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <h2 className={styles.log}>Login</h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.form}>
          <input
            type="text"
            placeholder="Usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
            className={error ? styles.errorInput : ''}
          />
        </div>

        <div className={styles.form} >
          <input 
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required

            className={error ? styles.errorInput : ''}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.botao}>
          <button type="submit" style={{color: 'white'}}>  <Link style={{color: 'white'}} to="/home"> Entrar </Link></button>
        </div>
      </form>

      <div>
         <p>
          Novo por aqui? <Link style={{color: 'white', fontWeight: 600}} to='/registro'>Registre-se</Link>
        </p> 
      </div>
    </div>
  );
};

export default LoginForm;