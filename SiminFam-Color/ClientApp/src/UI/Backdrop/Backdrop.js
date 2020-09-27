import React from 'react';
import styles from './Backdrop.module.css';
import propTypes from 'prop-types';

const Backdrop = props => {
    return (
        <div className={styles.backdrop}
            onClick={() => props.dismiss('close')}
            style={props.show
                ? { display: 'block' }
                : { display: 'none' }}
        >
            {props.children}
        </div>
    )
}

Backdrop.propTypes = {
    show: propTypes.bool,
    dismiss: propTypes.func
}

export default Backdrop;