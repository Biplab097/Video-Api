import React, { Component } from 'react'
import axios,{post} from 'axios';
// import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import "./style/upload.css";
class Upload extends Component{

    onChange(e){
        //console.log(e);
        let files = e.target.files;
        let values = e.target.values;
        console.log("values "+values);
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        console.log(e.target.files[0]);
        var name = e.target.files[0].name
        console.log((name));
        const formData = new FormData()
        formData.append('video',files[0])
        const config = {
            headers:{
                'content-type':'multipart/form-data'
            }
        }
        axios.post("http://localhost:5001/videos/upload/"+name,formData,config).then((res)=>{
            alert("video uploaded Sucessfully");
        }).catch((err)=>{
            console.log(err);
        })
        // reader.onload = (e) => {
        //     //console.warn("video data",e.target.result);
        //     const formData = {file:e.target.result}
        //     console.log("form Data",formData);
        //     const url = "http://localhost:5001/video/"+name;
        //     //const formData = {file:e.target.result}
        //     //console.log("form Data",formData);
        //     // return post(url,formData)
        //     // .then(respone => console.warn("result ",respone))
        // }
    }

    render(){
        return(
            <>
            <hr/><hr/>
            <div class="main" onSubmit={this.onFormSubmit}>
                <h1>Uploading the Video File</h1>
                <form method="post" action="#" id="#">
                   
                      
                      
                      
                    <div class="form-group files">
                         <label>Upload Your File </label>
                        <input type="file" class="form-control"  onChange={(e)=>this.onChange(e)} multiple=""/>
                    </div>
                      
                </form>
                {/* <input type="file" name="file" onChange={(e)=>this.onChange(e)}/> */}
                <button onClick={(e)=>this.onSubmit(e)}>Submit</button>

            </div>
            </>
        
        )
    }
}
export default Upload;
// const Upload = () =>{
//     return <h1>Hello, I am Upload Page</h1>
// };

// export default Upload;