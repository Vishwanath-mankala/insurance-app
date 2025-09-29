import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyPortalComponent } from './policy-portal.component';

describe('PolicyPortalComponent', () => {
  let component: PolicyPortalComponent;
  let fixture: ComponentFixture<PolicyPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyPortalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
