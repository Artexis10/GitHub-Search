import { useState, useEffect } from "react";

const useFetch = (url, init = {}, dependencies = []) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    if (!url) return;

    setIsPending(true);
    setData(null);

    fetch(url, { ...init, signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("Failed to obtain the results");
        }
        return res.json();
      })
      .then((data) => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => abortCont.abort();
  }, [url, init, ...dependencies]);

  return { data, isPending, error };
};

export default useFetch;
