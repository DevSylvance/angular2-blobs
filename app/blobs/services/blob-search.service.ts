import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Blob }           from '../../models/blob';
@Injectable()
export class BlobSearchService {
  constructor(private http: Http) {}
  search(term: string): Observable<Blob[]> {
    return this.http
               .get(`http://127.1.1.1:4000/?search=${term}`)
               .map((r: Response) => r.json().data as Blob[]);
  }
}
