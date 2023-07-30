const Radiobox = ({ options, selectedOption, onChange }) => {
  return (
    <div className="space-y-4">
      {options.map((option) => (
        <label key={option} className="inline-flex items-center">
          <input
            type="radio"
            name="radiobox"
            value={option}
            className="form-radio h-4 w-4 text-indigo-600"
            checked={selectedOption === option}
            onChange={(e) => onChange(e.target.value)}
          />
          <span className="ml-2 text-gray-700">{option}</span>
        </label>
      ))}
    </div>
  );
};

export default Radiobox;