import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomNavbarComponent } from './custom-navbar.component';
import { AuthService } from '../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('CustomNavbarComponent', () => {
  let component: CustomNavbarComponent;
  let fixture: ComponentFixture<CustomNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomNavbarComponent, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: { logout: jasmine.createSpy('logout') } },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
