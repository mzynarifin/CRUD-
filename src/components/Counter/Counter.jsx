import { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);
    const tambah = () => {
        setCount(count + 1);
    };
    const tambahLima = (jumlah) => {
        setCount(count + jumlah)
    }
    const kurang = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };
    const reset = () => {
        setCount(0);
    };

    return (
        <div>
            <h2>{count}</h2>
            <button onClick={tambah}>Tambah</button>
            <button onClick={() => tambahLima(5)}>Tambah 5</button>
            <button onClick={kurang}>Kurang</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
};

export default Counter;
