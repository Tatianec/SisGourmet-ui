import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Desk } from 'src/app/models/desk.model';
import { DeskService } from 'src/app/services/desk.service';

@Component({
  selector: 'app-add-desk',
  templateUrl: './add-desk.component.html',
  styleUrls: ['./add-desk.component.css']
})
export class AddDeskComponent implements OnInit {
  deskForm!: FormGroup;

  constructor(private fb: FormBuilder, private deskService: DeskService) {}

  ngOnInit(): void {
    this.deskForm = this.fb.group({
      capacity: ['', [Validators.required, Validators.min(1)]],
      available: [false]
    });
  }

  cadastrarMesa() {
    if (this.deskForm.valid) {

      const mesaData: Desk = this.deskForm.value as Desk;
      mesaData.available = mesaData.available ? 1 : 0;

      // Enviar os dados para o serviço para salvar no servidor
      this.deskService.cadastrarMesa(mesaData).subscribe(
        (response) => {
          console.log('Mesa cadastrada com sucesso.', response);
          this.deskForm.reset();
        },
        (error) => {
          console.error('Erro ao cadastrar a mesa:', error);
        }
      );
    }
  }
}
