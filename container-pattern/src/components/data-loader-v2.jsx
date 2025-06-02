import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const DataLoaderV2 = ({ userId, children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        (async () => {
            const response = await axios.get(`/users/${userId}`);
            setUser(response.data);
        })();
    }, [userId]);

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
