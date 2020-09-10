import React, { Component } from 'react';
import ComponentsHeader from '../../UI/ComponentsHeader/ComponentsHeader'
import FormBuilder from '../../UI/FormBuilder/FormBuilder';
import * as inputType from '../../Shared/inputTypes';
import Buttons from '../../UI/Buttons/Button';
import * as buttonTypes from '../../UI/Buttons/ButtonTypes';

class AddNew extends Component {
    state = {
        inputs: {
            name: { value: '', text: '', required: true, touched: false, type: inputType.select, label: "نوع ورودی" },
            tempCode: { value: '', text: '', required: true, touched: false, type: inputType.englishText, label: "کد موقت" },
            finalCode: { value: '', text: '', required: true, touched: false, type: inputType.englishText, label: "کد نهایی" },
            color: { value: '', text: '', required: true, touched: false, type: inputType.select, label: "نوع رنگ" },
            weight: { value: '', text: '', required: true, touched: false, type: inputType.number, label: "مقدار وارد شده" },
            enterDate: { value: '', text: '', required: true, touched: false, type: inputType.date, label: "تاریخ ورود" },
            company: { value: '', text: '', required: true, touched: false, type: inputType.select, label: "نام شرکت" },
            price: { value: '', text: '', required: true, touched: false, type: inputType.number, label: "قیمت" },
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
        console.log(name, value, text)
        let inputs = { ...this.state.inputs };
        inputs[name].value = value;
        inputs[name].text = text;
        inputs[name].touched = true;
        this.setState({ ...inputs })
    }

    handleButtonClick = type => {

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
            </React.Fragment>
        )
    }
}

export default AddNew;