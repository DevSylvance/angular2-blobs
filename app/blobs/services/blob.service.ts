import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Blob } from '../../models/blob';
@Injectable()
export class BlobService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private blobsUrl = 'http://127.1.1.1:4000/blobs'; // URL to web api 'app/blobs'
  constructor(private http: Http) { }
  getBlobs(): Promise<Blob[]> {
    return this.http.get(this.blobsUrl)
               .toPromise()
               .then(response => response.json().data as Blob[])
               .catch(this.handleError);
  }
  getBlob(id: number): Promise<Blob> {
    return this.getBlobs()
               .then(blobs => blobs.find(blob => blob.id === id));
  }
  delete(id: number): Promise<void> {
    const url = `${this.blobsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  create(blob_name: string): Promise<Blob> {
    return this.http
      .post(this.blobsUrl, JSON.stringify({blob_name: blob_name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
  update(blob: Blob): Promise<Blob> {
    const url = `${this.blobsUrl}/${blob.id}`;
    return this.http
      .put(url, JSON.stringify(blob), {headers: this.headers})
      .toPromise()
      .then(() => blob)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
