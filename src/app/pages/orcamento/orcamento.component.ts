import { IOrcamento } from './../../interface/IOrcamento';
import { Component, Input } from '@angular/core';
import { OrcamentoService } from '../../services/orcamento.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalOrcamentoComponent } from '../../components/modal-orcamento/modal-orcamento.component';

@Component({
  selector: 'app-orcamento',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ModalOrcamentoComponent],
  templateUrl: './orcamento.component.html',
  styleUrl: './orcamento.component.css',
})
export class OrcamentoComponent {
  orcamentos$ = new Observable<IOrcamento[]>();
  isModalOrcamento: boolean = false;
  message = '';

  orcamento: IOrcamento = <IOrcamento>{};

  constructor(private orcamentoService: OrcamentoService) {}

  ngOnInit(): void {
    this.getAllOrcamentos();
  }

  showModalOrcamento() {
    this.orcamento = <IOrcamento>{};
    this.isModalOrcamento = !this.isModalOrcamento;
  }

  editOrcamento(id: string) {
    this.orcamentoService.getOrcamentoById(id).subscribe(
      (orcamento: IOrcamento) => {
        this.orcamento = orcamento;
        this.isModalOrcamento = true;
      },
      (error) => {
        console.error('Erro ao obter o orçamento por ID', error);
        // Trate o erro conforme necessário
      }
    );
  }

  getAllOrcamentos() {
    this.orcamentos$ = this.orcamentoService.getAllOrcamentos();
  }

  getOrcamentoById(id: string) {
    console.log(id);
    this.orcamentoService
      .getOrcamentoById(id)
      .subscribe((data) => (this.orcamento = data));
  }

  putOrcamento(id: string, orcamento: IOrcamento) {
    this.orcamentoService
      .putOrcamento(id, orcamento)
      .subscribe(() => this.orcamentoService.getAllOrcamentos());
  }

  removeOrcamento(id: string) {
    this.orcamentoService
      .removeOrcamento(id)
      .subscribe(() => this.getAllOrcamentos());
    this.message = 'Excluído!';
  }
}
