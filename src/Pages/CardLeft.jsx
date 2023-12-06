
import PropTypes from 'prop-types';
import styles from "./CardLeft.module.css"

export default function CardLeft(props){


    return(
        <div className={styles.card}>

            {props.children}

        </div>
    )
}

CardLeft.propTypes = {
    children: PropTypes.node.isRequired,
  };