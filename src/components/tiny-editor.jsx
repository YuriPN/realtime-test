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
        if(this.state.templates.length !== 0){
            return(
                <Editor 
                    value={ this.props.content }
                    init={{
                        language_url: 'https://olli-suutari.github.io/tinyMCE-4-translations/pt_BR.js',
                        language:'pt_BR',
                        apiKey:"11mawuf4s296afp379jcddiaf0t6bb1buhxyipc2xwzfgeb5",
                        external_plugins: {"wave": "https://cdn2.codox.io/waveTinymce/plugin.min.js"},
                        wave: {
                            "docId": "doc2", // unique document id,
                            "username": this.props.username, // unique username or email address
                            "apiKey": "5bdc0f9f-39eb-4ff1-87f4-87c83f2ca723" // this is your actual API Key
                        },
                        plugins: [
                            'textcolor code template autoresize print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern visualblocks autosave'
                        ],
                        contextmenu: "link image imagetools table spellchecker",
                        toolbar: 'fontselect | bold italic fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | template | code | restoredraft',
                        templates: this.state.templates
                    }}
                    onEditorChange={ this.props.handleEditorChange }
                />
            )
        }
        else return null
    }
}

export default TinyEditor