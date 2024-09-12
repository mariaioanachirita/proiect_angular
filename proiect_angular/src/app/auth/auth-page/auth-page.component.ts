import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../_helpers/services/auth.service';
import { CustomValidators } from '../_helpers/validators/password.validator';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  userToken: string | null = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {

    const storedEmail = localStorage.getItem('rememberedEmail');
    const storedPassword = localStorage.getItem('rememberedPassword');

    if (storedEmail && storedPassword) {
      this.email = storedEmail;
      this.password = storedPassword;
      this.rememberMe = true;
    }

    this.userToken = sessionStorage.getItem('userToken');
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter email and password';
      this.notificationService.error('Error', 'Please enter email and password');
      return;
    }

    const passwordError = CustomValidators.passwordValidator(this.password);
    if (passwordError) {
      this.errorMessage = passwordError;
      this.notificationService.error('Error', 'Password must be at least 6 characters long');
      return;
    }

    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        console.log(response);
        if (response.token) {
          this.authService.setToken(response.token);
          this.userToken = this.authService.getToken();

          if (this.rememberMe) {
            // Store email and password in localStorage if rememberMe is checked
            localStorage.setItem('rememberedEmail', this.email);
            localStorage.setItem('rememberedPassword', this.password);
          } else {
            // Clear stored credentials if rememberMe is not checked
            localStorage.removeItem('rememberedEmail');
            localStorage.removeItem('rememberedPassword');
          }

          sessionStorage.setItem('userToken', response.token);
          this.router.navigateByUrl('/table');
        } else {
          this.errorMessage = 'Invalid credentials';
        }
      },
      (error: any) => {
        console.error(error);
        this.errorMessage = 'Invalid credentials';
        this.notificationService.error('Error', 'Invalid credentials');
        this.userToken = null;
        this.authService.logOut();
      }
    );
  }
}
