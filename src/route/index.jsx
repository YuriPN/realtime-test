import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import UploadFile from '../main/main'
import HistoryVersion from '../components/version'

class Router extends Component {

  render() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/realtime-test/editor" exact={true} component={UploadFile} />
                <Route path="/realtime-test/editor/:documentId/version/:currentDocumentId/:previousDocumentId" component={HistoryVersion} />
                <Route path='*' component={UploadFile} />
                <Route path='realtime-test/editor/language/pt_BR.js' ></Route>
            </Switch>
        </ BrowserRouter>
    );
  }

}

export default Router;
