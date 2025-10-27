// src/app/search/search-module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBar } from './search-bar/search-bar';
import { SearchSection } from './search-section/search-section';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// La ruta corregida por ti:
import { authInterceptor } from '../interceptors/auth-interceptors'; 
import { addAuthHeaderInterceptor } from '../interceptors/core/add-auth-header-interceptors';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router'; 

@NgModule({
  declarations: [
    SearchBar,
    SearchSection
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers:[
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        addAuthHeaderInterceptor
      ])
    )
  ],
  exports:[
    SearchBar, 
    SearchSection 
  ]
})
export class SearchModule { }