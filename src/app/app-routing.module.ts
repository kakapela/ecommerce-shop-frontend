import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginRegisterComponent} from "./auth/login-register/login-register.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login_register', component: LoginRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
