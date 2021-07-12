import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginRegisterComponent} from "./auth/login-register/login-register.component";
import {ProductsComponent} from "./products/products.component";
import {AuthGuard} from "./guard/auth.guard";
import {ProductListComponent} from "./product-list/product-list.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login_register', component: LoginRegisterComponent},
  {path: 'products', component: ProductsComponent, canActivate: [AuthGuard]},
  {path: 'product-list', component: ProductListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
