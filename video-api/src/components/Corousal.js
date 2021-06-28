import React from 'react';
import Vidplayer from "./Vidplayer";
import Images from'./Images';
// import Logo from './Logo';
import PdfDoc from './Documents'

import {Container,Row,Col} from 'react-bootstrap';

import './style/pdf.css';
class Courousal extends React.Component{
  super(props){
    this.super(props);
  }
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }
  onImageClick = this.onImageClick.bind(this);
  state = {
    caption: '',
    pdfId:''
  }

 async onImageClick(caption){
   console.log("prev state")
   console.log(this.state)
   
   console.log("state after image clicked")
   await this.setState({caption:caption});
  //  alert("image clicked")
  console.log(`After state change ${JSON.stringify(this.state)}`)
  this.child.current.onClick();
 }
 
  render(){
    console.log(this.props);
    return(
      <><hr/><hr/><hr/>
      <Images data={{caption:this.state.caption,
      onImageClick:this.onImageClick.bind(this)}}/>
      <br/><br/>
      <div className="display">
        <Vidplayer ref={this.child} data={{id:this.state.caption,
      onImageClick:this.onImageClick.bind(this)}} id={this.state.caption} age={23}/>
        &nbsp;&nbsp;&nbsp;&nbsp;{"    "}
        <PdfDoc className="height" pdfId={this.state.pdfId}/> 
      </div></>
      )
  }
}

export default Courousal;