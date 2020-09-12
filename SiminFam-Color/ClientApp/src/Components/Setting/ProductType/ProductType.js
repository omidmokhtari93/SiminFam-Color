import React, { Component } from 'react';
import * as inputType from '../../../Shared/inputTypes';
import FormBuilder from '../../../UI/FormBuilder/FormBuilder';
import * as buttonTypes from '../../../UI/Buttons/ButtonTypes';
import Buttons from '../../../UI/Buttons/Button';
import { ButtonActivation } from '../../../UI/Buttons/ButtonActivation';
import { visibleButton } from '../../../UI/Buttons/ButtonActivation';
import { CheckInputsValidation } from '../../../UI/Inputs/CheckInputsValidation';
import Table from '../../../UI/Table/Table';
import * as tbl from '../../../Shared/TableCreationData'
import { ResetInputs } from '../../../Shared/ResetInputs';

class ProductType extends Component {
    state = {
        inputs: {
            name: { value: '', text: '', required: true, touched: false, type: inputType.text, label: "نوع ورودی" }
        },
        table: {
            creationData: {
                header: [...tbl.productHeader],
                body: [...tbl.productBody],
            },
            url: "/api/GetProducts",
            buttons: {
                edit: 'ویرایش'
            },
            editData: null,
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
        formState: 'submit'
    }

    handleChange = (name, value, text) => {
        switch (this.state.formState) {
            case 'submit':
                var inputs = { ...this.state.inputs }
                inputs[name].value = value;
                inputs[name].text = text;
                inputs[name].touched = true;
                ButtonActivation(this.state.buttons, CheckInputsValidation(inputs))
                this.setState({ ...inputs })
                break;
            case 'edit':

                break;
        }
    }

    handleButtonClick = type => {
        switch (type) {
            case buttonTypes.cancel:
                this.setState({
                    ...visibleButton(this.state.buttons, buttonTypes.submit),
                    ...ResetInputs(this.state.inputs)
                })
            case buttonTypes.edit:
                let formData = {};
                Object.keys(this.state.inputs).map(inp => {
                    formData.text = this.state.inputs[inp].text
                    formData.value = this.state.inputs[inp].value
                })
                console.log(formData)
                this.setState({
                    ...ResetInputs(this.state.inputs),
                    ...visibleButton(this.state.buttons, buttonTypes.submit),
                })
        }
    }

    handleTableButtonsClick = (key, obj) => {
        let inputs = { ...this.state.inputs }
        let table = { ...this.state.table }
        table.editData = { ...obj };
        inputs.name.value = obj.product;
        inputs.name.text = obj.product;
        inputs.name.touched = true;
        ButtonActivation(this.state.buttons, CheckInputsValidation(inputs))
        this.setState({
            ...inputs,
            ...table,
            ...visibleButton(this.state.buttons, [buttonTypes.cancel, buttonTypes.edit]),
            ...ButtonActivation(this.state.buttons, CheckInputsValidation(inputs)),
            formState: 'edit'
        })
    }

    render() {
        return (
            <React.Fragment>
                <FormBuilder
                    inputs={this.state.inputs}
                    handleChange={this.handleChange}
                    column="1"
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

export default ProductType;