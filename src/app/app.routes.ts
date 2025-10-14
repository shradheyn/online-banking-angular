import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotIdComponent } from './components/forgotid/forgotid.component';
import { ForgotPasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { NewPasswordComponent } from './components/newpassword/newpassword.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FundTransferComponent } from './components/fund-transfer/fund-transfer.component';
import { PayeeComponent } from './components/payee/payee.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { AccountComponent } from './components/account/account.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
     { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {path: 'navbar',component:NavbarComponent},
    {path: 'login',component:LoginComponent},
    {path: 'forgotid',component: ForgotIdComponent},
    {path: 'forgotpassword',component:ForgotPasswordComponent},
    {path: 'newpassword',component: NewPasswordComponent},
    {path: 'register',component:RegisterComponent},
    {path: 'dashboard',component:DashboardComponent},
    {path: 'funds-transfer',component:FundTransferComponent},
    {path: 'payee',component:PayeeComponent},
    {path: 'transaction',component:TransactionComponent},
    {path: 'account', component:AccountComponent},
    {path: 'admin-dashboard', component:AdminDashboardComponent}
];
