import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card'; 
import Web3 from 'web3';

const material = [
  MatFormFieldModule,
  MatButtonModule,
  MatSelectModule,
  MatInputModule,
  MatToolbarModule,
  MatCardModule
]
@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    material
  ],providers:[
    Web3
  ]
})
export class HomeModule { }
