import Card from "./Card"

import styles from './Login.module.css'
import loginimage from '../assets/sideimage.png'
import RegisterForm from "./RegisterForm"
export default function Register(){

    


    return(
        <div className={styles.container}>

            <img className={styles.img}src={loginimage} alt=""  />
        <Card>
            <div className={styles.contente}>
            <div className={styles.ola}>
                <h1>Olá</h1>
            </div>

            <div className={styles.continuar}>
                <p>Por favor, registra-se para continuar</p>
            </div>

            <RegisterForm />
            </div>
        </Card>
        </div>
    )
}