import { Component, OnInit } from "@angular/core";
import { IndicadorService } from "../../services/indicador.service";
import { Router, RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { TooltipModule } from "primeng/tooltip";
import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Indicador } from "../../models/Indicador";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, CardModule, TableModule, ToastModule, TooltipModule, RouterModule, ConfirmDialogModule],
  templateUrl: './home.component.html',
  providers: [ConfirmationService, MessageService],
})
export class HomeComponent implements OnInit {
  indicadores: any[] = [];

  constructor(
    private indicadorService: IndicadorService,
    private messageService: MessageService,
    private router: Router) {}

  ngOnInit(): void {
    this.cargarIndicadores();
  }

  cargarIndicadores() {
    this.indicadorService.getAllIndicadores().subscribe({
      next: (data) => {
        this.indicadores = data;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los indicadores'
        });
      }
    });
  }

  confirmarEliminacion(indicador: Indicador) {
    if (confirm(`¿Está seguro que desea eliminar el indicador "${indicador.nombre}"?`)) {
      this.eliminarIndicador(indicador);
    }
  }

  crearIndicador() {
    try {
      this.router.navigate(['/indicadores/crear']).then(
        (navegado) => {
          if (!navegado) {
            console.error('Error: Ruta para crear indicador no encontrada');
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al navegar a la página de creación'
            });
          }
        }
      );
    } catch (error) {
      console.error('Error al navegar:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al navegar a la página de creación'
      });
    }
  }

  editarIndicador(id: number) {
    if (!id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'ID de indicador no válido'
      });
      return;
    }

    try {
      this.router.navigate(['/indicadores/editar', id]).then(
        (navegado) => {
          if (!navegado) {
            console.error('Error: Ruta para editar indicador no encontrada');
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al navegar a la página de edición'
            });
          }
        }
      );
    } catch (error) {
      console.error('Error al navegar:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al navegar a la página de edición'
      });
    }
  }

  eliminarIndicador(indicador: Indicador) {
    this.indicadorService.deleteIndicador(indicador.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Indicador eliminado correctamente'
        });
        this.cargarIndicadores();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al eliminar el indicador'
        });
      }
    });
  }
}
