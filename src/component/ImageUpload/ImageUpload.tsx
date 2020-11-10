import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import { AppModal } from '../Modal';
import { getCroppedImage } from './ImageUpload.helper';
import { ModalHeader } from '../ModalHeader';
import { AppButton } from '../AppButton';

import './ImageUpload.css';
import 'react-image-crop/dist/ReactCrop.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
};

export class ImageUpload extends Component<
  {
    imageSource: string;
    onCrop: (data: string) => void;
  },
  {
    modalVisible: boolean;
    cropedImageData: string;
    imageDataURL: string;
    crop: {
      x: number;
      y: number;
      aspect: number;
    };
  }
> {
  state = {
    modalVisible: false,
    imageDataURL: '',
    cropedImageData: '',
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
      modalVisible: false,
    });
  };

  upload = () => {
    this.props.onCrop(this.state.cropedImageData);
    this.closeModal();
  };

  cropImage = (crop) => {
    if (!crop || !this.imageRef) {
      return;
    }
    const cropedImageData = getCroppedImage(this.imageRef, crop);
    this.setState({ cropedImageData });
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

  openFilePicker = (): void => {
    this.fileInput.click();
  };

  closeModal = (): void => {
    this.setState({ modalVisible: false });
  };

  openModal = (): void => {
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
      <div className="app-image-upload">
        <img
          style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            border: '0',
            backgroundColor: '#f8f8f8',
          }}
          alt=""
          src={this.props.imageSource}
          onClick={this.openFilePicker}
        />
        <AppButton
          className="app-image-upload--upload-button"
          onClick={this.upload}
          title="Upload Avatar"
        />

        <input
          ref={(ref) => (this.fileInput = ref)}
          type="file"
          accept="image/*"
          onChange={this.openModal}
        />

        <AppModal
          style={customStyles}
          isOpen={this.state.modalVisible}
          // isOpen={true}
        >
          <ModalHeader title="Crop your avatar" closeable={true} onClose={this.closeModal} />

          <div className="app-crop-image-container">
            <ReactCrop
              crop={this.state.crop}
              onChange={this.onCropChange}
              onComplete={this.onCropComplete}
              onImageLoaded={this.onImageLoaded}
              src={this.state.imageDataURL}
            />
          </div>

          <AppButton type="primary" onClick={this.upload} title="上传头像" />
        </AppModal>
      </div>
    );
  }
}
