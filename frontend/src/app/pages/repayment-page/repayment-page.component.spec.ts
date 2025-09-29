import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepaymentPageComponent } from './repayment-page.component';

describe('RepaymentPageComponent', () => {
  let component: RepaymentPageComponent;
  let fixture: ComponentFixture<RepaymentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepaymentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepaymentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
