import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  veiculos: any[] = [];
  veiculoSelecionado: any = null;

  cards = [
    {titulo: 'Total de vendas', valor:0 },
    {titulo: 'Conectados', valor:0},
    {titulo: 'Update Softawre', valor:0},
  ];

  dados: any= {};

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.carregarVeiculos();
  }

  carregarVeiculos() {
    this.http.get<any>('http://localhost:3001/vehicles')
      .subscribe({
        next: res => {
          this.veiculos = res.vehicles;
          if (this.veiculos.length > 0) {
            this.veiculoSelecionado = this.veiculos[0];
            this.atualizarDashboard();
          }
        },
        error: err => {
          console.error('Erro ao carregar veículos:', err);
        }
      });
  }

  atualizarDashboard() {
    const v = this.veiculoSelecionado;

    this.cards = [
      { titulo: 'Total de Vendas', valor: v.volumetotal },
      { titulo: 'Conectados', valor: v.connected },
      { titulo: 'Update Software', valor: v.softwareUpdates }
    ];

    this.http.post<any>('http://localhost:3001/vehicleData', { vin: this.getVinPorVeiculo(v.vehicle) })
      .subscribe({
        next: res => this.dados = res,
        error: err => console.error('Erro ao buscar dados do veículo:', err)
      });
  }

  
  getVinPorVeiculo(veiculo: string): string {
    // Simulação de um map VIN por veículo. Ideal: vir do backend.
    const mapa = {
      'Ranger': '2FRHDUYS2Y63NHD22454',
      'Mustang': '2FRHDUYS2Y63NHD22455',
      'Territory': '2FRHDUYS2Y63NHD22654',
      'Bronco Sport': '2FRHDUYS2Y63NHD22854'
    } as const;
    return mapa[veiculo as keyof typeof mapa] || '';  }

  logout() {
    localStorage.removeItem('usuario'); // Remove dados de login
    this.router.navigate(['/']);        // Redireciona para login
  }
  

  
}
