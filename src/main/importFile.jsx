import React, {Component} from 'react'
import mammoth from 'mammoth'

import FirebaseService from '../services/firebaseService'
import TinyEditor from '../components/tiny-editor'

class UploadFile extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            file: "",
            content: "",
            docId: "doc1",
            userName: 'User-' + Math.round((Math.random() * 100) + 1),
            saveLoading: false,
            saveMessage: '',
            saveSuccess: undefined
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
    }

    convertToHtml = (e) => {
        mammoth.convertToHtml({arrayBuffer: e.target.result}, this.optionsToMammoth)
                .then( (result) =>{
                    this.setState({
                        file: result.value
                    })
                })
    }

    getDocument = async () => {
        var document = await FirebaseService.getDocument( this.state.docId )
        var content = document.content
        this.setState({
            file: content
        })
    }
    
    handleFile = (e) =>{
        var file = e.target.files[0]
        var reader = new FileReader()

        reader.onload = this.convertToHtml
        
        reader.readAsArrayBuffer(file)
    }

    handleEditorChange(content){
        this.setState({ content: content })
    }

    saveContent(){
        this.setState({ saveLoading: true })

        let isSaved = FirebaseService.updateDocument( this.state.docId, this.state.content )
        if (isSaved){
            console.log('sucesso')
        }
        this.setState({ saveLoading: false })
    }

    render(){
        
        return(
            <div id='divMain' className="container-fluid mt-2 justify-content-center row">
                <div className="col-md-12 text-right m-2">
                    <button type="button" className="btn btn-outline-success" onClick={ this.saveContent }>Salvar</button>
                </div>
                <div className="col-md-4">
                    <div className="input-group mb-3">
                        <div className="custom-file">
                            <label className="custom-file-label" htmlFor="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>
                            <input type="file" id="FileUpload" className="custom-file-input" onChange={ this.handleFile }/>
                        </div>
                    </div>
                </div>
                <div className="col-md-10">
                    <TinyEditor 
                        content={ this.state.file } 
                        handleEditorChange= { this.handleEditorChange }
                        username={'user'+ Math.round((Math.random() * 100) + 1)}
                    />
                </div>
            </div>
        )
    }
    
}

export default UploadFile