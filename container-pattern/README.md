## Container/Presentational Pattern

This pattern enforces separation of concerns. With this pattern, we can separate the view from the application logic:
- **Presentational Components**: Components that care about how data is shown to the user. Eg: `UserInfo` component.
- **Container Components**: Components that care about what data is shown to the user. Eg: `UserLoaderVx` component.

### Variation #1

This approach is tightly coupled to the `current-user` endpoint
What if we want to display a user based on `id`

```javascript
export const UserLoaderV1 = ({ children }) => {
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
                    return React.cloneElement(child, { user });
                }
                return child;
            })}
        </>
    );
};
```

### Variation #2

This solution is slightly generic that takes `userId` as props.
What if we pass `resource url` and `resource name` to make it more generic.

```javascript
export const UserLoaderV2 = ({ userId, children }) => {
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
                    return React.cloneElement(child, { user });
                }
                return child;
            })}
        </>
    );
};
```

### Variation #3

Now this implementation is even more generic; this will not only works for displaying user details but details of any resource until and unless we pass a valid url (resourceUrl) and key (resourceName). 

```javascript
export const CurrentUserLoaderV3 = ({ resourceName, resourceUrl, children }) => {
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
                    return React.cloneElement(child, { [resourceName]: resource });
                }
                return child;
            })}
        </>
    );
};
```

### Variation #4

We can extract the data fetching logic out of this component

```javascript
const getData = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

<CurrentUserLoaderV4
    getData={() => getData("/users/1")}
    resourceName="user"
>
    <UserInfo />
</CurrentUserLoaderV4>

export const CurrentUserLoaderV4 = ({ getData = () => { }, resourceName, children }) => {
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
                    return React.cloneElement(child, { [resourceName]: resource });
                }
                return child;
            })}
        </>
    );
};
```

### Variation #5

Using `Container/Presentational` pattern with a render prop variation

```javascript
<UserLoaderV5
    getData={() => getData("/users/1")}
    resourceName="user"
    render={(resource) => <UserInfo user={resource} />}
>
    <UserInfo />
</UserLoaderV5>

// NOTE: "render" requires an explicit function declaration where "getData" does not
export const UserLoaderV5 = ({ getData = () => { }, render = () => { } }) => {
    const [resource, setUser] = useState();

    useEffect(() => {
        (async () => {
            const response = await getData();
            setUser(response);
        })();
    }, [getData]);

    return render(resource);
};
```