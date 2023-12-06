import Card from "./Card"
import LoginForm from "./LoginForm"
import styles from './Login.module.css'
import loginimage from '../assets/sideimage.png'
export default function Login(){


    return(
        <div className={styles.container}>

            <img className={styles.img}src={loginimage} alt=""  />
        <Card>
            <div className={styles.content}>
            <div className={styles.ola}>
                <h1>Olá,</h1>
            </div>

            <div className={styles.continuar}>
                <p>Para continuar navegando de forma segura, efetue o login</p>
            </div>

            <LoginForm />
            </div>
        </Card>
        </div>
    )
}