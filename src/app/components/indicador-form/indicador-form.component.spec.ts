import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndicadorFormComponent } from './indicador-form.component';


describe('indicadorFormComponent', () => {
  let component: IndicadorFormComponent;
  let fixture: ComponentFixture<IndicadorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicadorFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndicadorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
