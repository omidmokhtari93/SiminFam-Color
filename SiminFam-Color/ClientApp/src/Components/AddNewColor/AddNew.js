import React, { Component } from 'react';
import ComponentsHeader from '../../UI/ComponentsHeader/ComponentsHeader'
import FormBuilder from '../../UI/FormBuilder/FormBuilder';
import * as inputType from '../../Shared/inputTypes';
import Buttons from '../../UI/Buttons/Button';
import * as buttonTypes from '../../UI/Buttons/ButtonTypes';
import Table from '../../UI/Table/Table';
import * as tbl from '../../Shared/TableCreationData';
import { options } from '../../Services/Options.service';

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
            price: { value: '', text: '', required: true, touched: false, type: inputType.number, label: "قیمت" }
        },
        table: {
            creationData: {
                header: [...tbl.addNewColorEntryHeader],
                body: [...tbl.addNewColorEntryBody],
            },
            url: "/api/GetColorsEntry",
            buttons: {
                edit: 'ویرایش'
            },
            action: {
                type: '',
                data: null
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

    getControls = () => {

    }

    handleChange = (name, value, text) => {
        //console.log(name, value, text)
        let inputs = { ...this.state.inputs };
        inputs[name].value = value;
        inputs[name].text = text;
        inputs[name].touched = true;
        this.setState({ ...inputs }, () => {
            console.log(this.state.inputs)
        })
    }

    handleButtonClick = type => {

    }

    removeSearch = (name, value, text) => {
        console.log(name, value, text);
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
                {/* <Table {...this.state.table} /> */}
            </React.Fragment>
        )
    }
}

export default AddNew;