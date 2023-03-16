import React, {
  useState,
  DetailedHTMLProps,
  InputHTMLAttributes,
  PropsWithChildren,
} from "react";
import { EditSvg } from "../icons";
import SpinnerLoader from "../loaders/spinner";

export type EditInputProps = PropsWithChildren<{
  initialValue?: string;
  saveOnBlur?: boolean;
  editOnFocus?: boolean;
  onSave: (value: unknown | any) => Promise<void>;
}> &
  Pick<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    | "type"
    | "title"
    | "required"
    | "role"
    | "checked"
    | "defaultChecked"
    | "defaultValue"
    | "name"
  >;

const EditInput = ({
  initialValue,
  children,
  name,
  required,
  saveOnBlur,
  title,
  type,
  onSave,
}: EditInputProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>(initialValue);

  const onEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave?.(value);
    } finally {
      setIsEditing(false);
      setIsSaving(false);
    }
  };

  return (
    <SpinnerLoader loading={isSaving}>
      {isEditing ? (
        <div className="flex flex-row p-1">
          <label id={`${name}-label`} htmlFor={name}></label>
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
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </div>
      ) : (
        <EditInputValue onEditClick={onEditClick}>{children}</EditInputValue>
      )}
    </SpinnerLoader>
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
    <span className="flex flex-row p-x-1">
      {children}
      <EditSvg className="self-end" onClick={onEditClick} />
    </span>
  );
};

export default EditInput;
