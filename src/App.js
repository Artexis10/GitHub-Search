import { useState } from "react";
import useFetch from "./useFetch";
import SearchBar from "./components/SearchBar";
import SearchType from "./components/SearchType";
import AmountPicker from "./components/AmountPicker";
import Content from "./components/Content";
import SearchResultCard from "./components/SearchResultCard";
import { init, apiBase } from "./global";
import { useSearchParams } from "react-router-dom";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const resultsPerPage = parseInt(searchParams.get("per_page")) || "";
  const type = searchParams.get("type") || "user";

  const [url, setURL] = useState(
    query && `${apiBase}?q=${query}&per_page=${resultsPerPage}+type:${type}`
  );
  const { data, isPending, error } = useFetch(url, init);

  const isDataEmpty = Object.keys(data ?? {}).length === 0;
  let skeletonPlaceholder = [];
  let searchParamsObj = {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setURL(`${apiBase}?q=${query}&per_page=${resultsPerPage}+type:${type}`);
    //   // console.time("Promises");
    //   // const detailResponse = await Promise.all(data.items.map((item) => fetch(item.url, { headers })));
    //   // // const detailResponse = await Promise.all(data.items.map((item) => fetch(item.url, { headers }).then(detail => detail.json())));
    //   // const detailResponseParsed = await Promise.all(detailResponse.map((detail) => detail.json()));
    //   // console.timeEnd("Promises");
  };

  for (let i = 0; i < 10; i++) {
    skeletonPlaceholder.push(<SearchResultCard key={i} skeleton={isPending} />);
  }

  searchParams.forEach((value, key) => {
    searchParamsObj[key] = value;
  });

  return (
    <div id="app">
      <h1 className="title">GitHub Search Engine</h1>
      <SearchBar onSubmit={handleSubmit}>
        <AmountPicker
          label="Results to show:"
          options={[30, 60, 90]}
          currentOption={resultsPerPage}
          setOption={(option) =>
            setSearchParams({ ...searchParamsObj, per_page: option })
          }
        />
        <SearchType
          typeLabels={["Users", "Organizations"]}
          typeValues={["user", "org"]}
          currentType={type}
          setType={(value) =>
            setSearchParams({ ...searchParamsObj, type: value })
          }
        />
        <input
          className="search-field"
          type="text"
          name="search"
          value={query}
          onChange={(e) =>
            setSearchParams({ ...searchParamsObj, q: e.target.value })
          }
          placeholder="Search for users or organizations..."
        />
        <input
          className="search-button"
          type="submit"
          value="Search"
          disabled={isPending}
        />
      </SearchBar>
      <Content>
        {!isDataEmpty && (
          <h2>
            Found {data.total_count}{" "}
            {data.total_count === 1 ? "result" : "results"}
          </h2>
        )}
        {error && <h2>{error}</h2>}
        {!error &&
          data?.items?.map((item) => (
            <SearchResultCard key={item.id} {...item} headers={{}} />
          ))}
        {isPending && skeletonPlaceholder}
      </Content>
    </div>
  );
}

export default App;
