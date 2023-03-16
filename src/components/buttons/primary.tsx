import React, {MouseEvent} from 'react';

export type PrimaryButtonProps = {
    text: string,
    onClick: (e: MouseEvent<HTMLButtonElement>) => void
}
const PrimaryButton = ({
    text,
    onClick
}: PrimaryButtonProps) => {
    return <button role="navigation" className="rounded" onClick={onClick}>
        {text}
    </button>
}

export default PrimaryButton;