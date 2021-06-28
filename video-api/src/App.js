import React from 'react';
// import {Grid} from '@material-ui/core';
// import Paper from '@material-ui/core/Paper';
// import {makeStyles} from '@material-ui/core/styles';
import {BrowserRouter,Route,Switch} from "react-router-dom";
import Navbar from './components/Navbar';
// import Vidplayer from './components/Vidplayer'
import Corousal from './components/Corousal';
import Upload from './components/Upload';
import Home from './components/Home';
import {Container,Row,Col} from 'react-bootstrap';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class App extends React.Component{
 
  render(){
    return(
    <>  <Navbar/><hr/><hr/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/view" component={Corousal}/>
          <Route path='/upload' component={Upload} />
        </Switch>
        {/* <Upload/> */}
       {/* <Container style={{backgroundColor:"#f4f4f4"}} >
        <Row>
          <Col></Col>
        </Row>
        <br/><br/><br/>
        <Row>
          <Col><Corousal/></Col></Row>
       </Container> */}

    </>
    )
  }
}
export default App;