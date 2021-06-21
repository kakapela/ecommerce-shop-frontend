import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginRegisterComponent } from './auth/login-register/login-register.component';
import { LoginComponent } from './auth/login-register/login/login.component';
import { RegisterComponent } from './auth/login-register/register/register.component';
import {HttpClientModule} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SliderComponent } from './home/slider/slider.component';
import { LatestComponent } from './home/latest/latest.component';
import { MottoComponent } from './home/motto/motto.component';
import { SubscribtionFormComponent } from './home/subscribtion-form/subscribtion-form.component';
import { CategoriesComponent } from './home/categories/categories.component';
import { RecommendedComponent } from './home/recommended/recommended.component';
import {CarouselModule} from "ngx-owl-carousel-o";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CommonModule} from "@angular/common";
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginRegisterComponent,
    LoginComponent,
    RegisterComponent,
    SliderComponent,
    LatestComponent,
    MottoComponent,
    SubscribtionFormComponent,
    CategoriesComponent,
    RecommendedComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    CarouselModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
