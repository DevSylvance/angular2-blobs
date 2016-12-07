import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Blob }        from '../../models/blob';
import { BlobService } from '../services/blob.service';
@Component({
  moduleId: module.id,
  selector: 'my-blob-detail',
  templateUrl: '../public/blob-detail.component.html',
  styleUrls: [ '../public/blob-detail.component.css' ]
})
export class BlobDetailComponent implements OnInit {
  blob: Blob;
  constructor(
    private blobService: BlobService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.blobService.getBlob(+params['id']))
      .subscribe(blob => this.blob = blob);
  }
  save(): void {
    this.blobService.update(this.blob)
      .then(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }
}
