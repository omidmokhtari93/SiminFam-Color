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
import { resetForm } from '../../../Shared/ResetInputs';
import * as actions from '../../../Shared/Actions';
import { apiService } from '../../../Services/Services';

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
            action: null,
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
        editId: null
    }

    handleChange = (name, value, text) => {
        var st = { ...this.state }
        st.inputs[name].value = value;
        st.inputs[name].text = text;
        st.inputs[name].touched = true;
        ButtonActivation(this.state.buttons, CheckInputsValidation(st.inputs))
        this.setState({ ...st })
    }

    handleButtonClick = type => {
        let st = { ...this.state }
        switch (type) {
            case buttonTypes.cancel:
                this.reset(st)
                break;
            case buttonTypes.edit:
                apiService.product.edit({ Id: st.editId, Product: st.inputs.product.value })
                this.reset(st)
                break;
            case buttonTypes.submit:
                apiService.product.add({ Product: st.inputs.product.value }).then(result => {
                    if (result.type == 'success') {
                        this.reset(st)
                    }
                })
                break;
        }
    }

    reset = st => {
        this.setState({ ...resetForm(st) }, () => {
            st.table.action = actions.submit;
            this.setState({ ...st })
        })
    }

    handleTableButtonsClick = (key, obj) => {
        let st = { ...this.state }
        st.inputs.product.value = obj.product;
        st.inputs.product.text = obj.product;
        st.inputs.product.touched = true;
        st.editId = obj.id;
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