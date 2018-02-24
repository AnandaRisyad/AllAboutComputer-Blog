import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// =>------------- Component ------------<= \\
import { HomeComponent } from './home/home.component';

import { AuthComponent } from './auth/auth.component';

import { ProfileComponent } from './profile/profile.component'

import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

import { LoginComponent } from './auth/login/login.component'

import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
