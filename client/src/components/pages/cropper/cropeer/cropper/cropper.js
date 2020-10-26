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
        const reder = new FileReader();
        reload.onload = () =>{
            setImg(reader.result)
        }
        reader.readerDataURL(files[0]);
    }
    const getCropData = () => {
        if(typeof cropper !== 'undefined'){
            setCropData(cropper.getCropData().toDataURL());
        }
    }

}

export default Cropper;
