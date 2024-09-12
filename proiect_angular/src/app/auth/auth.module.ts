import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AuthPageComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule, 
    AuthRoutingModule, 
    FormsModule
  ]
})
export class AuthModule { }
