import { Component, OnInit } from '@angular/core';
import { DeskService } from '../services/desk.service';
import { Desk } from '../models/desk.model';

@Component({
  selector: 'app-list-desk',
  templateUrl: './list-desk.component.html',
  styleUrls: ['./list-desk.component.css'],
})
export class ListDeskComponent implements OnInit {
  desks: Desk[] = [];

  constructor(private deskService: DeskService) {}

  ngOnInit(): void {
    this.atualizarDesks();

    this.deskService.onDeskChange().subscribe(() => {
      this.atualizarDesks();
    });
  }

  private atualizarDesks() {
    this.deskService.getDesks().subscribe((desks) => {
      this.desks = desks;
    });
  }

  editDesk(desk: Desk) {
    // Implemente a lógica de edição aqui, por exemplo, navegar para a página de edição
  }

  // Método para excluir uma mesa
  deleteDesk(desk: Desk) {
    if (confirm('Tem certeza que deseja excluir esta mesa?')) {
      if (desk.id !== undefined) {
        this.deskService.deleteDesk(desk.id).subscribe(
          () => {
            console.log('Mesa excluída com sucesso.');
            // Atualize a lista de mesas após a exclusão
            this.atualizarDesks();
          },
          (error: any) => {
            console.error('Erro ao excluir a mesa:', error);
          }
        );
      } else {
        console.error(
          'ID da mesa é undefined. A exclusão não pode ser realizada.'
        );
      }
    }
  }
}
