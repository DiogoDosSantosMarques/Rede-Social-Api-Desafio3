import styles from './Card.module.css'
import PropTypes from 'prop-types';

export default function Card(props){


    return(
        <div className={styles.card}>

            {props.children}

        </div>
    )
}

Card.propTypes = {
    children: PropTypes.node.isRequired,
  };