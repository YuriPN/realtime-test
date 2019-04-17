import React, {Component} from 'react';
import {Editor} from '@tinymce/tinymce-react';

import diff from './histories/htmldiff'

import FirebaseService from '../services/firebaseService';

import {objectToArray } from '../utils/document';

import Template from '../components/templates';

import mammoth from 'mammoth';

import socket from '../server/server-client'

class TinyEditor extends Component{
    constructor(props){
        super(props)
        this.editor = React.createRef();
        this.state ={
            content:'',
            templates: [],
            saveLoading: false,
            bm:''
        }
        this.optionsToMammoth = {
            styleMap: [
                "p[style-name='Section Title'] => h1:fresh",
                "p[style-name='Subsection Title'] => h2:fresh"
            ]
        }
        this.getTemplates();

        this.sendContent = this.sendContent.bind(this)
        this.getTemplates = this.getTemplates.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.updateDocument = this.updateDocument.bind(this);
        this.handleFile = this.handleFile.bind(this)
        this.convertToHtml = this.convertToHtml.bind(this);
        this.saveContent = this.saveContent.bind(this)
        this.emitChange = this.emitChange.bind(this)
        this.setContent = this.setContent.bind(this)

        socket.on('update document', this.updateDocument);
    }

    getTemplates = async () => {
        var documents = await FirebaseService.getTemplates() 

        var parsed = objectToArray(documents)

        this.setState({
            templates: parsed
        })
    }

    handleFile = (e) =>{
        var file = e.target.files[0]
        var reader = new FileReader()

        reader.onload = this.convertToHtml
        
        reader.readAsArrayBuffer(file)
    }

    sendContent(){
        if(this.state.content !== '')
            socket.emit('document change', this.state.content);
    }

    convertToHtml = (e) => {
        mammoth.convertToHtml({arrayBuffer: e.target.result}, this.optionsToMammoth)
            .then( (result) =>{
                this.setState({
                    content: result.value
                })
            })
    }

    saveContent () {
        FirebaseService.updateDocument( this.props.docId, this.state.content, this.props.user )
    }

    updateDocument(innerhtml){
        var diffText  = diff(this.state.content, innerhtml) 
        var mergedHtml = diffText.replace(/<(DEL|del)[^>]*>[^<]*(<\/DEL>|<\/del>)|<(del|ins)>|<(\/del|\/ins)>/ig, '');
        if(this.state.content === ''){
            this.setState({
                content:innerhtml
            })
        }
        this.setState({
            content: mergedHtml
        })
    }
    
    handleEditorChange(text){
        this.setState({
            content:text
        })
    }

    emitChange(){
        var content = this.editor.current.editor.getContent()
        var bookm = this.editor.current.editor.selection.getBookmark(2, true)
        this.setState({
            bm:bookm
        })
        socket.emit('document change', content)
    }

    setContent(){
        this.editor.current.editor.selection.moveToBookmark(this.state.bm)
    }

    render(){
        if(this.state.templates.length !== 0){
            return(
                <div id='diveditor' className="container-fluid mt-2 justify-content-center row">
                    <div className="col-md-12 text-right m-2">
                        <button type="button" className="btn btn-outline-success" data-toggle="modal" data-target="#exampleModal">Salvar Modelo</button>
                        <button type="button" className="btn btn-outline-success" onClick={ this.saveContent }>Salvar</button>
                </div>
                    <div className="col-md-6">
                        <div className="input-group mb-3">
                            <div className="custom-file">
                                <label className="custom-file-label" htmlFor="inputGroupFile02">Choose file</label>
                                <input type="file" id="FileUpload" className="custom-file-input" onChange={ this.handleFile }/>
                            </div>
                        </div>
                    </div>
                    <Editor ref = {this.editor}
                        value={ this.state.content }
                        init={{
                            language_url: '/languages/pt_BR.js',
                            language:'pt_BR',
                            apiKey:"11mawuf4s296afp379jcddiaf0t6bb1buhxyipc2xwzfgeb5",
                            plugins: [
                                'textcolor code template autoresize print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern visualblocks autosave'
                            ],
                            contextmenu: "link image imagetools table spellchecker",
                            toolbar: 'fontselect | bold italic fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | template | code | restoredraft',
                            templates: this.state.templates,
                            min_height: 400, 
                            images_upload_handler: function (blobInfo, success, failure) {
                                success(blobInfo.blob());
                            }
                        }}
                        onSetContent = { this.setContent }
                        onKeyUp = { this.emitChange }
                        onEditorChange = { this.handleEditorChange }
                    />
                    <Template conteudo={this.state.content}/>
                </div>
            )
        }
        else return null
    }
}

export default TinyEditor
