import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { uploadAvatar } from '../../services/profile-settings';

import Alert from '../../components/Alert';

import './UploadAvatar.scss';

function UploadAvatarView(props) {
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [avatar, setAvatar] = useState('');
  const [redirect, setRedirect] = useState(false);
  const isInitialMount = useRef(true);
  const [isDefaultUser, setIsDefaultUser] = useState(false);

  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //   } else {
  //     if (props.user.role === 'defaultUser') {
  //       props.history.push('/profile');
  //     } else {
  //       props.history.push(`/artist/${props.user._id}`);
  //     }
  //   }
  // }, [redirect]);

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
      if (props.user.role === 'defaultUser') {
        setIsDefaultUser(true);
      }
      setSuccessMsg('Image uploaded successfully');
      setTimeout(() => {
        setRedirect(true);
      }, 1000);
    } catch (error) {
      console.error(error);
      setErrMsg('Something went wrong!');
      console.log('Upload error: ', error);
    }
    console.log(avatar);
  };

  return (
    <div>
      <h1 className="title">Upload Your Picture</h1>
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
      {redirect && isDefaultUser && (
        <Link to={`/profile`}>
          <button className={'save-changes-btn'}>
            Take me back to my profile
          </button>
        </Link>
      )}
      {redirect && !isDefaultUser && (
        <Link to={`/artist/${props.user._id}`}>
          <button className={'save-changes-btn'}>
            Take me back to my profile
          </button>
        </Link>
      )}
    </div>
  );
}

export default UploadAvatarView;
