import React, { Component } from 'react'
import Carousel from "react-elastic-carousel";
import img1 from './image/construction1.jpg';
import img2 from './image/construction2.jpg';
import img3 from './image/construction3.jpg';
import './style/home.css';
const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 1550, itemsToShow: 2 },
    { width: 2768, itemsToShow: 3 },
    { width: 3200, itemsToShow: 4 },
  ];
class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            imageList: [img1,img2,img3]
        };
      }
  


    render(){
        //console.log(...this.settings);
        return(
            <>
            <hr/><hr/><hr/>
            <h1 class="align">Architecture, Engineering & Construction (AEC)</h1>
            <div className="corousal col-6">
            <Carousel breakPoints={breakPoints}>
                {this.state.imageList.map((file) => (
                <div>
                    <img class="img"
                        key={file}
                        src={file} />
                </div>
                ))}
          </Carousel>
         </div>
            </>
        )
    }
}
export default Home;








// import React, { useState } from 'react';
// import { SliderData } from './SliderData';
// import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
// import "./style/home.css"

// class Home extends React.Component{
// state = {
//     current:0,
//     length:SliderData.length
// }

// nextSlide(){
//     if(this.state.length===this.state.length-1) this.setState({current:0})
//     else this.setState({current:this.current+1})
//     //this.setState({this.state.current === this.state.length - 1 ? 0 : this.state.current + 1});
//   };

//   prevSlide(){
//     if(this.state.length===0) this.setState({current:this.state.length-1})
//     else this.setState({current:this.current-1})
//     //this.setState(this.state.current === 0 ? this.state.length - 1 : this.state.current - 1);
//   };

// //   if (!Array.isArray(SliderData) || SliderData.length <= 0) {
// //     return null;
// //   }
//     render(){
//         console.log(SliderData);
//         return(
//         <section className='slider'>
//             <FaArrowAltCircleLeft className='left-arrow' onClick={this.prevSlide()} />
//             <FaArrowAltCircleRight className='right-arrow' onClick={this.nextSlide()} />
//             {SliderData.map((slide, index) => {
//             return (
//             <div
//                 className={index === this.state.current ? 'slide active' : 'slide'}
//                 key={index}
//             >
//                 {index === this.state.current && (
//                     <img src={slide.image} alt='travel image' className='image' />
//                 )}
//             </div>
//             );
//             })}
//         </section>
//         )
//     }
// }
// export default Home;    
    



// const slides = this.props.route.slides
// const Home = ({ SliderData }) => {
//   const [current, setCurrent] = useState(0);
//   console.log(SliderData);
//   const length = SliderData.length;
//     //const length = 4;
//   const nextSlide = () => {
//     setCurrent(current === length - 1 ? 0 : current + 1);
//   };

//   const prevSlide = () => {
//     setCurrent(current === 0 ? length - 1 : current - 1);
//   };

//   if (!Array.isArray(SliderData) || SliderData.length <= 0) {
//     return null;
//   }

//   return (
//     <section className='slider'>
//       <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
//       <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
//       {SliderData.map((slide, index) => {
//         return (
//           <div
//             className={index === current ? 'slide active' : 'slide'}
//             key={index}
//           >
//             {index === current && (
//               <img src={slide.image} alt='travel image' className='image' />
//             )}
//           </div>
//         );
//       })}
//     </section>
//   );
// };

// export default Home;