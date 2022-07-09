import React from "react";

const Counter = () => {
    const initialNum = 0;
    const [num, setNum] = React.useState(initialNum);

    const IncrementByFive = () => {
        for (let i = 0; i < 5; i++) {
            setNum((prevNum) => prevNum += 1);
        }
    };

    return (
        <div>
            <p>Counter: {num}</p>
            <button onClick={() => setNum(initialNum)}>Reset</button>
            <button onClick={() => setNum(num + 1)}>Increment</button>
            <button onClick={() => setNum(num - 1)}>Decrement</button>
            <button onClick={IncrementByFive}>Increment By 5</button>
        </div>
    );
}

export default Counter;