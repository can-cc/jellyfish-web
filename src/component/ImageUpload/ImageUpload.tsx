import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import { Button } from 'antd';
import ReactModal from 'react-modal';
import { getCroppedImage } from './ImageUpload.helper';

import './ImageUpload.css';
import 'react-image-crop/dist/ReactCrop.css';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    transform             : 'translate(-50%, -50%)'
  }
};

export class ImageUpload extends Component<any, any> {
  
  state = {
    modalVisible: false,
    imageDataURL: '',
    cropedimageDataUrl: '',
    crop: {
      x: 0,
      y: 0,
      aspect: 1,
    },
  };
  fileInput: any;
  imageRef: HTMLImageElement;

  handleCancelModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  upload = () => {
    this.props.upload(this.state.cropedimageDataUrl);
    this.closeModal();
  };

  cropImage = (crop) => {
    console.log(crop)
    console.log('pixelCrop', crop, this);
    if (!crop || !this.imageRef) {
      return;
    }
    const cropedimageDataUrl = getCroppedImage(
      this.imageRef, crop
    );
    this.setState({ cropedimageDataUrl });
    this.setState({ crop });
  };

  onCropChange = (crop) => {
    this.setState({ crop });
  };

  onCropComplete = (crop): void => {
    this.cropImage(crop);
  };

  onImageLoaded = (image: HTMLImageElement): void => {
    this.imageRef = image;
    this.cropImage(this.state.crop);
  };

  openFilePicker = () => {
    this.fileInput.click();
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  openModal = () => {
    if (!this.fileInput.files) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.setState({ imageDataURL: e.target.result });
    };
    reader.readAsDataURL(this.fileInput.files[0]);
    this.setState({ modalVisible: true });
    this.fileInput.value = '';
  };

  render() {
    return (
      <div className="image-upload">
        <img
          style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            border: '0',
            backgroundColor: '#f8f8f8'
          }}
          alt=""
          src={this.props.source}
          onClick={this.openFilePicker}
        />
        <input
          ref={ref => (this.fileInput = ref)}
          type="file"
          accept="image/*"
          onChange={this.openModal}
        />

        <ReactModal
          style={customStyles}
          title="裁剪您的新头像2:"
          isOpen={this.state.modalVisible}
        >
          <div className="crop-image-container">
            <ReactCrop
              crop={this.state.crop}
              onChange={this.onCropChange}
              onComplete={this.onCropComplete}
              onImageLoaded={this.onImageLoaded}
              src={this.state.imageDataURL}
            />
          </div>

          <Button type="primary" key="1" onClick={this.upload}>
              上传头像
            </Button>
        </ReactModal>
      </div>
    );
  }
}
