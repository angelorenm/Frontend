import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User'
import { UserService } from '../../services/user.service'
import { Router } from '@angular/router'
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public user
  public token
  public identity
  public data_user

  constructor( 
  private _userService: UserService,
  private _router: Router
  )
  { 
    this.data_user = this._userService.getIdentity()
  }

  ngOnInit(): void {
    this.user = new User('','','','','','','','','',false)
    if(this.data_user){
      console.log(this.data_user)
      this._router.navigate(['messenger'])
    }
  }

  onSubmit(loginForm)
  {
    if(loginForm.valid)
    {
      this._userService.login(this.user).subscribe(
        response => {
          this.token = response.jwt
          this.identity = JSON.stringify(response.user)
          localStorage.setItem('token', this.token)
          this._userService.login(this.user,true).subscribe(
            response => {
              localStorage.setItem('identity', this.identity)
              this._router.navigate(['messenger'])
            },
            error => {

            }
            
          )
        },
        error => {

        }
      )
    }
    else
    {
      console.log("No se pudo Enviar")
    }
  }

}
