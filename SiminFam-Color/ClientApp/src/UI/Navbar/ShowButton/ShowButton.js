import React, { memo } from 'react'
import styles from './ShowButton.module.scss';

const CloseButton = props => {
    return (
        <div onClick={() => props.show('show')}
            className={styles.sideOpenButton}>
            ☰
        </div>
    )
}
export default memo(CloseButton);