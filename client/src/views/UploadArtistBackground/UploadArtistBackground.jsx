import React, { useState } from 'react';

import { uploadArtistBackground } from '../../services/artist';

import Alert from '../../components/Alert';

function UploadArtistBackgroundView(props) {
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [background, setBackground] = useState('');

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
    } catch (error) {
      console.error(error);
      setErrMsg('Something went wrong!');
      console.log('Upload error: ', error);
    }
    console.log(background);
  };

  return (
    <div>
      <h1 className="title">Upload an Image</h1>
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
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: '100px' }} />
      )}
    </div>
  );
}

export default UploadArtistBackgroundView;
