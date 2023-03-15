import React, { useState, DetailedHTMLProps, InputHTMLAttributes, PropsWithChildren } from 'react';
import { EditSvg } from '../icons';

export type EditInputProps = PropsWithChildren<{
    initialValue?: string,
    saveOnBlur?: boolean,
    editOnFocus?: boolean,
    onSave: (value: unknown) => void,
}> & Pick<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "type" | "title"|"required" | "role" | "checked" | "defaultChecked" | "defaultValue" | "name">

const EditInput = ({
    initialValue,
    children,
    editOnFocus,
    name,
    required,
    saveOnBlur,
    title,
    type,
    onSave,
}: EditInputProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [value, setValue] = useState<string | undefined>(initialValue);

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
        return (<div>
            <label id={`${name}-label`} htmlFor={name}></label>
            <input
                title={title}
                placeholder=''
                aria-labelledby={`${name}-label`}
                name={name}
                type={type}
                required={required}
                value={value}
                onBlur={onBlur}
                onFocus={handleFocus}
                onChange={(e) => setValue(e.currentTarget.value)} />
        </div>)
    }

    return <EditInputValue onEditClick={onEditClick}>
        {children}
    </EditInputValue>
}

export type EditInputValueProps = PropsWithChildren<{
    onEditClick: () => void,
}>;
export const EditInputValue = ({ children, onEditClick }: EditInputValueProps) => {
    return (<span className="flex flex-row p-x-1">
        {children}
        <EditSvg onClick={onEditClick} />
    </span>)
}

export default EditInput;