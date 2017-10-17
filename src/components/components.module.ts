import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapComponent } from './map/map';

@NgModule({
	imports: [IonicPageModule.forChild(MapComponent)],	
	declarations: [MapComponent],
	providers:[],
	exports: [MapComponent]
})
export class ComponentsModule {}


