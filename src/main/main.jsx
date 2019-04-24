import React, {Component} from 'react'

import socket from '../server/server-client'
import FirebaseService from '../services/firebaseService'
import TinyEditor from '../components/tiny-editor'
import { objectToArray } from '../utils/document'

import ChatWidget from '../components/chat';

import Histories from '../components/histories/histories'
import HistoryModal from '../components/histories/modal'

import Users from '../components/users'

class UploadFile extends Component{
    
    constructor(props){
        super(props)
        this.tyeditor = React.createRef();
        this.state = {
            docId: "doc1",
            user: Math.round((Math.random() * 100) + 1)+" - User",
            documents: [],
            users:[],
            color: '',
            isUpdateUser:null
        }
        this.getDocument();

        this.newUserConnect = this.newUserConnect.bind(this)
        this.addOldUsers = this.addOldUsers.bind(this)
        this.removeUser = this.removeUser.bind(this)
        this.getDocument = this.getDocument.bind(this)

        socket.emit('user connect', {
            user: this.state.user,
            docId: this.state.docId,
            color: this.state.color
        });

        socket.on('new user', this.newUserConnect)
        socket.on('users on room', this.addOldUsers)
        socket.on('user disconnected', this.removeUser)
    }

    getDocument = async () => {
        var documents = await FirebaseService.getDocument( this.state.docId )
        documents = objectToArray( documents )
        this.setState({
            documents: documents
        })
    }
    
    removeUser(user){
        var localUsers = this.state.users
        var newUsers = localUsers.filter( (localUser) => localUser.name !== user.name )
        this.setState({
          users: newUsers
        })
      }
    
    addOldUsers(users){
        if(this.state.isUpdateUser === null){
            var localUsers = this.state.users
            users.forEach(user => {
                localUsers.push(user)
            })
            this.setState({
                users: localUsers,
                isUpdateUser:1
            })
        }
    }

    newUserConnect(user){
        var users = this.state.users
        var toUser = user.clientId
        socket.emit('others users on room', {
            users,
            toUser,
        })

        users.push(user)

        this.setState({
            users: users,
            color: user.color
        })

        this.tyeditor.current.sendContentToNewUser();
    }

    render(){
        if (!this.state.user){
            return null
        }
        return(
            <div id='divMain' className="container-fluid mt-2 justify-content-center row">
                <div className="col-md-8">
                    <Users users={ this.state.users }/>
                    <TinyEditor 
                        ref = { this.tyeditor }
                        docId = { this.state.docId }
                        user = { this.state.user }
                        users = { this.state.users }
                    />
                    <ChatWidget 
                        id = {this.state.docId}
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