import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import  home from './components/pages/home/Index';
import loja from './components/pages/loja';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={home}/>
                 <Route path='/loja' component={loja}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
