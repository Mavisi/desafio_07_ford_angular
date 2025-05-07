import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  veiculos = ['Ranger', 'Mustang', 'Territory', 'Bronco Sport'];
  veiculoSelecionado = 'Mustang';

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('usuario'); // Remove dados de login
    this.router.navigate(['/']);        // Redireciona para login
  }
  

  
}
