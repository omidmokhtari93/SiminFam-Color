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

class AddNewColor extends Component {
    state = {
        inputs: {
            tempCode: { value: '', text: '', required: true, touched: false, type: inputType.englishText, label: "کد موقت" },
            finalCode: { value: '', text: '', required: true, touched: false, type: inputType.englishText, label: "کد نهایی" },
            accept: { value: '', text: '', required: false, touched: false, type: inputType.checkbox, label: "تایید" },
        },
        addColorInputs: {
            tempCode: { value: '', text: '', required: true, touched: false, type: inputType.englishText, label: "کد رنگ" },
            finalCode: { value: '', text: '', required: true, touched: false, type: inputType.number, label: "درصد رنگ" },
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
        }
    }

    handleTableButtonsClick = (key, obj) => {
        let st = { ...this.state.inputs }
        st.accept.value = true;
        this.setState({ ...st })
    }

    handleChange = (name, value, text) => {
        //console.log(name, value, text)
        let updatedState = { ...this.state };
        updatedState.inputs[name].value = value;
        updatedState.inputs[name].text = text;
        updatedState.inputs[name].touched = true;
        ButtonActivation(updatedState.buttons, CheckInputsValidation(updatedState.inputs))
        this.setState({ ...updatedState })
    }

    render() {
        return (
            <React.Fragment>
                <ComponentsHeader>ثبت رنگ جدید</ComponentsHeader>
                <FormBuilder
                    inputs={this.state.inputs}
                    handleChange={this.handleChange}
                    column="3"
                />
                <FormBuilder
                    inputs={this.state.addColorInputs} />
                <Table {...this.state.table} />
            </React.Fragment>
        )
    }
}

export default AddNewColor;