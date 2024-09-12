import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/_helpers/guards/auth.guard';

const routes: Routes = [
  {
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    path: '',
  },
  {
    path: 'table',
    loadChildren: () =>
      import('./table-module/table-module.module').then((m) => m.TableModuleModule),
    canActivate: [AuthGuard],
    
  },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
