import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LenguajeListarComponent } from './lenguaje-listar.component';

describe('LenguajeListarComponent', () => {
  let component: LenguajeListarComponent;
  let fixture: ComponentFixture<LenguajeListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LenguajeListarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LenguajeListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
