import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { uploadArtistBackground } from '../../services/artist';

import Alert from '../../components/Alert';

function UploadArtistBackgroundView(props) {
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [background, setBackground] = useState('');
  const [redirect, setRedirect] = useState(false);
  const isInitialMount = useRef(true);

  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //   } else {
  //     props.history.push(`/artist/${props.user._id}`);
  //   }
  // }, [redirect]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    console.log(e.target.files[0]);
    setBackground(file);
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    try {
      await uploadArtistBackground(selectedFile);
      setFileInputState('');
      setPreviewSource('');
      setSuccessMsg('Image uploaded successfully');
      setTimeout(() => {
        setRedirect(true);
      }, 1000);
    } catch (error) {
      console.error(error);
      setErrMsg('Something went wrong!');
      console.log('Upload error: ', error);
    }
    console.log(background);
  };

  return (
    <div>
      <h1 className="title">Upload Your Background Image</h1>
      <Alert msg={errMsg} type="danger" />
      <Alert msg={successMsg} type="success" />
      <form onSubmit={handleSubmitFile} className="form">
        <input
          id="fileInput"
          type="file"
          name="image"
          value={fileInputState}
          onChange={handleFileInputChange}
          className="form-input"
        />
        <button className="save-changes-btn" type="submit">
          Submit
        </button>
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: '100px' }} />
      )}
      {redirect && (
        <Link to={`/artist/${props.user._id}`}>
          <button className={'save-changes-btn'}>
            Take me back to my profile
          </button>
        </Link>
      )}
    </div>
  );
}

export default UploadArtistBackgroundView;
