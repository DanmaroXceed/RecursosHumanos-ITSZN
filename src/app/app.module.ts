
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CoreModule } from './core/core.module';
import { PersonalComponent } from './personal/personal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CookieService } from 'ngx-cookie-service';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddComponent } from './personal/add/add.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { PreferenciasComponent } from './preferencias/preferencias.component';
import { UserDataComponent } from './personal/user-data/user-data.component';
import { StudiesProgramComponent } from './studies-program/studies-program.component';
import { InformacionComponent } from './informacion/informacion.component';
import { UpdUserDataComponent } from './personal/user-data/upd-user-data/upd-user-data.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ChgPassComponent } from './chg-pass/chg-pass.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    PersonalComponent,
    AddComponent,
    PreferenciasComponent,
    UserDataComponent,
    StudiesProgramComponent,
    InformacionComponent,
    UpdUserDataComponent,
    ChgPassComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    NgxPaginationModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    CdkAccordionModule,
    NgxExtendedPdfViewerModule,
  ],
  providers: [HttpClientModule, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
