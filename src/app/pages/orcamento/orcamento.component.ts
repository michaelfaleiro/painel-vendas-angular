import { IOrcamento } from './../../interface/IOrcamento';
import { Component, Input } from '@angular/core';
import { OrcamentoService } from '../../services/orcamento.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalOrcamentoComponent } from '../../components/modal-orcamento/modal-orcamento.component';
import { MessagesService } from '../../services/messages.service';

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

  orcamento: IOrcamento = <IOrcamento>{};

  constructor(
    private orcamentoService: OrcamentoService,
    private messagesService: MessagesService
  ) {}

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
    this.orcamentoService
      .getOrcamentoById(id)
      .subscribe((data) => (this.orcamento = data));
  }

  putOrcamento(id: string, orcamento: IOrcamento) {
    this.orcamentoService
      .putOrcamento(id, orcamento)
      .subscribe(() => this.orcamentoService.getAllOrcamentos());
    this.messagesService.add('Atualizado com Sucesso', 'success');
  }

  removeOrcamento(id: string) {
    this.orcamentoService
      .removeOrcamento(id)
      .subscribe(() => this.getAllOrcamentos());
    this.messagesService.add('Orçamento Excluído', 'danger');
  }
}
