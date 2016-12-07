import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Blob }                from '../../models/blob';
import { BlobService }         from '../services/blob.service';
@Component({
  moduleId: module.id,
  selector: 'my-blobs',
  templateUrl: '../public/blobs.component.html',
  styleUrls: [ '../public/blobs.component.css' ]
})
export class BlobsComponent implements OnInit {
  blobs: Blob[];
  selectedBlob: Blob;
  constructor(
    private blobService: BlobService,
    private router: Router) { }
  getBlobs(): void {
    this.blobService
        .getBlobs()
        .then(blobs => this.blobs = blobs);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.blobService.create(name)
      .then(blob => {
        this.blobs.push(blob);
        this.selectedBlob = null;
      });
  }
  delete(blob: Blob): void {
    this.blobService
        .delete(blob.id)
        .then(() => {
          this.blobs = this.blobs.filter(h => h !== blob);
          if (this.selectedBlob === blob) { this.selectedBlob = null; }
        });
  }
  ngOnInit(): void {
    this.getBlobs();
  }
  onSelect(blob: Blob): void {
    this.selectedBlob = blob;
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedBlob.id]);
  }
}
