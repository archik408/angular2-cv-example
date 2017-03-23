import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { WebCamComponent } from 'ng2-webcam';
import { FaceDetectorComponent } from '../../index.ts';

import AppComponent   from './app.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    WebCamComponent,
    FaceDetectorComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
class AppModule {
}
export default AppModule;
