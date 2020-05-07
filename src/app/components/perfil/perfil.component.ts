import { Component, OnInit } from '@angular/core';
import * as io from "socket.io-client";
import { GLOBAL } from "../../services/GLOBAL";
import { UserService } from "../../services/user.service";
import { Router } from '@angular/router';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public socket = io('http://localhost:4201')
  public identity
  public url
  public de
  public datos_user : any = {}
  public data : any = {}
  public password
  public confirm_password
  public msm_error
  public usuarios
  public data_send : any = {}
  public msm_success 

  public file : File
  public imgselected : String | ArrayBuffer

  constructor(
    private _userService : UserService,
    private router : Router
  ) { 

    this.url = GLOBAL.url

    this.identity = this._userService.getIdentity()
    this.de = this.identity._id

  }

  ngOnInit(): void {
    if (this.identity)
    {
      this._userService.get_user(this.de).subscribe (
        response => {
          this.datos_user = response.user
          
          this.data = {
            nombre: this.datos_user.nombre,
            email: this.datos_user.email,
            telefono: this.datos_user.telefono,
            bio: this.datos_user.bio,
            facebook: this.datos_user.facebook,
            estado: this.datos_user.estado
          }
        },
        error =>{

        }
      )
    }else{
      this.router.navigate([''])
    }
  }

  OnSubmit(configForm){
    if (configForm.valid)
    {
      if(configForm.value.password!=undefined){
        if(configForm.value.password!=configForm.value.confirm_password){
          this.msm_error="Las contraseñas no coinciden"
        }else{
          //cuando las contraseñas sean identicas
          this.msm_error=''
          this.data_send = {
            _id: this.datos_user._id,
            nombre : configForm.value.nombre,
            telefono: configForm.value.telefono,
            imagen: this.file,
            password: configForm.value.password,
            email: configForm.value.email,
            bio: configForm.value.bio,
            facebook: configForm.value.facebook,
            estado: configForm.value.estado
          }


          this.socket.emit('save-user',{identity: this.data_send})

          this._userService.update_config(this.data_send).subscribe(
            response => {
              this.msm_success = 'Se actualizo tu perfil con exito'

              this._userService.get_users().subscribe(
                response => {
                  this.usuarios = response.users
                  this.socket.emit('save-users',this.usuarios)
                },
                error => {

                }
              )

             
            },
            error => {

            }
          )

        }
      }else{
          //cuando las contraseñas sean identicas
          this.msm_error=''
          this.data_send = {
            _id: this.datos_user._id,
            nombre : configForm.value.nombre,
            telefono: configForm.value.telefono,
            imagen: this.file,
            email: configForm.value.email,
            bio: configForm.value.bio,
            facebook: configForm.value.facebook,
            estado: configForm.value.estado
          }


          this.socket.emit('save-user',{identity: this.data_send})

          this._userService.update_config(this.data_send).subscribe(
            response => {
              this.msm_success = 'Se actualizo tu perfil con exito'

              this._userService.get_users().subscribe(
                response => {
                  this.usuarios = response.users
                  this.socket.emit('save-users',this.usuarios)
                },
                error => {

                }
              )

             
            },
            error => {

            }
          )
      }

      this.msm_success = ''
    }
  }

  imgSelect(event:HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0]
      const reader = new FileReader()
      reader.onload = e => this.imgselected = reader.result
      reader.readAsDataURL(this.file)
    }
  }
}

