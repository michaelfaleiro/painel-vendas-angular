import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrcamentoService } from '../../services/orcamento.service';
import { IProduto } from '../../interface/IProduto';
import { MessagesService } from '../../services/messages.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-produto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-produto.component.html',
  styleUrl: './modal-produto.component.css',
})
export class ModalProdutoComponent {
  @Output() isModalProduto = new EventEmitter<void>();
  @Output() updateData = new EventEmitter<void>();

  @Input() produto: IProduto = <IProduto>{};

  isBusy: boolean = false;

  produtoForm!: FormGroup;

  constructor(
    private orcamentoService: OrcamentoService,
    private formBuilder: FormBuilder,
    private messagesService: MessagesService,
    private route: ActivatedRoute
  ) {}

  closeModal() {
    this.isModalProduto.emit();
  }

  ngOnInit() {
    this.produtoForm = this.formBuilder.group({
      quantidade: [
        this.produto.quantidade || 1,
        Validators.compose([Validators.required]),
      ],
      sku: [this.produto.sku, Validators.compose([Validators.required])],
      nomeProduto: [
        this.produto.nomeProduto,
        Validators.compose([Validators.required]),
      ],
      marca: [this.produto.marca],
      link: [this.produto.link],
      precoVenda: [
        this.produto.precoVenda || 0,
        Validators.compose([Validators.required]),
      ],
      observacao: [this.produto.observacao],
    });
  }

  submit() {
    if (this.produtoForm.valid) {
      this.isBusy = true;
      const id = this.route.snapshot.paramMap.get('id');
      if (this.produto.id) {
        this.orcamentoService
          .putProdutoOrcamento(id!, this.produto.id, this.produtoForm.value)
          .pipe(tap(() => this.updateData.emit()))
          .subscribe(() => {
            this.closeModal(),
              this.messagesService.add('Alterado com Sucesso', 'success');
          });
      } else {
        this.orcamentoService
          .addProdutoOrcamento(id!, this.produtoForm.value)
          .pipe(tap(() => this.updateData.emit()))
          .subscribe(() => {
            this.closeModal(),
              this.messagesService.add(
                'Produto incluído com Sucesso',
                'success'
              );
          });
      }

      this.isBusy = false;
    }
  }

  isObjectEmpty(obj: any): boolean {
    return obj !== null && Object.keys(obj).length === 0;
  }
}
