import React from "react";
import EditInput, { EditInputProps, EditInputValue } from "./EditInput";

export type PasswordInputProps = Pick<
  EditInputProps,
  "children" | "editOnFocus" | "initialValue" | "onSave" | "saveOnBlur"
>;

const PasswordInput = ({
  children,
  editOnFocus,
  initialValue,
  saveOnBlur,
  onSave,
}: PasswordInputProps) => {
  return (
    <EditInput
      initialValue={initialValue}
      editOnFocus={editOnFocus}
      saveOnBlur={saveOnBlur}
      type="password"
      onSave={onSave}
    >
      <EditInputValue>{children}</EditInputValue>
    </EditInput>
  );
};

export default PasswordInput;
