import React from 'react'

type PropsInputCount = {
    value: number;
    setValue: (value: number) => void;
    disabled?: boolean;
}

const InputCount = ({ value, setValue,disabled }: PropsInputCount) => {
    const handleChane = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value))
    }
    return (
        <div className="min-w-[4rem] h-[2rem] gap-4 font-extrabold flex items-center justify-center rounded-md">
            <label htmlFor="count">Count</label>
            <input disabled={disabled} type="number" id="count" min={1} className="out-of-range:border-red-500 disabled:disabled border-black border-2 w-full h-full text-center" value={value} onChange={handleChane} />
        </div>
    )
}

export default InputCount;
