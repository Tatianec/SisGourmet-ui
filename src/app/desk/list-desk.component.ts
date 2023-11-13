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
  visible: boolean = false;
  selectedDesk: Desk = {
    id: 0,
    capacity: 0,
    available: 0,
    nro_desk: 0,
  };

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

  openEditDialog(desk: Desk): void {
    this.visible = true;
    this.selectedDesk = {
      id: desk.id,
      capacity: desk.capacity,
      available: desk.available,
      nro_desk: desk.nro_desk,
    };
  }

  saveChanges(): void {
    // Chama o serviço para atualizar o produto
    this.deskService
      .updateDesk(this.selectedDesk.id, this.selectedDesk)
      .subscribe(
        () => {
          console.log('Produto atualizado com sucesso.');
          // Fecha o p-dialog após salvar as alterações
          this.visible = false;
          // Atualiza a lista de produtos
          this.atualizarDesks();
        },
        (error: any) => {
          console.error('Erro ao atualizar o produto:', error);
          // Adicione a lógica de tratamento de erro, se necessário
        }
      );
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
