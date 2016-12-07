import './rxjs-extensions';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }            from './app.component';
import { DashboardComponent }   from '../app/dashboard/components/dashboard.component';
import { BlobsComponent }      from '../app/blobs/components/blobs.component';
import { BlobDetailComponent }  from '../app/blobs/components/blob-detail.component';
import { BlobService }          from '../app/blobs/services/blob.service';
import { BlobSearchComponent }  from '../app/blobs/components/blob-search.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    BlobDetailComponent,
    BlobsComponent,
    BlobSearchComponent
  ],
  providers: [
    BlobService,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
}