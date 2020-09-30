import React from 'react';
import Input from '../../../UI/Inputs/Input';
import Modal from '../../../UI/Modal/Modal';

const AddColors = props => {
    return (
        <Modal size="md"
            buttonText="تایید"
            buttonFunc={props.handleModalButton}
            title="ثبت ترکیبات"
            show={props.show}
            handleClose={() => props.handleClose()}
        >
            <div className="row">
                <div className="col-md-5">
                    <Input {...props.colorCode}
                        handleChange={props.handleChange}
                        name='colorCode'
                    />
                </div>
                <div className="col-md-5">
                    <Input {...props.percentage}
                        handleChange={props.handleChange}
                        name='percentage'
                    />
                </div>
                <div className="col-md-2">
                    <div>&nbsp;</div>
                    <button onClick={props.handleAddColors} 
                    className="btn btn-success btn-block">+</button>
                </div>
            </div>
        </Modal >
    )
}

export default AddColors;