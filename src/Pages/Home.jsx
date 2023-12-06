
import { Link } from 'react-router-dom';

import camera from "../assets/Camera.png"
import imagem from "../assets/Imagem.png"
import grampo from "../assets/Grampo.png"
import loc from "../assets/Localizacao.png"
import rostinho from "../assets/Rostinho.png"

import compassol from "../assets/compass_uol_logo.svg"

import CardLeft from "./CardLeft"
import axios from "axios"

import styles from "./RootLayout.module.css"



import { useState, useEffect } from "react"
import Conteudo from './Conteudo';

export default function Home(){
    const userId = localStorage.getItem('userId')
    
    const [user, setUser] = useState({});
   
   
   const [amigos, setAmigos] = useState([]);


    useEffect(() => {

        const fetchAmigos = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get("https://social-compass-server.onrender.com/users", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const limitedAmigos = response.data.slice(0, 4);
                setAmigos(limitedAmigos);
            } catch (error) {
                console.log("Erro ao Encontrar amigos", error);
            }
        };

        fetchAmigos()
    }, [])


    


    useEffect(() =>{
        getUser()
        // fetchPosts()
    }, [])

    const localUser = localStorage.getItem("user", user)
    const parsedUser = JSON.parse(localUser)
    

   const getUser = async () =>{
    

    try {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
       
        
        const response = await axios.get(`https://social-compass-server.onrender.com/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

   

        setUser(response.data || parsedUser)

        
        
    } catch (error) {

        console.log("Erro ao Buscar Dados do Usuário", error)
        
    }
   }

    // const fetchPosts = async () =>{

    //     try {
    //         const response = await axios.get("https://social-compass-server.onrender.com/posts ")
    //         setPosts(response.data)
    //     } catch (error) {
    //         console.log("Erro ao Buscar Posts:", error)
    //     }
    // }


    // const handlePosts = async () => {

    //     const token = localStorage.getItem('token');
    //     const userId = localStorage.getItem('userId')

    //     try {
            
    //      const response = await axios.post("https://social-compass-server.onrender.com/posts", {
    //        text: frase,
    //        authorId: userId
          
        
    //   }, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,

    //     },
    //     });
    //     console.log(response.data)
    //         fetchPosts()
    
    //     } catch (error) {
    //         console.log("Erro ao Adcionar Post", error)
            
    //     }
    //    }


       const handleLogout = () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('userId')
       }

    return(
        
       
        <Conteudo>
        
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


        

        



<div className={styles.opost}>

 <div>

 <input type="text" placeholder="No que você esta pensando?" onChange={(e) => setFrase(e.target.value)}/>


</div>

<div>
<button>Postar</button>

</div>

<div>
    <img src={camera} alt="" />
    <img src={imagem} alt="" />
    <img src={grampo} alt="" />
    <img src={loc} alt="" />
    <img src={rostinho} alt="" />

</div>

</div>

<div className={styles.amigos}>
    <div><h3>Meus Amigos</h3></div>
    

    <div>
    
    <ul>
        
  {amigos.map((amigo) => (
    <li key={amigo.id}>
        
      <a href={`/meuperfil/${amigo.id}`}> {amigo.username} </a>
    </li>
  ))}
</ul>
    </div>
</div>

</Conteudo>


        
        

       
    )
}