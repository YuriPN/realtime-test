import React, {Component} from 'react';
import {Editor} from '@tinymce/tinymce-react';

import FirebaseService from '../services/firebaseService';

import {objectToArray } from '../utils/document'

class TinyEditor extends Component{
    constructor(props){
        super(props)
        this.state ={
            templates: []
        }
        
        this.getTemplates();
        this.getTemplates = this.getTemplates.bind(this);
    }

    getTemplates = async () => {
        var documents = await FirebaseService.getTemplates() 

        var parsed = objectToArray(documents)

        this.setState({
            templates: parsed
        })
    }

    
    render(){
        
        var waveConfig = this.props.username
        if( !this.state.templates.length ){
            return null
        }
            return(
                <Editor 
                    value={ this.props.content }
                    apiKey = '11mawuf4s296afp379jcddiaf0t6bb1buhxyipc2xwzfgeb5'
                    init={{
                        external_plugins: {"wave": "https://cdn2.codox.io/waveTinymce/plugin.min.js"},
                        wave: {
                            "docId": "doc2", // unique document id
                            "username": waveConfig, // unique username or email address
                            "apiKey": "ee85b096-0af6-46b3-b3f5-4886d2e8a081" // this is your actual API Key
                        },
                        plugins: [
                            'code template autoresize print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern visualblocks autosave'
                        ],
                        contextmenu: "link image imagetools table spellchecker",
                        toolbar: 'formatselect | bold italic forecolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | template | image | restoredraft',
                        templates: this.state.templates
                    }}
                    onEditorChange={ this.props.handleEditorChange }
                />
            )
    }
}

export default TinyEditor