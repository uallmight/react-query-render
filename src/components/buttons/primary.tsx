import React, {PropsWithChildren, ButtonHTMLAttributes} from 'react';

export type PrimaryButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;
/**
 * Creates a stylied button for a primary form action. The role by default is set to default as a "button"
 * @param {PrimaryButtonProps} props Children will be rendered inside of the button.
 * @returns {JSX.Element}
 */
const PrimaryButton = (props: PrimaryButtonProps): JSX.Element => {
    return <button {...props}>
        {props.children}
    </button>
}

export default PrimaryButton;