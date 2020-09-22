import React from 'react';

export default class Logo extends React.Component{
    render(){
        return(
            <div className='logo'>
                <picture>
                    <img src="/img/LOGO.png" alt="Logo marca Pix4Fun"/>
                </picture>
            </div>
        );
    }
}