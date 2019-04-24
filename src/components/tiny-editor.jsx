import React, {Component} from 'react';
import {Editor} from '@tinymce/tinymce-react';

import diff from '../utils/htmldiff'

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
            bookmark:''
        }
        this.optionsToMammoth = {
            styleMap: [
                "p[style-name='Section Title'] => h1:fresh",
                "p[style-name='Subsection Title'] => h2:fresh"
            ]
        }
        this.getTemplates();

        this.sendContentToNewUser = this.sendContentToNewUser.bind(this)
        this.getTemplates = this.getTemplates.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.updateDocument = this.updateDocument.bind(this);
        this.handleFile = this.handleFile.bind(this)
        this.convertToHtml = this.convertToHtml.bind(this);
        this.saveContent = this.saveContent.bind(this)
        this.emitChange = this.emitChange.bind(this)
        this.setContent = this.setContent.bind(this)
        this.beforeContent = this.beforeContent.bind(this)

        socket.on('update document', this.updateDocument);
    }

    getTemplates = async () => {
        var documents = await FirebaseService.getTemplates() 

        var parsed = objectToArray(documents)
        console.log(parsed)
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
    
    handleEditorChange(text){
        this.setState({
            content:text
        })
    }

    //emissor
    sendContentToNewUser(){
        if(this.state.content !== '')
            socket.emit('document change', this.state.content);
    }

    emitChange(){
        var content = this.editor.current.editor.getContent()
        var bookm = this.editor.current.editor.selection.getBookmark(2, true)
        this.setState({
            bookmark:bookm
        })
        socket.emit('document change', content)
    }

    //Receptor
    updateDocument(innerhtml){
        var diffContent = diff(this.state.content, innerhtml) 
        var mergedHtml = diffContent.replace(/<(DEL|del)[^>]*>[^<]*(<\/DEL>|<\/del>)|<(del|ins)>|<(\/del|\/ins)>/ig, '');

        if(this.state.content === ''){
            this.setState({
                content:innerhtml
            })
        }
        else{
            this.setState({
                content: mergedHtml
            })
        }
    }

    setContent(){
        this.editor.current.editor.selection.moveToBookmark(this.state.bookmark)
    }
    
    beforeContent(event){
        var currentContent = this.editor.current.editor.getContent()
        this.setState({
            content : currentContent
        })
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
                            language_url: 'https://yuripn.github.io/realtime-test/languages/pt_BR.js',
                            language:'pt_BR',
                            plugins: [
                                'textcolor code template autoresize print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern visualblocks autosave'
                            ],
                            contextmenu: "link image imagetools table spellchecker",
                            toolbar: 'fontselect | bold italic fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | template | code | restoredraft | link',
                            link_context_toolbar: true,
                            templates: this.state.templates,
                            min_height: 400, 
                            images_upload_handler: function (blobInfo, success, failure) {
                                setTimeout(function () {
                                    FirebaseService.uploadImage(blobInfo.filename(), blobInfo.blob())
                                    success('https://firebasestorage.googleapis.com/v0/b/az-editor-online.appspot.com/o/images%2F'+blobInfo.filename()+'?alt=media')
                                }, 2000);   
                            },
                            autosave_interval: "15s"
                        }}
                        onSetContent = { this.setContent }
                        onKeyUp = { this.emitChange }
                        onEditorChange = { this.handleEditorChange }
                        onBeforeSetContent = { this.beforeContent }
                    />
                    <Template conteudo={this.state.content}/>
                </div>
            )
        }
        else return null
    }
}

export default TinyEditor
