import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TrainingComponent } from './training/training.component';
import { LoginComponent } from './login/login.component';
export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'training', component: TrainingComponent },
  { path: 'login', component: LoginComponent },
];
