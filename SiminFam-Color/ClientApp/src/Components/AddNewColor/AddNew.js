import React, { Component } from 'react';
import ComponentsHeader from '../../UI/ComponentsHeader/ComponentsHeader'
import FormBuilder from '../../UI/FormBuilder/FormBuilder';
import * as inputType from '../../Shared/inputTypes';
import Buttons from '../../UI/Buttons/Button';
import * as buttonTypes from '../../UI/Buttons/ButtonTypes';
import Table from '../../UI/Table/Table';
import * as tbl from '../../Shared/TableCreationData';
import { options } from '../../Services/Options.service';
import { addNew } from './EditAndEnter.service';
import { ButtonActivation } from '../../UI/Buttons/ButtonActivation'
import { CheckInputsValidation } from '../../UI/Inputs/CheckInputsValidation'
class AddNew extends Component {
    state = {
        inputs: {
            type: { value: '', text: '', required: true, touched: false, type: inputType.select, label: "نوع ورودی", options: [] },
            tempCode: { value: '', text: '', required: true, touched: false, type: inputType.englishText, label: "کد موقت" },
            finalCode: { value: '', text: '', required: true, touched: false, type: inputType.englishText, label: "کد نهایی" },
            color: { value: '', text: '', required: true, touched: false, type: inputType.select, label: "نوع رنگ", options: [] },
            weight: { value: '', text: '', required: true, touched: false, type: inputType.number, label: "مقدار وارد شده" },
            enterDate: { value: '', text: '', required: true, touched: false, type: inputType.date, label: "تاریخ ورود" },
            company: { value: '', text: '', required: false, touched: false, type: inputType.select, label: "نام شرکت", options: [] },
            price: { value: '', text: '', required: true, touched: false, type: inputType.number, label: "قیمت" },
            comment: { value: '', text: '', required: false, touched: false, type: inputType.textarea, label: "توضیحات" }
        },
        table: {
            allowPagination: true,
            rowsInPage: "10",
            allowSearch: true,
            creationData: {
                header: [...tbl.addNewColorEntryHeader],
                body: [...tbl.addNewColorEntryBody],
            },
            url: "GetColorsEntry",
            buttons: {
                edit: 'ویرایش'
            },
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

    componentDidMount() {
        let inputs = { ...this.state.inputs }
        options.getPageOptions.addNew().then(response => {
            inputs.color.options = response.colors
            inputs.type.options = response.types
            inputs.company.options = response.companies
            this.setState({ ...inputs })
        })
    }

    handleChange = (name, value, text) => {
        let updatedState = { ...this.state };
        updatedState.inputs[name].value = value;
        updatedState.inputs[name].text = text;
        updatedState.inputs[name].touched = true;
        ButtonActivation(updatedState.buttons, CheckInputsValidation(updatedState.inputs))
        this.setState({ ...updatedState })
    }

    handleButtonClick = type => {
        switch (type) {
            case buttonTypes.submit:
                addNew.save(this.state.inputs)
        }
    }

    handleTableButtonsClick = (key, obj) => {
        console.log(key, obj)
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
                <Buttons
                    elements={this.state.buttons}
                    handleChange={(type) => this.handleButtonClick(type)}
                />
                <Table {...this.state.table} />
            </React.Fragment>
        )
    }
}

export default AddNew;