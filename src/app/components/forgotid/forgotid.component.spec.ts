import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotidComponent } from './forgotid.component';

describe('ForgotidComponent', () => {
  let component: ForgotidComponent;
  let fixture: ComponentFixture<ForgotidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
