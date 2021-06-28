import React from 'react';
import ModalCard from './ModalCard';

import video1 from "../writeTo/ppm1.mp4"
// import video2 from "./video/ppm2.mp4"
// import video3 from "./video/ppm3.mp4"
// import video4 from "./video/ppm4.mp4"
// import video5 from "./video/ppm5.mp4"

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';

import Dialog from './maxWidthDialog'
//import useEff
import axios from 'axios';

// import {Card,Button} from 'react-bootstrap';
import './style/vidplayer.css'

// const styles = makeStyles((theme) => ({
//   root:{
//     maxWidth:345,
//   },
//   media:{
//     height:0,
//     paddingTop:'56.25%',
//   },
// })); //add


class Vidplayer extends React.Component{

  constructor(props) {
    super(props);
    var res = this.props.id
    var last = res.split("-")
    var final = 0
    var final = parseInt(last[1])
    //this.onImageClick = this.onImageClick.bind(this);
    //this.print1 = this.print1.bind(this);
    //this.fetchVideo = this.fetchVideo.bind(this);
    this.state = {
        video: {},id:final
    };
    //this.onImageClick(this.props.id)
    
  }

  // componentDidMount(id){
  //   axios.get('http://localhost:5001/file/'+this.state.id)
  //       .then(response => {
  //           console.log("coming here components fetchVideo"+this.state.id);
  //           //console.log(response);
  //           var vid = response.data.file
  //           //const arr = list.filter(l=> l.caption.includes("ppm") || l.caption.includes("PPM"))
  //           this.setState({ video: vid });
  //           console.log(this.state.video);
  //           //console.log(this.state.videoList.filename);
  //       })
  //       .catch(err => alert(err));
  // }
  onClick(id){
    var res = this.props.id
    var last = res.split('-')
    var final = parseInt(last[1])
    var name = 'ppm'+final+'.mp4'
    console.log("in onclick vidplayer component "+name);
    axios.get('http://localhost:5001/file/'+name)
        .then(response => {
            console.log("coming here components onclick "+name);
            //console.log(response);
            var vid = response.data.file
            //const arr = list.filter(l=> l.caption.includes("ppm") || l.caption.includes("PPM"))
            this.setState({ video: vid });
            console.log(this.state.video);
            //console.log(this.state.videoList.filename);
        })
        .catch(err => alert(err));
  }
 
  render(){
    console.log(`here Video id ${this.props.id}`)
    var res = this.props.id
    var last = res.split('-')
    var final = parseInt(last[1])
    var name = 'ppm'+final+'.mp4'
    console.log(name);
    //console.log("okkk "+this.state.video.filename);
    // if(undefined===this.state.videoList.filename)
    //  this.state.videoList.filename="ppm10.mp4";
    // console.log(this.state.videoList.filename);
    //this.print1(this.props.id)
    //this.componentDidMount()
    //this.onImageClick(this.props.id)
    // console.log("videoId")
    // console.log(this.props.id)
    // let obj ={
    //   videoId: this.props.id,videos:[video1,video2,
    //     video3,video4,video5]
    // }
    let text = ''
    let texts = [`A complete solution for the next generation of plant design and automation,
     CADWorx® Plant Professional includes the most 
     complete DWG file-based range of tools for effective plant design and 
     offers unparalleled flexibility and collaboration.CADWorx Plant Professional
      runs on AutoCAD® or BricsCAD® platform and includes BricsCAD® Pro, 
      providing a complete package with powerful and adaptive tools that 
      enable quick and easy creation of fully intelligent 3D plant models.`,
    `CADWorx® Structure is an integrated CAD modelling structural design software that provides easy-to-use tools,
     intelligent drawing capabilities and advanced levels of automation, all created with the structural
      designer and engineer in mind. The software is quick, easy to set up and simple to use,
     empowering designers and engineers to work efficiently together on large and small projects alike.`,
     `From design to production, navigate the unique challenges of marine engineering: physical space constraints,
      extreme weather conditions, deep water and remote locations. Once your offshore facility is turned over to operations,
       maintain the safest environment with immediate access to accurate, reliable data for improved up-time.`,
      `Our solutions support the oil and gas industry across upstream (E&P), midstream (transportation), downstream (refining) and
       liquefied natural gas (LNG) assets for safer, more-profitable engineering and operations. With our digital transformation capabilities across the asset lifecycle, 
      we can connect your workers and work processes during any stage of the design, construction and operation of your oil and gas assets.`,
      `Following stringent government guidelines, cutting production costs and staying ahead of the competition are mandates for pharmaceutical manufacturers.
       Gain and maintain control over your facility's critical information as you bring new products to market, eliminate unplanned 
       shutdowns and ensure product integrity.`,`Quantification is the first step in the construction cost estimation process. Using quantification, you can generate quantity take-offs (QTOs) that are important in estimating the overall cost needed to construct the project. 
       With Quantification you can:
       •	Create BoQ structures to break down the project into hierarchies based on specific sections or categories.
       •	Create BoQ manually
       •	Create BoQ using recipes
       •	Create BoQ recipes using the model element properties. For example, you can create a recipe to pull the number of footings from the 3D model using the footing's IFC component type or classification code.
       •	Assign the recipes to BoQ structure.
       •	Generate QTO from BoQ.
       
       `];

       /* */

    //   console.log("type");
    //   //console.log(typeof(obj.videoId));
    //   var res = obj.videoId
    //   var last = res.split("-")
    //   var final = parseInt(last[1])
    //   console.log(final);
    //   //this.fetchVideo(final)
    // let video = obj.videos[final-1] // assigning video from array
    
    
    text = texts[final-1]

    
    
    // console.log(`videoId is: ${JSON.stringify(obj.videoId)}`)
    
    return(
      <><br/>
      {/* <p>vieo path {'../writeTo/'+name}</p> */}
      <Card style={{ width: '48rem',position:'relative',left:'50px'}}>
        <CardMedia class="vidplayer"
            className="media"
            component="video"
            height="430"
            src={'http://localhost:5001/video/'+name}
            //src={video1}
            title="Contemplative Reptile" 
            controls
            autoPlay
        />
        {/* <video src={'../writeTo'+this.state.video.filename}/> */}
        <CardContent>
        <Typography gutterBottom variant="h5" component="h5">
          Video Description
        </Typography>
        <Typography variant="body2" color="textPrimary" component="p">
          {text} here it is!
        </Typography>
      </CardContent>
         <CardActions disableSpacing>
         <IconButton aria-label="add to favorites">
           <FavoriteIcon />
         </IconButton> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <Dialog/>
       </CardActions>
      </Card>  

    </>
    )
   
  }
}
export default Vidplayer;



