import { Outlet } from "react-router-dom"
import CardLeft from "./CardLeft"
import compassol from "../assets/compass_uol_logo.svg"
import voltar from "../assets/buttonpost.png"
import mundo from "../assets/Mundinho.png"
import sino from "../assets/Sininho.png"
import perfas from "../assets/usericonsm.png"
import styles from "./RootLayout.module.css"
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react"

import axios from "axios"

export default function RootLayout(){
    const userId = localStorage.getItem('userId')
    const [user, setUser] = useState({});

    

    const localUser = localStorage.getItem("user", user)
     const parsedUser = JSON.parse(localUser) || {}

  
     useEffect(() => {
        const fetchUserData = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`https://social-compass-server.onrender.com/users/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
    
            setUser(response.data || {});
          } catch (error) {
            console.error('Erro ao buscar dados do usuário', error);
          }
        };
    
        fetchUserData();
      }, [userId]);



    const handleLogout = () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
       }

    return(

        <div>

 <div className={styles.navbar}>

    <div>
        <img className={styles.voltar} src={voltar} alt="" />
    </div>

    <h2 className={styles.social}>SocialCompass</h2>

    <div>
        <img className={styles.mundo} src={mundo} alt="" />
    </div>
    <div>
        <img className={styles.sino} src={sino} alt="" />
    </div>

    <div>
        <img className={styles.perfas} src={perfas} alt="" />
    </div>

    
    <h1 className={styles.parsed}>{parsedUser}</h1>
    

</div> 

        <CardLeft>
        <img src={compassol} alt="" />

        <div className={styles.conteudo}>
        <div>
        <Link to='/home'>Pagina Inicial</Link>
        </div>

        <div>
         <Link to={`/meuperfil/${userId}`}>Meu Perfil</Link> 
        </div>


        <div>
            <Link onClick={handleLogout} to='/'>Sair</Link>

            
        </div>

        </div> 
        </CardLeft>
        
        <Outlet />
        </div>
        
    )
}