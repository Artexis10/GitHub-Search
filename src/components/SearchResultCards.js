import { useRef } from "react";
import SearchResultCard from "./SearchResultCard";

export default function SearchResultCards({ data, isPending }) {
  const openCard = useRef();
  let skeletonPlaceholder = [];

  const handleOpen = (card, isOpen, setIsOpen) => {
    if (isOpen) return;
    if (openCard?.current?.card) openCard.current.setIsOpen(false);
    openCard.current = {
      card,
      setIsOpen,
    };
    setIsOpen((prevState) => !prevState);
  };

  for (let i = 0; i < 10; i++) {
    skeletonPlaceholder.push(<SearchResultCard key={i} skeleton />);
  }

  return (
    <div className="search-result-cards">
      {isPending
        ? skeletonPlaceholder
        : data?.map((item) => (
            <SearchResultCard
              key={item?.id}
              {...item}
              handleOpen={handleOpen}
            />
          ))}
    </div>
  );
}
