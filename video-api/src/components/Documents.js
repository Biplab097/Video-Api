import React from 'react';


import image from './image/power.jpg';
import image1 from './image/oilgas.jpg'
import image2 from './image/shipmemt.jpg';
import image3 from './image/chemical.jpg';
import image4 from './image/pharma1.jpg';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Pdfslide from './slideDemo'

import pdf1 from './pdfs/hexgon1.pdf'
import pdf2 from './pdfs/hexagon2.pdf'
import pdf3 from './pdfs/hexagon3.pdf'
import pdf4 from './pdfs/hexagon4.pdf'
import pdf5 from './pdfs/hexagon5.pdf'

import "./style/pdf.css"

class PdfDoc extends React.Component{

  onPdfClick = this.onPdfClick.bind(this);
  state = {
    pdfId: '',
  }
  
  async onPdfClick(caption){
    console.log("state after pdf clicked")
    console.log(caption);
    await this.setState({pdfId:caption});
  }

  render(){
    let img = image1;
    let doc = pdf1;
    console.log(`here pdf id ${this.props.pdfId}`)
    let obj ={
      pdfId: this.props.pdfId,images:[image,image1,image2,image3,image4],pdfs:[pdf1,pdf2,pdf3,pdf4,pdf5]
    }
    // let text = `Hexagon PPM - Software Design Solutions for Owner ...hexagonppm.com At Hexagon PPM, we thrive on confronting the world's biggest changes
    // with software design solutions for owner`
    img = obj.images[obj.id-1]
    var res = this.state.pdfId
    console.log("res in pdf doc "+res);
    var last = res.split("-")
    var final = parseInt(last[1])
    doc = obj.pdfs[final-1]
  
  
    return (
    <Card style={{ width: '38rem',height:'45rem',position:'relative',left:'50px'}} >
    <CardActionArea>
      {/* <CardMedia
      
        component="img"
        alt="Contemplative Reptile"
        height="160"
        image={img}
        title="Contemplative Reptile"
      /> */}
      <CardContent style={{ height: '30rem'}} className="scrollable">
        <Typography gutterBottom variant="h5" component="h2">
          Document Display Board
        </Typography>
        <Typography variant="body2" color="textPrimary" component="p">
          <embed src={doc} type="application/pdf" height="550px" width="570"></embed>
        </Typography>
      </CardContent>
    </CardActionArea>
    <br/>
    <b className="padLeft">Select document to display</b><br/><br/>
    <Pdfslide data={{pdfId:this.state.pdfId,
      onPdfClick:this.onPdfClick.bind(this)}}/>
    <CardActions>
      <Button size="small" color="primary">
        Share
      </Button>
      <Button size="small" color="primary">
        Learn More
      </Button>
    </CardActions>
  </Card>
  )
 }
}

export default PdfDoc;