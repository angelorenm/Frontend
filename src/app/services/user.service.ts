import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { observable, from, Observable } from 'rxjs'
import { GLOBAL } from './GLOBAL'
import { User } from '../models/User'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url
  public token
  public identity

  constructor(
    private _http: HttpClient
  ) { 
    this.url = GLOBAL.url
   }

   registrar (user):Observable<any>{
    var obj = {
      nombre : user.nombre,
      email : user.email,
      password : user.password
    }

    let headers = new HttpHeaders().set('Content-Type','application/json')
    let x = this._http.post(this.url+'registrar',obj,{headers: headers})
    return x
   }

   login(user, gettoken = null):Observable<any> {
     let json = user
     if (gettoken!=null){
        user.gettoken = true
     }

     let headers = new HttpHeaders().set('content-type','application/json')
     return this._http.post(this.url+'login',json,{headers: headers})

   }

   get_users():Observable<any>{
      let headers = new HttpHeaders().set('content-type','application/json')
     return this._http.get(this.url+'usuarios',{headers: headers})
   }

   get_user(id):Observable<any>{
    let headers = new HttpHeaders().set('content-type','application/json')
    return this._http.get(this.url+'usuario/'+id,{headers: headers})
   }

   get_messages(de,para):Observable<any>{
    let headers = new HttpHeaders().set('content-type','application/json')
    return this._http.get(this.url+'mensajes/'+de+'/'+para,{headers: headers})
   }

   get_send_msm(msm):Observable<any>{
    let headers = new HttpHeaders().set('content-type','application/json')
    return this._http.post(this.url+'mensaje/enviar/',msm,{headers: headers})
   }

   getToken () {
      let token = localStorage.getItem('token')
      if (token){
        this.token = token
      }else
      {
        this.token = null
      }
      return token
   }

   getIdentity():Observable<any>{
    let identity = JSON.parse( localStorage.getItem('identity'))
    if (identity){
      this.identity = identity
    }else
    {
      this.identity = null
    }
    return identity
   }
   
   update_config (data):Observable<any>{
    console.log(data);
    
    const fd = new FormData();
    fd.append('nombre',data.nombre)
    fd.append('telefono',data.telefono)
    fd.append('imagen',data.imagen)
    if(data.password){
      fd.append('password',data.password)
    }
    fd.append('bio',data.bio)
    fd.append('facebook',data.facebook)
    fd.append('estado',data.estado)
    
    return this._http.put(this.url+'usuario/editar/'+data._id,fd)
   }

}
