import React, { Component } from 'react';
import * as inputType from '../../../Shared/inputTypes';
import FormBuilder from '../../../UI/FormBuilder/FormBuilder';
import * as buttonTypes from '../../../UI/Buttons/ButtonTypes';
import Buttons from '../../../UI/Buttons/Button';
import {ButtonActivation} from '../../../UI/Buttons/ButtonActivation';
import {CheckInputsValidation} from '../../../UI/Inputs/CheckInputsValidation';

class ProductType extends Component {
    state = {
        inputs: {
            name: { value: '', text: '', required: true, touched: false, type: inputType.text, label: "نوع ورودی" }
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

    handleChange = (name, value, text) => {
        var inputs = { ...this.state.inputs }
        inputs[name].value = value;
        inputs[name].text = text;
        inputs[name].touched = true;
        ButtonActivation(this.state.buttons, CheckInputsValidation(inputs))
        this.setState({ ...inputs })
    }

    handleButtonClick = type => {

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
            </React.Fragment>
        )
    }
}

export default ProductType;