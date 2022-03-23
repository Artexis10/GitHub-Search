import { useState } from "react";
import useFetch from "./useFetch";
import SearchBar from "./components/SearchBar";
import SearchType from "./components/SearchType";
import AmountPicker from "./components/AmountPicker";
import Content from "./components/Content";
import { init, apiBase } from "./global";
import { useSearchParams } from "react-router-dom";
import SearchResultCards from "./components/SearchResultCards";
import { SearchTypeLabels, SearchTypeValues } from "./enums";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const resultsPerPage = parseInt(searchParams.get("per_page")) || 30;
  const type = searchParams.get("type") || "user";
  const [url, setURL] = useState(
    query && `${apiBase}?per_page=${resultsPerPage}&q=${query}+type:${type}`
  );
  const { data, isPending, error } = useFetch(url, init, 250);
  const isDataEmpty = Object.keys(data ?? {}).length === 0;
  let searchParamsObj = {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    setURL(`${apiBase}?per_page=${resultsPerPage}&q=${query}+type:${type}`);
  };

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
          typeLabels={Object.values(SearchTypeLabels)}
          typeValues={Object.values(SearchTypeValues)}
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
        <SearchResultCards data={data?.items} isPending={isPending} />
      </Content>
    </div>
  );
}

export default App;
