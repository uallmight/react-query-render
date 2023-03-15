import React, {MouseEvent} from 'react';

export type PrimaryButtonProps = {
    text: string,
    onClick: (e: MouseEvent<HTMLButtonElement>) => void
}
const PrimaryButton = ({
    text,
    onClick
}: PrimaryButtonProps) => {
    return <button role="button" onClick={onClick}>

    </button>
}

export default PrimaryButton;