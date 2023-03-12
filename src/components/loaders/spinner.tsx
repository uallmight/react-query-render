import React from 'react';

export type SpinnerLoaderProps = React.PropsWithChildren<{
    loading?: boolean
}>
const SpinnerLoader = ({children, loading}: SpinnerLoaderProps) => {
    return (<div hidden={loading}>
        {children}
    </div>)
};

export default SpinnerLoader;