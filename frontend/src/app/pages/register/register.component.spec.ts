import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { delay, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { By } from '@angular/platform-browser';
class MockAuthService {
  register(name: string, email: string, password: string, role: string) {
    return of({
      id: '123',
      name,
      email,
      password,
      role,
    } as User);
  }
}
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, FormsModule, CommonModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty initial values', () => {
    expect(component.name).toBe('');
    expect(component.email).toBe('');
    expect(component.password).toBe('');
    expect(component.role).toBe('customer');
    expect(component.message).toBe('');
    expect(component.loading).toBe(false);
  });
  it('should call AuthService.register with correct params', () => {
    spyOn(authService, 'register').and.callThrough();
    component.name = 'Test User';
    component.email = 'test@test.com';
    component.password = '123456';
    component.role = 'customer';

    component.register();

    expect(authService.register).toHaveBeenCalledWith(
      'Test User',
      'test@test.com',
      '123456',
      'customer'
    );
  });
  it('should set loading to true when register is called and false after finalize', fakeAsync(() => {
    spyOn(authService, 'register').and.returnValue(
      of({} as User).pipe(delay(100))
    );

    component.register();

    // loading should be true immediately
    expect(component.loading).toBeTrue();

    tick(100); // flush observable delay
    expect(component.loading).toBeFalse();

    tick(2000); // flush the setTimeout if you want
  }));
  it("should set success message and navigate to '/login' after 2 seconds on successful registration", fakeAsync(() => {
    spyOn(authService, 'register').and.returnValue(
      of({} as User).pipe(delay(100))
    );
    component.name = 'Test User';
    component.email = 'test@test.com';
    component.password = '123456';
    component.role = 'customer';

    component.register();
    tick(100);
    expect(component.message).toBe('Registration successful! Please log in.')
    expect(component.loading).toBeFalse();
    tick(2000);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  }));
  it('should handle registration error', fakeAsync(() => {
  const errorResponse = { error: { message: 'Email already exists' } };
  spyOn(authService, 'register').and.returnValue(throwError(() => errorResponse));

  component.register();
  tick();
  expect(component.message).toBe('Email already exists');
  expect(component.loading).toBe(false);
}));
it('should submit the form via DOM interaction', fakeAsync(() => {
  spyOn(authService, 'register').and.callThrough();

  const nameInput = fixture.debugElement.query(By.css('input[name="name"]')).nativeElement;
  const emailInput = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
  const passwordInput = fixture.debugElement.query(By.css('input[name="password"]')).nativeElement;
  const form = fixture.debugElement.query(By.css('form')).nativeElement;

  // simulate user input
  nameInput.value = 'John';
  nameInput.dispatchEvent(new Event('input'));

  emailInput.value = 'john@example.com';
  emailInput.dispatchEvent(new Event('input'));

  passwordInput.value = 'password123';
  passwordInput.dispatchEvent(new Event('input'));

  fixture.detectChanges();

  // submit form
  form.dispatchEvent(new Event('submit'));
  tick();

  expect(authService.register).toHaveBeenCalledWith(
    'John', 'john@example.com', 'password123', 'customer'
  );
  expect(component.message).toBe('Registration successful! Please log in.');
}));
it('should show spinner when loading is true', () => {
  component.loading = true;
  fixture.detectChanges();

  const spinner = fixture.debugElement.query(By.css('.loading-spinner'));
  expect(spinner).toBeTruthy();
});
it('should show name required error when name is empty and touched', () => {
  component.name = '';
  fixture.detectChanges();

  const nameInput = fixture.debugElement.query(By.css('input[name="name"]')).nativeElement;
  nameInput.dispatchEvent(new Event('blur'));
  fixture.detectChanges();

  const error = fixture.debugElement.query(By.css('.validation-error'));
  expect(error.nativeElement.textContent).toContain('Name is required');
});

});
