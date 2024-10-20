import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { IndicadorFormComponent } from './components/indicador-form/indicador-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent,title:'Página de inicio' },
  { path: 'indicadores/crear', component: IndicadorFormComponent,  title:'Formulario de Indicadores Nuevos' },  // Ruta para crear nuevo indicador
  { path: 'indicadores/editar/:id', component: IndicadorFormComponent, title:'Formulario de Indicador Seleccionado' }  // Ruta para editar un indicador existente
];
export class AppRoutingModule { }

