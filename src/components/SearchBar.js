export default function SearchBar({ onSubmit, children }) {
  return <form className="search-bar" onSubmit={onSubmit}>{children}</form>;
}
