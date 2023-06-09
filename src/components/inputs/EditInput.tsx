import React, { useState, InputHTMLAttributes, PropsWithChildren } from "react";
import { PrimaryButton } from "../buttons";
import { EditSvg } from "../icons";
import SpinnerLoader from "../loaders/spinner";

export type EditInputProps = PropsWithChildren<{
  label: string;
  initialValue?: string;
  saveOnBlur?: boolean;
  editOnFocus?: boolean;
  onSave: (value: unknown | any) => Promise<void>;
}> &
  Pick<
    InputHTMLAttributes<HTMLInputElement>,
    | "type"
    | "title"
    | "required"
    | "role"
    | "checked"
    | "defaultChecked"
    | "defaultValue"
    | "name"
  >;
/**
 * Edit input standardizing label and input styling and positions.
 * @param {EditInputProps} props
 * @returns {JSX.Element}
 */
const EditInput = ({
  label,
  initialValue,
  children,
  name,
  required,
  saveOnBlur,
  title,
  type,
  onSave,
}: EditInputProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>(initialValue);

  const onEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (value === initialValue) {
      setIsEditing(false);
      return;
    }
    setIsSaving(true);
    try {
      await onSave?.(value);
    } finally {
      setIsEditing(false);
      setIsSaving(false);
    }
  };

  if (isSaving) {
    return <SpinnerLoader />;
  }

  if (!isEditing) {
    return (
      <EditInputValue onEditClick={onEditClick}>{children}</EditInputValue>
    );
  }

  return (
    <div className="flex flex-row gap-x-2">
      <div role="group" className="flex flex-col gap-y-2 grow">
        <label id={`${name}-label`} htmlFor={name}>
          {label}
        </label>
        <input
          className="border-stone-700 border-x border-y rounded focus:border-cyan-400 focus:shadow-none grow"
          title={title}
          aria-labelledby={`${name}-label`}
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
      </div>
      <PrimaryButton onClick={handleSave}>{value === initialValue ? "Cancel" : "Save"}</PrimaryButton>
    </div>
  );
};

export type EditInputValueProps = PropsWithChildren<{
  onEditClick: () => void;
}>;
export const EditInputValue = ({
  children,
  onEditClick,
}: EditInputValueProps) => {
  return (
    <span className="flex flex-row p-x-1 grow">
      {children}
      <EditSvg className="self-end" onClick={onEditClick} />
    </span>
  );
};

export default EditInput;
