import { TestBed } from '@angular/core/testing';
import { IndicadorService } from './indicador.service';


describe('indicadorService', () => {
  let service: IndicadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
