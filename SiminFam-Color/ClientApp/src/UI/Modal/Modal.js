import React, { useState } from 'react';
import BackDrop from '../../UI/Backdrop/Backdrop'
import './Modal.scss'

const Modal = props => {
    const modalSize = () => {
        switch (props.size) {
            case 'lg':
                return 'modal-lg'
            case 'sm':
                return 'modal-sm'
            case 'md':
                return 'modal-md'
            default:
                break;
        }
    }
    return (
        <React.Fragment>
            <BackDrop show={props.show} />
            <div className={"modal fade " + (props.show ? "show" : "")}
                tabIndex="-1"
                style={props.show ? { display: 'block' } : null}>
                <div className={"modal-dialog " + modalSize()} role="document">
                    <div className="modal-content">
                        <div className="modal-header rtl d-flex">
                            <h5 className="modal-title rtl">{props.title}</h5>
                            <button type="button" className="close" onClick={props.handleClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body text-right">
                            {props.children}
                        </div>
                        <div className="modal-footer rtl">
                            <button type="button" className="btn btn-primary"
                                onClick={e => props.buttonFucn}>
                                {props.buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Modal;