import React, {Component} from 'react';
import {Editor} from '@tinymce/tinymce-react';

class TinyEditor extends Component{
    constructor(props){
        super(props)
        this.state = {
            content:''
        }
        this.handleEditorChange = this.handleEditorChange.bind(this)
    }
    
    handleEditorChange(content){
        this.setState({ content })
    }

    render(){
        return(
            <Editor 
                    selector= 'textarea'
                    value={ this.props.content }
                    apiKey = '11mawuf4s296afp379jcddiaf0t6bb1buhxyipc2xwzfgeb5'
                    init={{
                        external_plugins: {"wave": "https://cdn2.codox.io/waveTinymce/plugin.min.js"},
                        wave: {
                            "docId": "doc2", // unique document id,
                            "username": "Yuri", // unique username or email address
                            "apiKey": "ee85b096-0af6-46b3-b3f5-4886d2e8a081" // this is your actual API Key
                        },
                        plugins: [
                            'autoresize print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern visualblocks'
                        ],
                        contextmenu: "link image imagetools table spellchecker",
                        toolbar: 'spellchecker formatselect | bold italic forecolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | code | visualblocks | addcomment',
                    }}
                onChange={this.handleEditorChange}
            />
        );
    }
}

export default TinyEditor;