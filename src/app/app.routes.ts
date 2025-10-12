import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotIdComponent } from './components/forgotid/forgotid.component';
import { ForgotPasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { NewPasswordComponent } from './components/newpassword/newpassword.component';

export const routes: Routes = [
     { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {path: 'navbar',component:NavbarComponent},
    {path: 'login',component:LoginComponent},
    {path: 'forgotid',component: ForgotIdComponent},
    {path: 'forgotpassword',component:ForgotPasswordComponent},
    {path: 'newpassword',component: NewPasswordComponent}
];
