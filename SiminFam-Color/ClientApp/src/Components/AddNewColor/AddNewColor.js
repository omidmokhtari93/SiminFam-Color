import React, { Component } from 'react';
import ComponentsHeader from '../../UI/ComponentsHeader/ComponentsHeader'
import FormBuilder from '../../UI/FormBuilder/FormBuilder';
import * as inputType from '../../Shared/inputTypes';

class AddNewColor extends Component {
    state = {
        inputs: {
            name: { value: '', text: '', required: true, touched: false, type: inputType.text, label: "نام رنگ" },
            code: { value: '', text: '', required: true, touched: false, type: inputType.englishText, label: "کد رنگ" },
        }
    }

    handleChange = e => {

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
            </React.Fragment>
        )
    }
}

export default AddNewColor;