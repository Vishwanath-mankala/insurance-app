import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPortalComponent } from './buy-portal.component';

describe('BuyPortalComponent', () => {
  let component: BuyPortalComponent;
  let fixture: ComponentFixture<BuyPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyPortalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
