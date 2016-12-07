import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Blob } from '../../models/blob';
import { BlobService } from '../../blobs/services/blob.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  blobs: Blob[] = [];

  constructor(
    private router: Router,
    private blobService: BlobService) {
  }

  ngOnInit(): void {
    this.blobService.getBlobs()
      .then(blobs => this.blobs = blobs.slice(1, 5));
  }

  gotoDetail(blob: Blob): void {
    let link = ['/detail', blob.id];
    this.router.navigate(link);
  }
}