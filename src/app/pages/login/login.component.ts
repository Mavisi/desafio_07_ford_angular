import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [
    FormsModule,    
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario: string = '';
  senha: string = '';
loginForm: any;

  constructor(private http: HttpClient) {}

  login() {
    const body = {
      usuario: this.usuario,
      senha: this.senha
    };

    this.http.post('http://localhost:3000/login', body)
      .subscribe(
        res => console.log('Login bem-sucedido', res),
        err => console.error('Erro no login', err)
      );
  }
}