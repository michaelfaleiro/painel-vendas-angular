import { IProduto } from './../../interface/IProduto';
import { Component } from '@angular/core';
import { OrcamentoService } from '../../services/orcamento.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IOrcamento } from '../../interface/IOrcamento';
import { CommonModule } from '@angular/common';
import { ModalProdutoComponent } from '../../components/modal-produto/modal-produto.component';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-orcamento-details',
  standalone: true,
  imports: [CommonModule, ModalProdutoComponent],
  templateUrl: './orcamento-details.component.html',
  styleUrl: './orcamento-details.component.css',
})
export class OrcamentoDetailsComponent {
  isModalProduto: boolean = false;

  orcamento$ = new Observable<IOrcamento>();
  produto: IProduto = <IProduto>{};

  constructor(
    private orcamentoService: OrcamentoService,
    private route: ActivatedRoute,
    private messagesService: MessagesService
  ) {}

  ngOnInit() {
    this.getOrcamentoById();
  }

  showModalProduto() {
    this.produto = <IProduto>{};
    this.isModalProduto = !this.isModalProduto;
  }

  getOrcamentoById() {
    const id = this.route.snapshot.paramMap.get('id');
    this.orcamento$ = this.orcamentoService.getOrcamentoById(id!);
  }

  removeProdutoOrcamento(produtoId: string) {
    const id = this.route.snapshot.paramMap.get('id');
    this.orcamentoService.removeProdutoOrcamento(id!, produtoId).subscribe(
      () => {
        this.getOrcamentoById();
        this.messagesService.add('Produto Excluído com Sucesso', 'success');
      },
      (err) => {
        this.messagesService.add('Falha ao Excluir, tente novamente', 'danger');
      }
    );
  }

  editProduto(produtoId: string) {
    const id = this.route.snapshot.paramMap.get('id');
    this.orcamentoService.getProdutoOrcamento(id!, produtoId).subscribe(
      (produto: IProduto) => {
        this.produto = produto;
        this.isModalProduto = true;
        console.log(produto);
      },
      (error) => {
        console.log('Erro!', error);
      }
    );
  }
}
