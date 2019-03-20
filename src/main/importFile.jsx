import React, {Component} from 'react'
import mammoth from 'mammoth'

import FirebaseService from '../services/firebaseService'
import TinyEditor from '../components/tiny-editor'
import { getElementOnArrayInReverse, objectToArray } from '../utils/document'

import Histories from '../components/histories/histories'
import HistoryModal from '../components/histories/modal'

import Template from '../components/templates'

class UploadFile extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            file: "",
            content: "",
            docId: "doc1",
            userName: "User - "+Math.round((Math.random() * 100) + 1),
            saveLoading: false,
            saveMessage: '',
            saveSuccess: undefined,
            documents: []
        }

        this.optionsToMammoth = {
            styleMap: [
                "p[style-name='Section Title'] => h1:fresh",
                "p[style-name='Subsection Title'] => h2:fresh"
            ]
        }

        this.getDocument()

        this.handleFile = this.handleFile.bind(this)
        this.convertToHtml = this.convertToHtml.bind(this)
        this.getDocument = this.getDocument.bind(this)
        this.handleEditorChange = this.handleEditorChange.bind(this)
        this.saveContent = this.saveContent.bind(this)
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this)
    }

    getDocument = async () => {
        var documents = await FirebaseService.getDocument( this.state.docId )
        documents = objectToArray( documents )

        var first = 0
        var content = getElementOnArrayInReverse( documents, first ).content

        this.setState({
            file: content,
            documents: documents
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
                        file: result.value
                    })
                })
    }

    handleEditorChange(content){
        this.setState({ content: content })
    }

    saveContent(){
        this.setState({ saveLoading: true })

        let isSaved = FirebaseService.updateDocument( this.state.docId, this.state.content, this.state.userName )

        this.setState({ 
            saveLoading: false,
            saveSuccess: isSaved
        })

        this.getDocument()
    }

    forceUpdateHandler(){
        this.forceUpdate()
    }

    render(){
        if (!this.state.userName){
            return null
        }
        return(
            <div id='divMain' className="container-fluid mt-2 justify-content-center row">
                <div className="col-md-12 text-right m-2">
                    <button type="button" className="btn btn-outline-success" data-toggle="modal" data-target="#exampleModal">Salvar Modelo</button>
                    <button type="button" className="btn btn-outline-success" onClick={ this.saveContent }>Salvar</button>
                </div>
                <Template conteudo={this.state.content}/>
                <div className="col-md-6">
                    <div className="input-group mb-3">
                        <div className="custom-file">
                            <label className="custom-file-label" htmlFor="inputGroupFile02">Choose file</label>
                            <input type="file" id="FileUpload" className="custom-file-input" onChange={ this.handleFile }/>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <TinyEditor 
                        content={ this.state.file } 
                        handleEditorChange= { this.handleEditorChange }
                        username= { this.state.userName }
                    />
                </div>
                <div className="col-md-3">
                    <Histories documents={ this.state.documents } limit={ 5 }/>
                </div>
                <HistoryModal documents={ this.state.documents } limit={ 5 }/>
            </div>
        )
    }
    
}

export default UploadFile