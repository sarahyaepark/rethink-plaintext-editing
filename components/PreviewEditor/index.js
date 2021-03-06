import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from '../PlaintextEditor/style.css';
import { toast, ToastContainer } from 'react-nextjs-toast';
import { LiveProvider, LivePreview, LiveError } from 'react-live';
import Buttons from '../Buttons.js'

function PreviewEditor({ file, write }) {
  const currentRef = useRef();
  let [value, setValue] = useState('nothing yet');
  const [textLoaded, setTextLoaded] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { LiveEditor } = currentRef.current || {};
  useEffect(() => {
    (async () => {
      let changedTxt = localStorage.getItem(file.name);
      // first checks if there is file content, then checks the local storage
      // if both don't exist, the original text gets called
      if (file.content) {
        setValue(file.content);
      } else if (changedTxt !== null) {
        setValue(changedTxt);
      } else {
        let initText = await file.text();
        setValue(initText);
      }
      setTextLoaded(true);
    })();
    currentRef.current = {
      LiveEditor: require('react-live').LiveEditor
    };
    setEditorLoaded(true);
  }, [file]);

  const handleChange = content => {
    write(file, content);
    setValue(content);
  };

  // save button grabs the content from local storage and writes it to the file
  // the save button is mostly for the user to feel assured
  const handleSave = () => {
    // let changedTxt = localStorage.getItem(file.name);
    write(file, value);
    toast.notify('', {
      duration: 2,
      type: 'success',
      title: '🦄 Saved!'
    });
  };

  const clearCurrent = () => {
    setValue('');
  };
  
  return editorLoaded && textLoaded ? (
    <div className={css.editor}>
      <LiveProvider code={value}>
        <LiveEditor onChange={handleChange} />
        <LivePreview />
        <LiveError />
      </LiveProvider>
      <br />
      <ToastContainer />
      <br />
      <Buttons handleSave={handleSave} clearCurrent={clearCurrent}/>
    </div>
  ) : (
    <img src="https://miro.medium.com/max/1600/1*CsJ05WEGfunYMLGfsT2sXA.gif" />
  );
}

PreviewEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PreviewEditor;
