import React, { memo, useEffect } from 'react';
import './SideNavbar.scss';
import NavBarItems from '../NavBarItems/NavBarItem';
import CloseButton from '../CloseButton/CloseButton';
import Backdrop from '../../Backdrop/Backdrop';
import { date } from '../../../Shared/inputTypes';
import UserInfo from '../UserInfo/UserInfo';

const SideNavbar = props => {
    return (
        <React.Fragment>
            <Backdrop show={props.show} dismiss={props.close} />
            <div className="sideNav"
                style={props.show
                    ? { left: 0 }
                    : { left: '-50%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <UserInfo />
                    <CloseButton close={props.close} />
                </div>
                <nav className="sans navbar navbar-light text-right" id="side-navbar">
                    <ul className="navbar-nav">
                        <NavBarItems />
                    </ul>
                </nav>
            </div>
        </React.Fragment>
    )
}

export default memo(SideNavbar);