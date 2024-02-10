import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrcamentoService } from '../../services/orcamento.service';
import { tap } from 'rxjs';
import { IOrcamento } from '../../interface/IOrcamento';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-modal-orcamento',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './modal-orcamento.component.html',
  styleUrl: './modal-orcamento.component.css',
})
export class ModalOrcamentoComponent implements OnInit {
  @Output() isModalOrcamento = new EventEmitter<void>();
  @Output() updateData = new EventEmitter<void>();

  @Input() orcamento: IOrcamento = <IOrcamento>{};

  isBusy: boolean = false;
  orcamentoForm!: FormGroup;

  constructor(
    private orcamentoService: OrcamentoService,
    private formBuilder: FormBuilder,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.orcamentoForm = this.formBuilder.group({
      cliente: [
        this.orcamento.cliente,
        Validators.compose([Validators.required]),
      ],
      carro: [this.orcamento.carro, Validators.compose([Validators.required])],
      telefone: [
        this.orcamento.telefone,
        Validators.compose([Validators.required]),
      ],
      chassis: [this.orcamento.chassis],
      placa: [
        this.orcamento.placa,
        Validators.compose([Validators.maxLength(7)]),
      ],
    });
  }

  closeModal() {
    this.isModalOrcamento.emit();
  }

  submit() {
    if (this.orcamentoForm.valid) {
      this.isBusy = true;

      if (this.orcamento.id) {
        this.orcamentoService
          .putOrcamento(this.orcamento.id, this.orcamentoForm.value)
          .pipe(tap(() => this.updateData.emit()))
          .subscribe(() => {
            this.closeModal(),
              this.messagesService.add('Alterado com Sucesso', 'success');
          });
      } else {
        this.orcamentoService
          .postOrcamento(this.orcamentoForm.value)
          .pipe(tap(() => this.updateData.emit()))
          .subscribe(() => {
            this.closeModal(),
              this.messagesService.add('Salvo com Sucesso', 'success');
          });
      }

      this.isBusy = false;
    }
  }

  isObjectEmpty(obj: any): boolean {
    return obj !== null && Object.keys(obj).length === 0;
  }
}
