import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from "angular2-google-maps/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DirectionsMapDirective } from './google-map.directive';

import { AppComponent }  from './app.component';


@NgModule({

  declarations: [
    AppComponent,
    DirectionsMapDirective 
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAmMty5MmMXegrIhIhMHDWOqIu6RQ6m9vg',
      libraries: ["places"]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
