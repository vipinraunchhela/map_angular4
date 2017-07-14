import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef, Directive, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import { DirectionsMapDirective } from './google-map.directive';
import {} from '@types/googlemaps';

declare var google: any;
declare var jQuery: any;

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [GoogleMapsAPIWrapper],
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    locations = [
    { id: 1, lat: 52.120353, lng: 5.312405 }, 
    { id: 2, lat: 52.119720, lng: 5.327854 }, 
    { id: 3, lat: 52.123357, lng: 5.293179 }, 
    { id: 4, lat: 52.121354, lng: 5.272150 }, 
    { id: 6, lat: 52.3702, lng: 4.8952 } 

    ];

    added = [];

    clickAdd(id) {
        let addedLocations = this.locations.filter(function(item) {
            return id == item.id;
        });
        this.added.push(addedLocations[0]);
        this.locations = this.locations.filter(function(item) {
            return item.id !== id;
        });
        if (this.vc.directionsDisplay === undefined) {
              this.mapsAPILoader.load().then(() => {
                  this.vc.directionsDisplay = new google.maps.DirectionsRenderer;
              });
         }
        this.vc.addedDirections=this.added;
        this.vc.updateDirections();
    }
    clickRemove(id) {
        let removedLocations = this.added.filter(function(item) {
            return id == item.id;
        });
        this.locations.push(removedLocations[0]);
        this.added = this.added.filter(function(item) {
            return item.id !== id;
        });

        this.vc.addedDirections=this.added;
        this.vc.updateDirections();
    
    }

    public zoom: number;
    public iconurl: string;
    public mapCustomStyles: any;

    @Input() waypoints: any;
    @ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;


    constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private gmapsApi: GoogleMapsAPIWrapper, private _elementRef: ElementRef) {}
    ngOnInit() {
        //set google maps defaults
        this.zoom = 2;
        this.iconurl = '../image/map-icon.png';
    }
   
    private getMapCusotmStyles() {
        // Write your Google Map Custom Style Code Here.
    }
}