import styles from "./LoginForm.module.css"
import { useState } from "react"
import axios from "axios"
import { Link } from 'react-router-dom';

export default function RegisterForm(){

const [nome, setNome] = useState("")
const [user, setUser] = useState("")
const [nascimento, setNascimento] = useState("")
const [email, setEmail] = useState("")
const [senha, setSenha] = useState("")
const [confirmSenha, setConfirmSenha] = useState("")

const [error, setError] = useState("")


const handleSubmit = async (e) =>{
    e.preventDefault()

    


    if (senha !== confirmSenha){
        setError("As senhas não correspondem")
        return
    } 

    if (senha.length <6 || senha.length > 50){
        setError("Senha Precisa de pelo menos 6 caracteres")
    }



     
     if (!user.trim() && !nome.trim()) {
        setError('O campo "Usuário" não pode estar vazio');
        return;
      }
  
      
      if (user.length && nome.length > 255) {
        setError('O campo "Usuário" deve ter no máximo 255 caracteres');
        return;
      }




    try {

        const response = await axios.post('https://social-compass-server.onrender.com/auth/register', {
        name: nome,
        username: user,
        birthdate: nascimento,
        email: email,
        password: senha,
        confirmPassword: confirmSenha
      });

      console.log('Usuário cadastrado com sucesso:', response.data);

      

    } catch (error) {
        console.log("Erro no Cadastro", error.response.data)
    }
    
}


    return(
        <div className={styles.contentr}>
            <h2 className={styles.log}>Cadastro</h2>

        <form onSubmit={handleSubmit}>
            <div className={styles.formr}>
            <input  type="text" placeholder="Name"value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>

            <div className={styles.formr}>
            <input  type="text" placeholder="Usuario" value={user} onChange={(e) => setUser(e.target.value)} required  />
            </div>

            <div className={styles.formr}>
            <input  type="date" placeholder="Nascimento" value={nascimento} onChange={(e) => setNascimento(e.target.value)} required  />
            </div>

            <div className={styles.formr}>
            <input  type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required  />
            </div>

            <div className={styles.formr}>
            <input  type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required  className={error ? styles.errorInput : ''} />
            </div>

            <div className={styles.formr}>
            <input  type="password" placeholder="Confirmar Senha" required value={confirmSenha} onChange={(e) => setConfirmSenha(e.target.value)}  className={error ? styles.errorInput : ''} />
            </div>
        {error && <p className={styles.error}>{error}</p>}

            <div className={styles.botao}>
            <button type="submit" style={{color: "white"}}>Registrar-se</button>
            </div>
            </form>
            <div>
             <p>
        Ja possui uma conta? <Link style={{color: "white"}} to='/'>Faça Login</Link>
      </p> 
            </div>
        </div>
    )
}