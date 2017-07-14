import {GoogleMapsAPIWrapper}  from 'angular2-google-maps/core';
import { Directive,  Input, Output } from '@angular/core';

declare var google: any;

@Directive({
  selector: 'sebm-google-map-directions'
})
export class DirectionsMapDirective {
  @Input() origin:any ;
  @Input() destination:any;
  @Input() originPlaceId:any;
  @Input() destinationPlaceId:any;
  @Input() waypoints:any=[];
  @Input() directionsDisplay:any;
  @Input() estimatedTime : any;
  @Input() estimatedDistance : any;
  @Input() addedDirections:any;
 
  constructor (private gmapsApi: GoogleMapsAPIWrapper) {}
  updateDirections(){
    this.gmapsApi.getNativeMap().then(map => {
              var added=this.addedDirections;
              if(typeof added==='undefined' || added===null || added.length<2)
              {
                this.directionsDisplay.setMap(null);
                this.directionsDisplay.setDirections(null);
                return;
              }

              var org=null; 
              var des=null;
              var wayP=[];

              for (var i = 0;  i< added.length; i++) {
                if(i===0) {
                  org=new google.maps.LatLng(added[i].lat, added[i].lng);
                }
                else if(added.length===(i+1)) {
                  des=new google.maps.LatLng(added[i].lat, added[i].lng);
                }
                else {
                  wayP.push(  {"location":{"lat":added[i].lat,"lng":added[i].lng},"stopover":true} );
                }
              }

              var directionsService = new google.maps.DirectionsService;

              this.directionsDisplay.setMap(map);
              this.directionsDisplay.setOptions({
                polylineOptions: {
                            strokeWeight: 8,
                            strokeOpacity: 0.7,
                            strokeColor:  '#00468c' 
                        }
                });
              this.directionsDisplay.setDirections({routes: []});
              directionsService.route({
                      origin: org,
                      destination: des,
                      waypoints: wayP,
                      optimizeWaypoints: true,
                      travelMode: 'DRIVING'

                    }, (response: any, status: any) => {
                        if (status === 'OK') {
                          this.directionsDisplay.setDirections(null);
                          this.directionsDisplay.setDirections(response);
                        } 
                        else {
                          console.log('Directions request failed due to ' + status);
                        }
              });
    });

  }

  private getcomputeDistance(latLngA: any , latLngB: any ) 
  {
    return (google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB) / 1000).toFixed(2);
  }
}