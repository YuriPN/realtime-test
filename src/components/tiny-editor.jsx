import React, {Component} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {Templates} from '../components/templates';

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
                    value={ this.props.content }
                    autosave_interval = "20s"
                    init={{
                        external_plugins: {"wave": "https://cdn2.codox.io/waveTinymce/plugin.min.js"},
                        wave: {
                            "docId": "doc2", // unique document id,
                            "username": "Yuri", // unique username or email address
                            "apiKey": "ee85b096-0af6-46b3-b3f5-4886d2e8a081" // this is your actual API Key
                        },
                        plugins: [
                            'code template autoresize print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern visualblocks autosave'
                        ],
                        contextmenu: "link image imagetools table spellchecker",
                        toolbar: 'code spellchecker formatselect | bold italic forecolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | code | template | image | restoredraft',
                        templates: Templates
                    }}
                onChange={this.handleEditorChange}
            />
        );
    }
}

export default TinyEditor;