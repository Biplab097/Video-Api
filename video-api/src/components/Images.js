import React from 'react';
import Carousel from "react-elastic-carousel";
import './style.scss';
import "./style/corousal.css";
import axios from 'axios';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];
class Images extends React.Component{
  constructor(props) {
    super(props);
    this.onImageClick = this.onImageClick.bind(this);
    this.state = {
        imageList: [],
    };
  }
  componentDidMount(){
    axios.get('http://localhost:5001')
        .then(response => {
            console.log("coming here components");
            console.log(response);
            var list = response.data.images
            const arr = list.filter(l=> l.caption.includes("ppm") || l.caption.includes("PPM"))
            this.setState({ imageList: arr });
        })
        .catch(err => alert(err));
  }
  onImageClick(e){
    this.setState({
        imageName:e.target.value
    });
  }
  render(){
    console.log("first in render");
    console.log(this.state.imageList);
    return(
   
      <>
        <div className="corousal col-6">
          <Carousel breakPoints={breakPoints}>
          {this.state.imageList.map((file) => (
                <div className="ListImage">
                    <p className="ListImage__Caption">{file.caption}</p>
                    <p className="ListImage__Date">{file.createdAt}</p>
                    <img
                        key={file}
                        src={'http://localhost:5001/image/' + file.filename}
                        alt="list-image"
                        className="ListImage__Image"
                        onClick={()=>{this.props.data.onImageClick(file.caption)}}
                    />
{/* 
                    <button className="ListImage__Delete" onClick={() => this.deleteFile(file._id)}>Delete</button> */}
                </div>
            ))}
          </Carousel>
         </div>
      </>

    )
  }
}
export default Images;