export default function AmountPicker({
  label = "Amount to show:",
  options,
  currentOption,
  setOption,
}) {
  return (
    <div className="amount-picker-wrapper">
      <label>{label}</label>
      <div className="amount-picker">
        {options?.map((option) => (
          <button
            className={`result-amount ${currentOption === option && "active"}`}
            key={option}
            onClick={() => setOption(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
