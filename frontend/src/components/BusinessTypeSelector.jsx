const BUSINESS_TYPES = [
  { value: '', label: 'General' },
  { value: 'food', label: 'Food & Dining' },
  { value: 'gym', label: 'Fitness & Gym' },
  { value: 'clothing', label: 'Retail & Apparel' },
];

export default function BusinessTypeSelector({ selected, onChange }) {
  return (
    <div className="btn-group">
      {BUSINESS_TYPES.map((type) => (
        <button
          key={type.value}
          className={`tab-btn ${selected === type.value ? 'active' : ''}`}
          onClick={() => onChange(type.value)}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
}
