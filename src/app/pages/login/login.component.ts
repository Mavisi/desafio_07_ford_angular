import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  nome = '';
  senha  = '';
  erroLogin = '';


  constructor(private http: HttpClient, private router: Router) {}


  manterConectado = false;
  

  login() {
    const body = {
      nome: this.nome,
      senha: this.senha
    };

    this.http.post<any>('http://localhost:3001/login',body).subscribe({
      next: (res)=>{
        alert('Login realizado com sucesso! Bem-vindo, ' + res.nome);
        this.erroLogin = '';
        this.router.navigate(['/home']);
      },
      error:(err) =>{
        if (err.status === 400 || err.status === 401) {
          this.erroLogin = err.error.message;
        } else {
          this.erroLogin = 'Erro ao conectar com o servidor.';
        }
        alert(this.erroLogin); // mostrar mensagem real do erro
      }

    });   
  }
}