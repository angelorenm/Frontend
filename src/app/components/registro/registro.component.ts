import { Component, OnInit } from '@angular/core';
import { User } from "../../models/User";   
import { UserService } from '../../services/user.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public user;

  constructor(
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.user = new User('','','','','','','','','',false ); 
  }

  onSubmit(registroForm){
    this._userService.registrar({
      nombre: registroForm.value.nombre,
      email: registroForm.value.email,
      password: registroForm.value.password
      }).subscribe(
        response => {
          this._router.navigate(['']);
        },
        error => {
          
        }
        
      ); 

  }
}
