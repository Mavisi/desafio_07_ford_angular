import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario: string = '';
  senha: string = '';

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
