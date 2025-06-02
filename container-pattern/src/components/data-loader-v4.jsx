import React, { useEffect, useState } from 'react';

export const DataLoaderV4 = ({ getData = () => { }, resourceName, children }) => {
    const [resource, setUser] = useState();

    useEffect(() => {
        (async () => {
            const response = await getData();
            setUser(response);
        })();
    }, [getData]);

    return (
        <>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // Clone the child element and pass the user as a prop
                    return React.cloneElement(child, { [resourceName]: resource });
                }
                return child;
            })}
        </>
    );
};
