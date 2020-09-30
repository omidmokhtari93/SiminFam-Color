import React, { Component } from 'react'
import Table from '../../UI/Table/Table'
import * as tbl from '../../Shared/TableCreationData';
import * as action from '../../Shared/Actions';
import * as inputType from '../../Shared/inputTypes';
import ComponentsHeader from '../../UI/ComponentsHeader/ComponentsHeader';
import FormBuilder from '../../UI/FormBuilder/FormBuilder';
import * as buttonTypes from '../../UI/Buttons/ButtonTypes';
import { ButtonActivation } from '../../UI/Buttons/ButtonActivation'
import { CheckInputsValidation } from '../../UI/Inputs/CheckInputsValidation'
import Input from '../../UI/Inputs/Input';
import AddColorsModal from './AddColors/AddColorsModal';

class AddNewColor extends Component {
    state = {
        inputs: {
            colorName: { value: '', text: '', required: true, touched: false, type: inputType.text, label: "نام رنگ" },
            tempCode: { value: '', text: '', required: true, touched: false, type: inputType.englishText, label: "کد موقت" },
            finalCode: { value: '', text: '', required: true, touched: false, type: inputType.englishText, label: "کد نهایی" },
            accept: { value: '', text: '', required: false, touched: false, type: inputType.checkbox, label: "تایید" },
            colorCode: { value: '', text: '', required: true, touched: false, type: inputType.englishText, label: "کد رنگ" },
            percentage: { value: '', text: '', required: true, touched: false, type: inputType.number, label: "درصد رنگ" },
        },
        table: {
            allowPagination: true,
            rowsInPage: "10",
            allowSearch: true,
            creationData: {
                header: tbl.addNewColorEntryHeader,
                body: tbl.addNewColorEntryBody,
            },
            url: "Get",
            buttons: {
                edit: 'ویرایش',
                sabt: 'ثبت'
            },
            action: action.submit,
            tableClick: (key, obj) => this.handleTableButtonsClick(key, obj)
        },
        buttons: {
            [buttonTypes.submit]: {
                enable: false,
                visible: true,
                text: 'ثبت',
            },
            [buttonTypes.edit]: {
                enable: false,
                visible: false,
                text: 'ویرایش',
            },
            [buttonTypes.cancel]: {
                enable: true,
                visible: false,
                text: 'انصراف',
            }
        },
        showModal: false
    }

    handleTableButtonsClick = (key, obj) => {
        let st = { ...this.state.inputs }
        st.accept.value = true;
        this.setState({ ...st })
    }

    handleChange = (name, value, text) => {
        console.log(name, value, text)
        let updatedState = { ...this.state };
        updatedState.inputs[name].value = value;
        updatedState.inputs[name].text = text;
        updatedState.inputs[name].touched = true;
        ButtonActivation(updatedState.buttons, CheckInputsValidation(updatedState.inputs))
        this.setState({ ...updatedState })
    }

    handleModalButton = e => {

    }

    handleAddColors = e => {

    }

    render() {
        return (
            <React.Fragment>
                <ComponentsHeader>ثبت رنگ جدید</ComponentsHeader>
                <AddColorsModal
                    handleClose={() => this.setState({ showModal: false })}
                    handleChange={this.handleChange}
                    colorCode={this.state.inputs.colorCode}
                    percentage={this.state.inputs.percentage}
                    handleModalButton={this.handleModalButton}
                    show={this.state.showModal}
                    handleAddColors={this.handleAddColors} />
                <div className="row">
                    <div className="col-md-3">
                        <Input {...this.state.inputs.colorName}
                            handleChange={this.handleChange}
                            name='colorName'
                        />
                    </div>
                    <div className="col-md-3 text-right">
                        <div>&nbsp;</div>
                        <button className="btn btn-primary"
                            onClick={() => this.setState({ showModal: true })}>ثبت ترکیبات</button>
                    </div>
                </div>
                {/* <FormBuilder
                    inputs={this.state.inputs}
                    handleChange={this.handleChange}
                    column="3"
                /> */}
                {/* <FormBuilder
                    inputs={this.state.addColorInputs} /> */}
                {/* <Table {...this.state.table} /> */}
            </React.Fragment>
        )
    }
}

export default AddNewColor;