//      
import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import { Button, Modal } from 'antd';
import { imageCrop } from './ImageUpload.helper';

import './ImageUpload.css';
import 'react-image-crop/dist/ReactCrop.css';

export class ImageUpload extends Component 
   
                
                  
    
   
                          
                         
                               
             
   
  {
  state = {
    modalVisible: false,
    imageDataURL: '',
    cropedimageDataUrl: '',
    crop: {
      x: 0,
      y: 0,
      aspect: 1,
      height: 50,
      width: 50
    }
  };
                 

  handleCancelModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  upload = () => {
    this.props.upload(this.state.cropedimageDataUrl);
    this.closeModal();
  };

  cropImage = async (crop     , pixelCrop     ) => {
    if (!pixelCrop) {
      return;
    }
    const cropedimageDataUrl = await imageCrop(
      this.state.imageDataURL,
      pixelCrop.width,
      pixelCrop.height,
      pixelCrop.x,
      pixelCrop.y
    );
    this.setState({ cropedimageDataUrl });
    this.setState({ crop });
  };

  onCropChange = (crop     , pixelCrop     ) => {
    this.setState({ crop });
  };

  onCropComplete = (crop     , pixelCrop     ) => {
    this.cropImage(crop, pixelCrop);
  };

  onImageLoaded = (crop     , image     , pixelCrop     ) => {
    this.cropImage(crop, pixelCrop);
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
    reader.onload = e => {
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
        <Modal
          title="裁剪您的新头像:"
          className="image-uploader-modal"
          onCancel={this.handleCancelModal}
          visible={this.state.modalVisible}
          footer={[
            <Button type="primary" key="1" onClick={this.upload}>
              上传头像
            </Button>
          ]}
        >
          <div className="crop-image-container">
            <ReactCrop
              style={{ maxHeight: '60vh' }}
              crop={this.state.crop}
              onChange={this.onCropChange}
              onComplete={this.onCropComplete}
              onImageLoaded={this.onImageLoaded}
              src={this.state.imageDataURL}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
