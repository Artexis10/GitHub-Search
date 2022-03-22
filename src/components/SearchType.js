export default function SearchType({ typeLabels, typeValues, currentType, setType }) {
  return (
    <div className="types-wrapper">
      {typeLabels?.map((typeLabel, i) => (
        <div className="type-wrapper" key={typeValues[i]}>
          <label htmlFor={typeLabel.toLowerCase()}>{typeLabel}</label>
          <input
            type="radio"
            name="type"
            id={typeLabel.toLowerCase()}
            checked={currentType === typeValues[i]}
            onChange={() => setType(typeValues[i])}
          />
        </div>
      ))}
    </div>
  );
}
