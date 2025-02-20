import { useState } from "react";
import "./App.css";
import { useEffect, useCallback } from "react";

function App() {
  const [search, setSearch] = useState();

  let debounceTimeout;
  const debounce = (func, delay) => {
    return (...args) => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleChange = (e) => {
    const { value } = e.target;
    fetch(`https://demo.dataverse.org/api/search?q=${value}`)
      .then((res) => res.json())
      .then((res) => setSearch(res.data.items));
  };

  const debouncedHandleChange = useCallback(debounce(handleChange, 300), []);

  useEffect(() => {
    return () => {
      clearTimeout(debounceTimeout);
    };
  }, []);

  return (
    <div>
      <input
        type="text"
        name="search"
        placeholder="Enter Something..."
        onChange={debouncedHandleChange}
        className={search}
      />
      {search?.length > 0 && (
        <div>
          {search.map((val) => (
            <h1 key={val.name}>{val.name}</h1>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
