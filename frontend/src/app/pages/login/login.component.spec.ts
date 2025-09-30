import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { delay, of, throwError } from 'rxjs';
import { CustomButtonComponent } from '../../components/custom-button/custom-button.component';
import { By } from '@angular/platform-browser';
import { User } from '../../models/user';

// Mock AuthService
class MockAuthService {
  checkLogin() { return false; }
  login(email: string, password: string) {
    return of({ token: 'abc123' ,user:User});
  }
}

// Mock Router
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, LoginComponent, CustomButtonComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  // 1️⃣ Component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // 2️⃣ Initial values
  it('should have empty email, password, message and loading false', () => {
    expect(component.email).toBe('');
    expect(component.password).toBe('');
    expect(component.message).toBe('');
    expect(component.loading).toBeFalse();
  });

  // 3️⃣ Loading true during login and false after finalize
  it('should set loading true during login and false after finalize', fakeAsync(() => {
    spyOn(authService, 'login').and.returnValue(of({ token: 'abc123', user: {} as User }).pipe(delay(100)));
    component.login();
    expect(component.loading).toBeTrue();
    tick(100); // flush observable finalize
    expect(component.loading).toBeFalse();
  }));

  // 4️⃣ Successful login sets message
  it('should set success message after login', fakeAsync(() => {
    spyOn(authService, 'login').and.returnValue(of({ token: 'abc123', user: {} as User }));
    component.login();
    tick();
    expect(component.message).toBe('Login successful! Redirecting...');
  }));

  // 5️⃣ Router navigation after login
  it('should navigate to /home after login success', fakeAsync(() => {
    spyOn(authService, 'login').and.returnValue(of({ token: 'abc123', user: {} as User }));
    component.login();
    tick(); // flush observable
    tick(2000); // flush setTimeout
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  }));

  // 6️⃣ Failed login sets error message
  it('should set error message if login fails', fakeAsync(() => {
    const errorResponse = { error: { message: 'Invalid credentials' } };
    spyOn(authService, 'login').and.returnValue(throwError(() => errorResponse));
    component.login();
    tick(); // flush observable
    expect(component.message).toBe('Invalid credentials');
  }));

  // 7️⃣ Loading false after failed login
  it('should set loading false after login error', fakeAsync(() => {
    spyOn(authService, 'login').and.returnValue(throwError(() => ({ error: {} })));
    component.login();
    tick();
    expect(component.loading).toBeFalse();
  }));

  // 8️⃣ Input fields bind to component properties
  it('should bind email and password inputs to component', () => {
    const emailInput = fixture.debugElement.query(By.css('#email')).nativeElement;
    const passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement;

    emailInput.value = 'test@example.com';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.value = '123456';
    passwordInput.dispatchEvent(new Event('input'));

    expect(component.email).toBe('test@example.com');
    expect(component.password).toBe('123456');
  });

  // 9️⃣ Submit button disabled when form invalid
  it('should disable login button if form invalid', () => {
    component.email = '';
    component.password = '';
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('app-custom-button')).componentInstance;
    expect(button.disabled).toBeTrue();
  });

  // 🔟 Submit button enabled when form valid
 it('should enable login button if form valid', fakeAsync(() => {
  const emailInput = fixture.debugElement.query(By.css('#email')).nativeElement;
  const passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement;

  emailInput.value = 'user@test.com';
  emailInput.dispatchEvent(new Event('input'));

  passwordInput.value = '123456';
  passwordInput.dispatchEvent(new Event('input'));

  fixture.detectChanges();
  tick(); // allow form validation to update

  const button = fixture.debugElement.query(By.css('app-custom-button')).componentInstance;
  expect(button.disabled).toBeFalse();
}));

});
