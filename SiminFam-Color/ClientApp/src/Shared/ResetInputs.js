import * as inputTypes from './inputTypes';
import { visibleButton } from '../UI/Buttons/ButtonActivation'
import * as buttonTypes from '../UI/Buttons/ButtonTypes';
import * as actions from '../Shared/Actions';

export const ResetInputs = inputs => {
    let st = { ...inputs }
    Object.keys(inputs).map(inp => {
        switch (inputs[inp].type) {
            case inputTypes.file:
                inputs[inp].value = null
                inputs[inp].touched = false
                break;
            default:
                inputs[inp].value = ''
                inputs[inp].touched = false
        }
    })
    return st;
}


export const resetForm = (state) => {
    state.buttons = { ...visibleButton(state.buttons, buttonTypes.submit) }
    state.inputs = { ...ResetInputs(state.inputs) }
    state.table.action = actions.update;
    return state;
}