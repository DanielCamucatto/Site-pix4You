import React from 'react';
import MainContent from './Main/MainContent';
import MainFAQ from './Main/MainFAQ';
import MainPack from './Main/MainPack';
export default class Main extends React.Component{
    render(){
        return(
            <div>
            <MainContent/>
            <MainPack/>
            <MainFAQ/>
            </div>
            
        );
    }
}