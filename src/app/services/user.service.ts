import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { User } from "../models/User";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url;
  
  constructor(
    private _http : HttpClient


  ) { 
    this.url = GLOBAL.url;
  }

  registrar(user):Observable<any>{
    var obj = {
       nombre: user.nombre,
       email: user.email,
       password: user.password, 
    }

    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'registrar',obj,{headers:headers});

  }

}
