import React, {Component} from 'react';
import TinyEditor from '../components/tiny-editor';
var mammoth = require('mammoth');


class UploadFile extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            file: "Insira seu texto aqui",
            userName: 'User1'
        }

        this.optionsToMammoth = {
            styleMap: [
                "p[style-name='Section Title'] => h1:fresh",
                "p[style-name='Subsection Title'] => h2:fresh"
            ]
        }

        this.handleFile = this.handleFile.bind(this)
        this.getHtml = this.getHtml.bind(this)
    }

    getHtml = (e) => {
        mammoth.convertToHtml({arrayBuffer: e.target.result}, this.optionsToMammoth)
                .then( (result) =>{
                    this.setState({
                        file:result.value
                    });
                }) 
    }
    
    handleFile = (e) =>{
        var file = e.target.files[0];
        var reader = new FileReader();

        reader.onload = this.getHtml
        
        reader.readAsArrayBuffer(file);
    }
    handleUser = (username) =>{
        this.setState({
            userName: username
        });
    }
    render(){
        
        return(
            <div id='divMain'>
                <input type='file' id = "FileUpload" onChange={ this.handleFile }></input>
                <TinyEditor content={this.state.file} username={this.state.userName}/>
            </div>
            
        );
    }
    
}

export default UploadFile;