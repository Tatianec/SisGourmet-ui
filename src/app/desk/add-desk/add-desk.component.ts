import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
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
      available: [false],
      nro_desk: [0, [], [this.validateDuplicateNumber.bind(this)]],
    });
  }

  validateDuplicateNumber(control: any) {
    const value = control.value;
    return this.deskService.checkIfNumberExists(value).pipe(
      map((exists: boolean) => {
        return exists ? { duplicateNumber: true } : null;
      })
    );
  }



  cadastrarMesa() {
    if (this.deskForm.valid) {

      const mesaData: Desk = this.deskForm.value as Desk;
      mesaData.available = 1;

      this.deskService.createDesk(mesaData).subscribe(
        (response: any) => {
          console.log('Mesa cadastrada com sucesso.', response);
          this.deskForm.reset();
        },
        (error: any) => {
          console.error('Erro ao cadastrar a mesa:', error);
        }
      );
    }
  }
}
