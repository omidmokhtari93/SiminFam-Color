import React, { memo, useCallback, useEffect, useMemo, useState } from "react";


function Test() {
    const [counter, setCounter] = useState(0);
    const [counter1, setCounter1] = useState(0)

    const inc = useCallback(() => {
        setCounter(preCounter => preCounter + 1)
    }, [])

    const inc1 = useCallback(() => {
        setCounter1(preCounter => preCounter + 1)
    }, [])

    return (
        <>
            <Counter value={counter} onClick={inc}>inc</Counter>
            <Counter value={counter1} onClick={inc1}>inc 1</Counter>
        </>
    )
}

export default Test;


const Counter = memo(({ value, children, onClick }) => {
    console.log('Render: ' + children);
    return (
        <button onClick={() => onClick()}>
            {children} : {value}
        </button>
    )
})