import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// =>------------- Component ------------<= \\
import { HomeComponent } from './home/home.component';

import { AuthComponent } from './auth/auth.component';

import { ProfileComponent } from './profile/profile.component'

import { PageNotFoundComponent } from './page-not-found/page-not-found.component'



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
