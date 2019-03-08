import React, {Component} from 'react';
import TinyEditor from '../components/tiny-editor';
var mammoth = require('mammoth');


class UploadFile extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            file: "Insira seu texto aqui"
        }

        this.optionsToMammoth = {
            styleMap: [
                "p[style-name='Section Title'] => h1:fresh",
                "p[style-name='Subsection Title'] => h2:fresh"
            ]
        }

        this.handleFile = this.handleFile.bind(this)
        this.convertToHtml = this.convertToHtml.bind(this)
    }

    
    
    handleFile = (e) =>{
        var file = e.target.files[0];
        var reader = new FileReader();

        reader.onload = this.convertToHtml
        
        reader.readAsArrayBuffer(file);
    }
    convertToHtml = (e) => {
        mammoth.convertToHtml({arrayBuffer: e.target.result}, this.optionsToMammoth)
                .then( (result) =>{
                    this.setState({
                        file:result.value
                    });
                }) 
    }
    render(){
        
        return(
            <div id='divMain'>
                
                <TinyEditor content={this.state.file} />

                <input type='file' id = "FileUpload" onChange={ this.handleFile }></input>
            </div>
            
        );
    }
    
}

export default UploadFile;