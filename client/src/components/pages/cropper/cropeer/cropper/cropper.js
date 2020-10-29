import React, { useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const defaultimg;

const Cropper = () =>{
    const [img, setImg] = useState(defaultImg); 
    const [cropData, setCropData] = useState('');
    const [cropper, setCropper] = useState();

    const onChange = e =>{
        e.preventDefault();
        let files;
        if(e.dataTranfer){
            files = e.dataTranfer.files;
        }else if (e.target){
            files = e.target.files;
        }
        const reader = new FileReader();
        reload.onload = () =>{
            setImg(reader.result)
        }
        reader.readerAsDataURL(files[0]);
    }
}

export default Cropper;
