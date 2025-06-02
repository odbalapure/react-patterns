import axios from "axios";
import { DataLoaderV5 } from "./components/data-loader-v5";
import { UserInfo } from "./components/common/user-info";
import { BookInfo } from "./components/common/book-info";

const getData = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

function App() {
  return (
    <>
      <DataLoaderV5
        getData={() => getData("/users/1")}
        resourceName="user"
        render={(resource) => <UserInfo user={resource} />}
      >
        <UserInfo />
      </DataLoaderV5>
      <DataLoaderV5
        getData={() => getData("/books/1")}
        resourceName="book"
      >
        <BookInfo />
      </DataLoaderV5>
    </>
  );
}

export default App;
