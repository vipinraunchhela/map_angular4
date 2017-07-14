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
 
  constructor (private gmapsApi: GoogleMapsAPIWrapper) {}
  updateDirections(){
    this.gmapsApi.getNativeMap().then(map => {
              if(!this.originPlaceId || !this.destinationPlaceId ){
                return;
              }
              var directionsService = new google.maps.DirectionsService;
              var me = this;
              var latLngA = new google.maps.LatLng({lat: this.origin.latitude, lng: this.origin.longitude });
              var latLngB = new google.maps.LatLng({lat: this.destination.latitude, lng: this.destination.longitude });
              this.directionsDisplay.setMap(null);
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
                      origin: {placeId : this.originPlaceId },
                      destination: {placeId : this.destinationPlaceId },
                      // avoidHighways: true,
                      // travelMode: 'DRIVING'
                      // origin: new google.maps.LatLng(30.4599, 78.0664),
                      // destination:new google.maps.LatLng(19.0760, 72.8777),
                      waypoints: this.waypoints,
                      optimizeWaypoints: true,
                      travelMode: 'DRIVING'



                    }, function(response: any, status: any) {
                                if (status === 'OK') {
                                  me.directionsDisplay.setDirections(null);
                                  me.directionsDisplay.setDirections(response);
                                  map.setZoom(30);
                                  console.log(me.getcomputeDistance (latLngA, latLngB));
                                  var point = response.routes[ 0 ].legs[ 0 ];
                                  me.estimatedTime = point.duration.text ;
                                  me.estimatedDistance = point.distance.text;
                                  console.log(me.estimatedTime);
                                  console.log( 'Estimated travel time: ' + point.duration.text + ' (' + point.distance.text + ')' );
 
                                } else {
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