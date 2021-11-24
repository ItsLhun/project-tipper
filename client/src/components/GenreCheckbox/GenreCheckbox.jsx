import React, { useEffect } from 'react';
import './GenreCheckbox.scss';

const GenreCheckbox = ({ options, selected, onSelectedChange, blobSize }) => {
  const handleCheckboxChange = (event) => {
    const { checked, name } = event.target;
    if (checked) {
      onSelectedChange([...selected, name]);
    } else {
      onSelectedChange(selected.filter((item) => item !== name));
    }
  };
  const handleClickChange = (value) => {
    const checked = selected.includes(value);
    if (!checked) {
      onSelectedChange([...selected, value]);
    } else {
      onSelectedChange(selected.filter((item) => item !== value));
    }
  };

  return (
    <div className="GenreCheckboxHolder">
      {options.map(({ value, label }) => (
        <div
          className={`GenreBox
          ${selected?.includes(value) ? 'GenreBox-active' : ''}
          ${blobSize === 'small' ? 'small-blob' : ''}`}
          key={value}
          onClick={() => {
            handleClickChange(value);
          }}
        >
          <input
            type="checkbox"
            checked={selected?.includes(value)}
            name={value}
            onChange={handleCheckboxChange}
          />
          <label>{label}</label>
        </div>
      ))}
    </div>
  );
};

export default GenreCheckbox;
