import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsesorListarComponent } from './asesor-listar.component';

describe('AsesorListarComponent', () => {
  let component: AsesorListarComponent;
  let fixture: ComponentFixture<AsesorListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsesorListarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsesorListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
