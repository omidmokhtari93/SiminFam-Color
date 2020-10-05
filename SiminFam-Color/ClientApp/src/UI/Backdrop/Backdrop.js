import React from 'react';
import styles from './Backdrop.module.css';
import propTypes from 'prop-types';

const Backdrop = ({ show, dismiss, children }) => {
    return (
        <div className={styles.backdrop}
            onClick={() => dismiss('close')}
            style={show
                ? { display: 'block' }
                : { display: 'none' }}
        >
            {children}
        </div>
    )
}

Backdrop.propTypes = {
    show: propTypes.bool,
    dismiss: propTypes.func
}

export default Backdrop;