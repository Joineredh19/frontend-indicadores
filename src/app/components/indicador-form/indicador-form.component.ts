import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { IndicadorService } from '../../services/indicador.service';
import { Indicador } from '../../models/Indicador';

@Component({
  selector: 'app-indicador-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    RouterModule,
    InputTextModule,
    InputNumberModule,
    CardModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './indicador-form.component.html',
  styleUrl: './indicador-form.component.scss'
})
export class IndicadorFormComponent implements OnInit {
  indicadorForm: FormGroup;
  isEditMode: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;
  indicadorId?: number;

  constructor(
    private fb: FormBuilder,
    private indicadorService: IndicadorService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.indicadorForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      valorEsperado: [null, [Validators.required, Validators.min(0)]],
      valorMinimo: [null, [Validators.required, Validators.min(0)]],
      valorMaximo: [null, [Validators.required, Validators.min(0)]]
    },
    { validators: this.valorMaximoValidator });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.indicadorId = +id;
      this.cargarIndicador(this.indicadorId);
    }
  }

  cargarIndicador(id: number): void {
    this.loading = true;
    this.indicadorService.getIndicadorById(id).subscribe({
      next: (data) => {
        this.indicadorForm.patchValue(data);
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar el indicador'
        });
        this.loading = false;
      }
    });
  }

  Submit() {
    this.submitted = true;

    if (this.indicadorForm.invalid) {
      alert('Por favor, corrija los errores en el formulario antes de continuar.');
      return;
    }

    this.loading = true;
    const indicador: Indicador = {
      ...this.indicadorForm.value,
      id: this.isEditMode ? this.indicadorId : undefined
    };

    const operation = this.isEditMode
      ? this.indicadorService.updateIndicador(indicador)
      : this.indicadorService.saveIndicador(indicador);

    operation.subscribe({
      next: () => {
        alert(`Indicador ${this.isEditMode ? 'actualizado' : 'creado'} correctamente`);
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert(`Error al ${this.isEditMode ? 'actualizar' : 'crear'} el indicador`);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  Cancel() {
    if (confirm('¿Está seguro que desea cancelar? Los cambios no guardados se perderán.')) {
      this.router.navigate(['/']);
    }
  }

  getErrorMessage(fieldName: string): string {
    const field = this.indicadorForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return 'Este campo es obligatorio';
      }
      if (field.errors['min']) {
        return 'El valor debe ser mayor o igual a 0';
      }
      if (field.errors['minlength']) {
        return `El valor debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
      }
      if (field.errors['maxlength']) {
        return `El valor no puede tener más de ${field.errors['maxlength'].requiredLength} caracteres`;
      }
      if (field.errors['maxMenorQueMin']) {
        return 'El valor máximo debe ser mayor que el valor mínimo';
      }
      if (field.errors['fueraDeRango']) {
        return 'El valor esperado debe estar entre el valor mínimo y máximo';
      }
    }
    return '';
  }

  valorMaximoValidator(formGroup: FormGroup) {
    const valorMinimo = formGroup.get('valorMinimo')?.value;
    const valorMaximo = formGroup.get('valorMaximo')?.value;
    const valorEsperado = formGroup.get('valorEsperado')?.value;

    if (valorMinimo !== null && valorMaximo !== null && valorEsperado !== null) {
      if (valorMinimo > valorMaximo) {
        formGroup.get('valorMaximo')?.setErrors({ maxMenorQueMin: true });
      } else if (valorEsperado < valorMinimo || valorEsperado > valorMaximo) {
        formGroup.get('valorEsperado')?.setErrors({ fueraDeRango: true });
      } else {
        formGroup.get('valorMaximo')?.setErrors(null);
        formGroup.get('valorEsperado')?.setErrors(null);
      }
    }
  }
}
