import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ToastModule,TableModule,ButtonModule,TooltipModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private messageService: MessageService) {}
  title = 'indicador-frontend';
}
