import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const DataLoaderV1 = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        (async () => {
            const response = await axios.get('/current-user');
            setUser(response.data);
        })();
    }, []);

    return (
        <>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // Clone the child element and pass the user as a prop
                    return React.cloneElement(child, { user });
                }
                return child;
            })}
        </>
    );
};
