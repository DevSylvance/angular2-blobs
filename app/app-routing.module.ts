import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from '../app/dashboard/components/dashboard.component';
import { BlobsComponent }      from '../app/blobs/components/blobs.component';
import { BlobDetailComponent }  from '../app/blobs/components/blob-detail.component';

const routes: Routes = [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'blob/:id',
        component: BlobDetailComponent
      },
      {
        path: 'blobs',
        component: BlobsComponent
      }
    ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}