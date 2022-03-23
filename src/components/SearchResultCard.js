import { useState, useEffect, useRef } from "react";
import useFetch from "../useFetch";
import { init } from "../global";
import DetailBubbles from "./DetailBubbles";

export default function SearchResultCard({
  avatar_url: avatarURL,
  login,
  type,
  url,
  handleOpen,
  skeleton = false,
}) {
  const cardRef = useRef();
  const [detailsURL, setDetailsURL] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { data, isPending } = useFetch(detailsURL, init, 250);
  const detailObj = {
    "Public repos": data?.public_repos,
    Followers: data?.followers,
    Following: data?.following,
    Location: data?.location,
    Company: data?.company,
    Joined: new Date(data?.created_at).getFullYear(),
    Blog: data?.blog,
    Email: data?.email,
    Twitter: data?.twitter_username,
  };

  useEffect(() => {
    if (isOpen) setDetailsURL(url);
  }, [isOpen]);

  const details = isPending ? (
    <>
      <div className="skeleton skeleton-text" />
      <div className="skeleton skeleton-text" />
      <div className="skeleton skeleton-text" />
      <div className="skeleton skeleton-text" />
    </>
  ) : (
    <>
      <h3 className="username">{data?.login}</h3>
      <h6 className="type">{data?.type}</h6>
      <p className="bio">{data?.bio}</p>
      <DetailBubbles detailObj={detailObj} />
      <a className="button" href={data?.html_url} target="_blank">
        Go to profile
      </a>
    </>
  );

  return (
    <div
      className="search-result-card"
      onClick={() => handleOpen(cardRef.current, isOpen, setIsOpen)}
      ref={cardRef}
    >
      {skeleton || isPending ? (
        <div className="icon skeleton" />
      ) : (
        <img className="icon" src={avatarURL} alt="icon" />
      )}
      {!isOpen ? (
        <summary className="overview">
          <h3 className="username">{login}</h3>
          <h6 className="type">{type}</h6>
          {skeleton && <div className="skeleton skeleton-text"></div>}
          {skeleton && <div className="skeleton skeleton-text"></div>}
        </summary>
      ) : (
        <div className="details">{details}</div>
      )}
    </div>
  );
}
