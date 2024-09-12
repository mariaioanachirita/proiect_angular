import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_helpers/services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CustomValidators } from '../_helpers/validators/password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, 
    private notificationService: NzNotificationService
  ) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };
    
    this.authService.register(user).subscribe(
      (response) => {
        // Handle successful registration
        console.log('Registration successful', response);
        this.router.navigate(['']);
      },
      (error) => {
        // Handle errors
        console.error('Registration error', error);
        this.errorMessage = 'Registration failed. Please try again.';
        this.notificationService.error('Error', 'Something went wrong');
        return;
      }
    );

    const passwordError = CustomValidators.passwordValidator(this.password);
    if (passwordError) {
      this.errorMessage = passwordError;
      this.notificationService.error('Error', 'Password must be at least 6 characters long');
      return;
    }
  }
}
