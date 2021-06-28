import React from 'react';
import Carousel from "react-elastic-carousel";
import axios from 'axios'
// import image from './image/doc_img1.jpg';
// import image1 from './image/doc_img2.jpg'
// import image2 from './image/doc_img3.jpg';
// import image3 from './image/doc_img4.jpg';
// import image4 from './image/doc_img5.jpg';
import "./style/slide.css";

const breakPoints = [
  { width: 4, itemsToShow: 4},
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];
class PdfSlide extends React.Component{
  
  constructor(props) {
    super(props);
    //this.onPdfClick = this.onPdfClick.bind(this);
    this.state = {
        imageList: [],
    };
  }

  componentDidMount(){
    axios.get('http://localhost:5001')
        .then(response => {
            console.log("coming here components pdfslide");
            console.log(response);
            var list = response.data.images
            const arr = list.filter(l=> l.caption.includes("Document"))
            this.setState({ imageList: arr });
        })
        .catch(err => alert(err));
  }


  render(){
    return(
      // <div className="corousal col-3">
     <> <div className="slide col-6">
          <Carousel breakPoints={breakPoints}>
          {this.state.imageList.map((file) => (
                    <img
                        src={'http://localhost:5001/image/' + file.filename}
                        alt="list-image"
                        width="70" height="60"
                        onClick={()=>{this.props.data.onPdfClick(file.caption)}}
                    />
            ))}
            {/* <img  onClick={()=>{this.props.data.onPdfClick(1)}} src={image} width="80" height="70" alt="hexagon"/>
            <img  onClick={()=>{this.props.data.onPdfClick(2)}} src={image1} width="80" height="70" alt="ppm1"/>
            <img  onClick={()=>{this.props.data.onPdfClick(3)}} src={image2} width="80" height="70" alt="ppm2"/>
            <img  onClick={()=>{this.props.data.onPdfClick(4)}} src={image3} width="80" height="70" alt="ppm3"/>
            <img  onClick={()=>{this.props.data.onPdfClick(5)}} src={image4} width="80" height="70" alt="ppm4"/> */}
          </Carousel>
         </div>
      </>

    )
  }
}
export default PdfSlide;