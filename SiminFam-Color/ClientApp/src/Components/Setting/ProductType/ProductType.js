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
import * as actions from '../../../Shared/Actions';

class ProductType extends Component {
    state = {
        inputs: {
            product: { value: '', text: '', required: true, touched: false, type: inputType.text, label: "نوع ورودی" }
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
        },
        formAction: {
            type: '',
            data: null
        },
    }

    handleChange = (name, value, text) => {
        var st = { ...this.state }
        st.inputs[name].value = value;
        st.inputs[name].text = text;
        st.inputs[name].touched = true;
        if (st.formAction.type == actions.edit) {
            st.formAction.data.product = value
        }
        ButtonActivation(this.state.buttons, CheckInputsValidation(st.inputs))
        this.setState({ ...st })
    }

    handleButtonClick = type => {
        let st = { ...this.state }
        switch (type) {
            case buttonTypes.cancel:
                this.setState({
                    ...visibleButton(this.state.buttons, buttonTypes.submit),
                    ...ResetInputs(this.state.inputs)
                })
                break;
            case buttonTypes.edit:
                st.table.action.data = { ...st.formAction.data }
                st.table.action.type = actions.edit;
                st.buttons = { ...visibleButton(this.state.buttons, buttonTypes.submit) }
                st.inputs = { ...ResetInputs(this.state.inputs) }
                this.setState({ ...st }, () => {
                    st.table.action.type = actions.submit;
                    st.table.action.data = null;
                    this.setState({ ...st })
                })
                break;
        }
    }

    handleTableButtonsClick = (key, obj) => {
        let st = { ...this.state }
        st.formAction.data = { ...obj };
        st.formAction.type = actions.edit
        st.inputs.product.value = obj.product;
        st.inputs.product.text = obj.product;
        st.inputs.product.touched = true;
        st.buttons = {
            ...visibleButton(st.buttons, [buttonTypes.cancel, buttonTypes.edit]),
            ...ButtonActivation(st.buttons, CheckInputsValidation(st.inputs))
        }
        this.setState({ ...st })
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