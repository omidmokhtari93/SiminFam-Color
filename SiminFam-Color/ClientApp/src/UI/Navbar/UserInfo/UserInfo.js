import React, { memo } from 'react';
import { connect } from 'react-redux';
import './UserInfo.scss'

const UserInfo = props => {
    //console.log(props)
    return (
        <div className="user-info user-desktop sans"> کاربر : {props.userData && props.userData.fullName}</div>
    )
}

const mapStateToProps = state => {
    return {
        userData: state.user.data
    }
}

export default memo(connect(mapStateToProps, null)(UserInfo));