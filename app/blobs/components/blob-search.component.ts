import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { BlobSearchService } from '../services/blob-search.service';
import { Blob } from '../../models/blob';
@Component({
  moduleId: module.id,
  selector: 'blob-search',
  templateUrl: '../public/blob-search.component.html',
  styleUrls: [ '../public/blob-search.component.css' ],
  providers: [BlobSearchService]
})
export class BlobSearchComponent implements OnInit {
  startups: Observable<Blob[]>;
  private searchTerms = new Subject<string>();
  constructor(
    private blobSearchService: BlobSearchService,
    private router: Router) {}
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.startups = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.blobSearchService.search(term)
        // or the observable of empty blobs if no search term
        : Observable.of<Blob[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<Blob[]>([]);
      });
  }
  gotoDetail(blob: Blob): void {
    let link = ['/detail', blob.id];
    this.router.navigate(link);
  }
}
