import React, { Component } from 'react';
import * as inputType from '../../../Shared/inputTypes';
import FormBuilder from '../../../UI/FormBuilder/FormBuilder';
import * as buttonTypes from '../../../UI/Buttons/ButtonTypes';
import Buttons from '../../../UI/Buttons/Button';
import { ButtonActivation } from '../../../UI/Buttons/ButtonActivation';
import { CheckInputsValidation } from '../../../UI/Inputs/CheckInputsValidation';
import Table from '../../../UI/Table/Table';
import * as tbl from '../../../Shared/TableCreationData'
import { visibleButton } from '../../../UI/Buttons/ButtonActivation';
import * as actions from '../../../Shared/Actions';
import { resetForm } from '../../../Shared/ResetInputs';
import { apiService } from '../../../Services/ApiServices';

class AddCompany extends Component {
    state = {
        inputs: {
            company: { value: '', text: '', required: true, touched: false, type: inputType.text, label: "نام شرکت" }
        },
        table: {
            creationData: {
                header: [...tbl.addCompanyHeader],
                body: [...tbl.addCompanyBody],
            },
            url: "GetCompanies",
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
                apiService.comapny.edit({ Id: st.editId, Company: st.inputs.company.value })
                this.reset(st)
                break;
            case buttonTypes.submit:
                apiService.comapny.add({ Company: st.inputs.company.value }).then(result => {
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
        st.inputs.company.value = obj.company;
        st.inputs.company.text = obj.company;
        st.inputs.company.touched = true;
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

export default AddCompany;