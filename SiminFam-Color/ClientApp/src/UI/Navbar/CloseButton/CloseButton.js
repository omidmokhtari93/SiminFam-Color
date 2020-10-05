import React, { memo } from 'react';
import styles from './CloseButton.module.css';
import Logo from '../../../UI/Logo/Logo';

const CloseButton = props => {
    return (
        <div className={styles.closeBtn} onClick={() => props.close('close')}>
            ✖
        </div>
    )
}
export default memo(CloseButton);