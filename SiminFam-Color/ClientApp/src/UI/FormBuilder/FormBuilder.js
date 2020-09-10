import React from 'react';
import Input from '../../UI/Inputs/Input';
import propTypes from 'prop-types';
import { ColumnCreator } from './ColumnCreator';

const FormBuilder = props => {
    let create = e => {
        if (!props.inputs) return null;
        const elementsLength = Object.keys(props.inputs).length;
        const elements = Object.keys(props.inputs).map((key, idx) => {
            return <Input {...props.inputs[key]}
                name={key}
                key={idx}
                handleChange={props.handleChange} />
        })
        const rows = Math.ceil(elementsLength / 3);
        const form = [];
        let counter = 0;
        let column = !props.column ? 3 : props.column;
        for (let i = 0; i < rows; i++) {
            const input = [...Array(parseInt(column))].map(x => {
                let item = <div key={counter}
                    className={ColumnCreator(column)}>
                    {elements[counter]}
                </div>
                counter++;
                return item
            })
            form.push(<div className="row" key={counter}>
                {input}
            </div>)
        }
        return form;
    }

    return (
        <React.Fragment>
            {create()}
        </React.Fragment>
    )
}

FormBuilder.propTypes = {
    inputs: propTypes.object, //array of objects
    handleChange: propTypes.func,
    column: propTypes.oneOf(["1", "2", "3", "4", "6", "12"])
}

export default FormBuilder;