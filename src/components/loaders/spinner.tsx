import React from 'react';
import SpinnerSvgIcon from '../icons/spinner';

export type SpinnerLoaderProps = React.PropsWithChildren<{
    loading?: boolean,
    
}>
const SpinnerLoader = ({children, loading}: SpinnerLoaderProps) => {
    if (loading) {
        return (<div className="flex flex-row">
            <SpinnerSvgIcon />
        </div>)
    }
    return (<div hidden={loading} className="bg-blend-overlay">
        {children}
    </div>)
};

export default SpinnerLoader;