import { useState } from "react"
import back from "../assets/cover.png"
import fotoperfil from "../assets/fotoperfil.png"
import styles from './MyProfile.module.css'
import Conteudo from "./Conteudo"
import {useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"



export default function MyProfile(){
    
    
    const { userId } = useParams();
  const [user, setUser] = useState({});
  const [editedUser, setEditedUser] = useState({});


  const [nome, setNome] = useState("");
  const [profissao, setProfissao] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [sexo, setSexo] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");

  const formatDateToYYYYMMDD = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };

  const mapSexToApiValue = (sex) => {
    // Mapeie os valores locais para os valores aceitos pela API
    const sexMap = {
      'Masculino': 'Male',
      'Feminino': 'Female',
    };
    return sexMap[sex] || sex; // Use o valor original se não houver mapeamento
  };

  
  
  const handleEdit = async (e) => {
    e.preventDefault();
  
    try {
      // Validação para garantir que a data esteja no formato esperado
      const formattedData = formatDateToYYYYMMDD(nascimento);

  
      const token = localStorage.getItem('token')
      const response = await axios.put(
        `https://social-compass-server.onrender.com/users/${userId}`,
        {
          name: nome,
          occupation: profissao,
          birthdate: formattedData,
          sex:  mapSexToApiValue(sexo),
          address: endereco,
          phone: telefone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Usuário Editado", response.data);

      
  
      // Atualizar os dados do usuário após a edição
      const updatedUserData = await axios.get(
        `https://social-compass-server.onrender.com/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setUser(updatedUserData.data || {});
      setEditedUser(response.data);
      setModalOpen(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirecionar para a página de login em caso de erro de autenticação
        console.error("Usuário não autenticado");
        
      } else {
        console.error("Erro ao editar usuário", error.response.data || error);
      }
    }
  };


 


    //   const updateSobreSection = (data) =>{
    //     console.log("Form Data: ", data)
    //     setForm(data)

    //     setModalOpen(false)
    //   }

    

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





    const [modalOpen, setModalOpen] = useState(false)

   


    const isCurrentUser = userId === localStorage.getItem('userId');


return(
        
        
        <Conteudo>

        <div className={styles.topcontent}>

        <div>
            <img className={styles.bac} src={back} alt=""  />
        </div>

            <div>
                <img className={styles.fotoperfil} src={fotoperfil} alt="" />
            </div>

        <div className={styles.nomeprofi}>

    
        <h2>{isCurrentUser ? parsedUser : user.name}</h2>
        <p className={styles.profi}>Developer</p>
        </div>

        {isCurrentUser && (
        <div className={styles.edit}>
          <button onClick={() => setModalOpen(true)}>Editar Perfil</button>
        </div>
      )}

        


        
        {modalOpen && isCurrentUser &&(
            <div className={styles.modalBackground}>
        <form className={styles.modalForm} onSubmit={handleEdit}>
        <div >
        <input type="text" placeholder="Nome" autoComplete="off" onChange={(e) => setNome(e.target.value)}  />
        </div>
        <div>
        <input type="text" placeholder="Cargo/Profissão" autoComplete="off" onChange={(e) => setProfissao(e.target.value)}   />
        </div>
        <div>
  <label>Sexo</label>
  <select onChange={(e) => setSexo(e.target.value)} value={sexo}>
    <option value="Male">Masculino</option>
    <option value="Female">Feminino</option>
  </select>
</div>
        <div>
        <input type="date" placeholder="Data de Nascimento" autoComplete="off" onChange={(e) => setNascimento(e.target.value)}    />
        </div>
        <div>
        <input type="text" placeholder="Endereço" autoComplete="off" onChange={(e) => setEndereco(e.target.value)}   />
        </div>
        <div>
        <input type="text" placeholder="Telefone" autoComplete="off" onChange={(e) => setTelefone(e.target.value)}   />
        </div>
        
         
         <div>
          <button className={`${styles.cancel} ${styles.button}`} onClick={() => setModalOpen(false)} type="button">
            Cancelar
          </button>
          
          
          <button className={styles.button} onClick={handleEdit} type="submit">
           Enviar
          </button>
          
          </div>
        </form>
        </div>
      )}

        </div>



        <div className={styles.sobre}>
  <h2>Sobre</h2>
  <div>{editedUser.name}</div>
  <div>{editedUser.occupation}</div>
  <div>{editedUser.sex}</div>
  <div>{editedUser.birthdate}</div>
  <div>{editedUser.address}</div>
  <div>{editedUser.phone}</div>
</div>



    <div className={styles.postview}>
        <div>
            <div className={styles.folw}>Followers</div>
            <div className={styles.foli}>Following</div>
            <div className={styles.postapi}>Posts</div>
        </div>

        <div>
            posts
        </div>
    </div>

    </Conteudo>
        

    )
}