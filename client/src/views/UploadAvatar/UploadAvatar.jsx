import React, { useState } from 'react';

import { uploadAvatar } from '../../services/profile-settings';

import Alert from '../../components/Alert';

function UploadAvatarView(props) {
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    console.log(e.target.files[0]);
    setAvatar(file);
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
      await uploadAvatar(selectedFile);
      setFileInputState('');
      setPreviewSource('');
      setSuccessMsg('Image uploaded successfully');
    } catch (error) {
      console.error(error);
      setErrMsg('Something went wrong!');
      console.log('Upload error: ', error);
    }
    console.log(avatar);
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

export default UploadAvatarView;
