import React from 'react';
import logo from '../../Assets/images/logo.png'
import * as styles from './Logo.module.scss';

const Logo = props => {
    return (
        <React.Fragment>
            <a className={styles.logo} href="/">
                <img src={logo} alt="logo" />
            </a>
        </React.Fragment>
    )
}

export default Logo;