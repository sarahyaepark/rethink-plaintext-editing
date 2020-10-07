import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import css from '../PlaintextEditor/style.css';
import Buttons from '../Buttons.js'
import { toast, ToastContainer } from 'react-nextjs-toast';
import { CopyBlock, dracula } from "react-code-blocks";

function JavascriptEditor({ file, write }) {
  let [value, setValue] = useState('nothing yet');
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    // this block loads the existing file text or changed content
    (async () => {
      let changedTxt = localStorage.getItem(file.name);
      if (file.content) {
        setValue(file.content);
      } else if (changedTxt !== null) {
        setValue(changedTxt);
      } else {
        setValue(await file.text());
      }
    })();
    setEditorLoaded(true);
  }, [file]);

  const handleChange = (event) => {
    write(file, event.target.value);
    setValue(event.target.value);
  };

  // save button grabs the content from local storage and writes it to the file
  // the save button is mostly for the user to feel assured
  const handleSave = () => {
    write(file, value);
    toast.notify('', {
      duration: 2,
      type: 'success',
      title: '🦄 Saved!'
    });
  };
  const clearCurrent = () => {
    setValue(' ');
  };
  return editorLoaded ? (
    <div className={css.editor}>
      <CopyBlock
          language={'javascript'}
          text={value}
          showLineNumbers={true}
          theme={dracula}
          wrapLines={true}
          codeBlock
          className={css.editorPreview}
        />
      <br/>
      <ToastContainer />
      <textarea className={css.jsEditor} value={value} onChange={handleChange}/>
      <br />
      <Buttons handleSave={handleSave} clearCurrent={clearCurrent}/>
    </div>
  ) : (
    <img src="https://miro.medium.com/max/1600/1*CsJ05WEGfunYMLGfsT2sXA.gif" />
  );
}

JavascriptEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default JavascriptEditor;
