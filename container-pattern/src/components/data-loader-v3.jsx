import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const DataLoaderV3 = ({ resourceName, resourceUrl, children }) => {
    const [resource, setUser] = useState();

    useEffect(() => {
        (async () => {
            const response = await axios.get(resourceUrl);
            setUser(response.data);
        })();
    }, [resourceUrl]);

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
