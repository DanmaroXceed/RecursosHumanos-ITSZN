import {ModuleWithProviders, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import { LoginComponent } from './login/login.component';
import { CanActivateGuard } from './can-activate.guard';
import { PersonalComponent } from './personal/personal.component';
import { AddComponent } from './personal/add/add.component';
import {PreferencesComponent} from "./preferences/preferences.component";
import {StudiesProgramComponent} from "./studies-program/studies-program.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path:'home', component: HomeComponent, canActivate: [CanActivateGuard] },
  { path:'personal', component: PersonalComponent},
  { path:'personal/add', component: AddComponent},
  { path:'preferences', component: PreferencesComponent},
  {path:'studiesprograms', component: StudiesProgramComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

