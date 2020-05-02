import { Component, OnInit } from '@angular/core';
import { User } from "../../models/User";   
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public user;

  constructor() { }

  ngOnInit() {
    this.user = new User('','','','','','','','','',false ); 
  }

  onSubmit(registroForm){
    console.log(registroForm.value);

  }
}
