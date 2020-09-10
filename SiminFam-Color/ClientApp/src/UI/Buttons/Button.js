import React from 'react';
import styles from './Button.module.scss';
import * as buttonTypes from './ButtonTypes';

const setClass = type => {
    switch (type) {
        case buttonTypes.submit:
            return "btn-primary"
        case buttonTypes.cancel:
            return "btn-danger"
        case buttonTypes.edit:
            return "btn-success"
        default:
            return "";
    }
}

const Buttons = props => {
    if (!props.elements) return null;
    let btns = Object.keys(props.elements).map((btn, idx) => {
        return props.elements[btn].visible &&
            <button key={idx} disabled={!props.elements[btn].enable}
                className={'btn btn-md ' + setClass(btn)}
                onClick={() => props.handleChange(btn)}>{props.elements[btn].text}</button>

    })

    return (
        <div className={styles.controlButtons}>
            {btns}
        </div>
    )
}

export default Buttons;