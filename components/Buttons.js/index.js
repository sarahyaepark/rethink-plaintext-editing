import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import css from '../PlaintextEditor/style.css';

export default function Buttons({ handleSave, clearCurrent }) {
  // save button grabs the content from local storage and writes it to the file
  // the save button is mostly for the user to feel assured
  // editor and save button
  return (
    <div className={css.buttons}>
      <Button className={css.delete} variant="danger" onClick={clearCurrent}>
        Clear
      </Button>
      <Button className={css.save} variant="success" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
}

Buttons.propTypes = {
  handleSave: PropTypes.func,
  clearCurrent: PropTypes.func
};
