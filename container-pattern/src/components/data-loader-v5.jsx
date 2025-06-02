import { useEffect, useState } from 'react';

export const DataLoaderV5 = ({ getData = () => { }, render = () => { } }) => {
    const [resource, setUser] = useState();

    useEffect(() => {
        (async () => {
            const response = await getData();
            setUser(response);
        })();
    }, [getData]);

    return render(resource);
};
