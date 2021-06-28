import React from 'react';
import Carousel from "react-elastic-carousel";
import image from './image/Hexagon1.png';
import image1 from './image/hex_ppm1.jpg'
import image2 from './image/hex_ppm2.jpg';
import image3 from './image/hex_ppm3.jpg';
import image4 from './image/hex_ppm4.jpg';
import "./style/corousal.css";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];
class Images extends React.Component{
  render(){
    return(
      // <div className="corousal col-3">
     <> <div className="corousal col-6">
          <Carousel breakPoints={breakPoints}>
            <img onClick={()=>{this.props.data.onImageClick(1)}} src={image} width="250" height="160" alt="hexagon"/>
            <img onClick={()=>{this.props.data.onImageClick(2)}} src={image1} width="250" height="160" alt="ppm1"/>
            <img onClick={()=>{this.props.data.onImageClick(3)}} src={image2} width="250" height="160" alt="ppm2"/>
            <img onClick={()=>{this.props.data.onImageClick(4)}} src={image3} width="250" height="160" alt="ppm3"/>
            <img onClick={()=>{this.props.data.onImageClick(5)}} src={image4} width="250" height="160" alt="ppm4"/>
          </Carousel>
         </div>
      </>

    )
  }
}
export default Images;