import useFetch from "../useFetch";

export default function SearchResultCard({
  avatar_url: avatarURL,
  login,
  type,
  url,
  headers,
  skeleton = false
}) {
  const getResultDetails = async () => {
    try {
      console.time("Detail promise");
      const resultDetails = await fetch(url, { headers });
      console.timeEnd("Detail promise");
      const data = await resultDetails.json();
      console.log(data);
    } catch (e) {}
  };

  return (
    <div className="search-result-card" onClick={getResultDetails}>
      {skeleton ? <div className="icon skeleton" /> : <img className="icon" src={avatarURL} alt="icon" />}
      <summary className="overview">
        <h3 className="username">
          {login}
        </h3>
        <h6 className="type">
          {type}
        </h6>
        {skeleton && <div className="skeleton skeleton-text"></div>}
        {skeleton && <div className="skeleton skeleton-text"></div>}
      </summary>
    </div>
  );
}
