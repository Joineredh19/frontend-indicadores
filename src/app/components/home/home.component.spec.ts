import { ComponentFixture, TestBed } from '@angular/core/testing';

import { indicadorListaComponent } from './home.component';

describe('indicadorListaComponent', () => {
  let component: indicadorListaComponent;
  let fixture: ComponentFixture<indicadorListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [indicadorListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(indicadorListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
