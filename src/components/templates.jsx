import React, {Component} from 'react';
import FirebaseService from '../services/firebaseService';

class Template extends Component{
    constructor(props){
        super(props)

        this.state ={
            titulo: '',
            descricao:'',
            conteudo: ''
        }

        this.saveModel = this.saveModel.bind(this)
        this.onChangeDescricao = this.onChangeDescricao.bind(this)
        this.onChangeTitulo = this.onChangeTitulo.bind(this)
    }

    saveModel(){
       let saved = FirebaseService.insertTemplate( this.state.titulo, this.state.descricao, this.state.conteudo )
       
    }
    onChangeTitulo = (e) => {
        this.setState({
            titulo:e.target.value
        })
    }
    onChangeDescricao = (e) => {
        this.setState({
            descricao:e.target.value
        })
    }

    componentWillReceiveProps(props){
        this.setState({
            conteudo: props.conteudo
        })
    }

    render(){
        
        return(
            <div>
                <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Salvar Modelo</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label className="col-form-label">Título:</label>
                                <input type="text" className="form-control" id="titulo" onChange={ this.onChangeTitulo } required></input>
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">Descrição:</label>
                                <input className="form-control" id="descricao" onChange={ this.onChangeDescricao } required></input>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        <button type="submit" className="btn btn-primary" onClick={ this.saveModel } data-dismiss="modal">Salvar</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Template;