import React from 'react'
import src from '../../Assets/images/loading.png'
import * as styles from './Loading.module.css';

const Loading = props => {
    return (
        <React.Fragment>
            {props.show && <img src={src}
                style={props.style ? props.style : null}
                className={!props.style && styles.loading} />}
        </React.Fragment>
    )
}

export default Loading;