import React from 'react';
import './GenreCheckbox.scss';

const GenreCheckbox = ({ options, selected, onSelectedChange }) => {
  const handleCheckboxChange = (event) => {
    const { checked, name } = event.target;
    if (checked) {
      // console.log(...selected);
      onSelectedChange([...selected, name]);
    } else {
      onSelectedChange(selected.filter((item) => item !== name));
    }
  };
  return (
    <>
      {options.map(({ value, label }) => (
        <div key={value}>
          <input
            type="checkbox"
            checked={selected?.includes(value)}
            name={value}
            onChange={handleCheckboxChange}
          />
          <label>{label}</label>
        </div>
      ))}
    </>
  );
};

export default GenreCheckbox;
