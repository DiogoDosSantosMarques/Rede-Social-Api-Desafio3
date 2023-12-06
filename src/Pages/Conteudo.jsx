import styles from "./CardLeft.module.css"
import PropTypes from 'prop-types';

export default function Conteudo(props){


    return(
        <div className={styles.conteudo}>

            {props.children}

        </div>
    )
}

Conteudo.propTypes = {
    children: PropTypes.node.isRequired,
  };