import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/services/user.service";
import { GLOBAL } from "../../services/GLOBAL";
import { identity } from 'rxjs';
import { Message } from "../../models/Message";
import * as io from "socket.io-client";
import { Router } from '@angular/router';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {
  public usuarios
  public url
  public user_select
  public mensajes
  public identity
  public de
  public data_msm
  public send_message
  public socket = io('http://localhost:4201')

  constructor(
    private _userService: UserService,
    private _router: Router
    ) {
    this.url = GLOBAL.url
    this.identity = this._userService.getIdentity()
    this.de = this.identity._id
    console.log(this.de)
   }

  ngOnInit(): void {
    if (this.identity){
    this.data_msm = new Message('','','','')

    this._userService.get_users().subscribe(
      response => {
        this.usuarios = response.users
      },
      error =>{

      }
    )
    this.socket.on('new-message', function(data){
      var data_all ={
        de: data.message.de,
        para: data.message.para,
        msm: data.message.msm,
        createAt: data.message.createAt
      }
      
      this.mensajes.push(data_all)

    }.bind(this))
    } else {
      this._router.navigate([''])
    }
  }

  listar(id){
    this._userService.get_user(id).subscribe(
      response =>{
        this.user_select = response.user
        this._userService.get_messages(this.de,id).subscribe(
          response=>{
            this.mensajes = response.messages
          },
          error => {
            
          }
        )

      },
      error =>{

      }
    )
  }

  onSubmit(msmForm){
    if(msmForm.valid){
      this.send_message = {
        de: this.de,
        para: this.user_select._id,
        msm: this.data_msm.msm,
      }
      console.log(this.send_message)
      this._userService.get_send_msm(this.send_message).subscribe(
        response => {
          
          this.socket.emit('save-message',response.message)
          this.data_msm.msm = ''
        },
        error => {

        }
      )
    }
    else
    {

    }
  }

}

