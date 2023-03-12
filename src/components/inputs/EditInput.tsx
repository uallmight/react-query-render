import React, { useState, DetailedHTMLProps, InputHTMLAttributes, PropsWithChildren } from 'react';
import { EditSvg } from '../icons';

export type EditInputProps = PropsWithChildren<{
    initialValue?: string,
    saveOnBlur?: boolean,
    editOnFocus?: boolean,
    onSave: (value: unknown) => void,
}> & Pick<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "type"|"required"|"role"|"checked"|"defaultChecked"|"defaultValue">

const EditInput = ({
    initialValue,
    type,
    children,
    saveOnBlur,
    editOnFocus,
    onSave,
}: EditInputProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [value, setValue] = useState<string|undefined>(initialValue);

    const onEditClick = () => {
        setIsEditing(true);
    };

    const handleFocus = () => {
        setIsEditing(editOnFocus ?? false);
    }

    const onBlur = () => {
        setIsEditing(false);
        if (saveOnBlur) {
            onSave(value);
        }
    }

    if (isEditing) {
        return <input 
            type={type}
            value={value}
            onBlur={onBlur}
            onFocus={handleFocus}
            onChange={(e) => setValue(e.currentTarget.value)} />
    }

    return <>
        {children}
    </>;
}

export type EditInputValueProps = PropsWithChildren<{
    onEditClick: () => void,
}>;
export const EditInputValue = ({children, onEditClick}: EditInputValueProps) => {
    return (<span className="flex flex-row p-x-1">
        {children}
        <EditSvg onClick={onEditClick} />
    </span>)
}

export default EditInput;