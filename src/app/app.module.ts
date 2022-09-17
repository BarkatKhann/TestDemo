import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { RestService } from './services/rest.service';
import { FilterPipe } from './filter.pipe';
import { Storage } from '@ionic/storage';


@NgModule({
  declarations: [AppComponent, FilterPipe],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },RestService,Storage],
  bootstrap: [AppComponent],
})
export class AppModule {}
