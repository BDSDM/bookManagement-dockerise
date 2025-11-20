import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private apiUrl = environment.apiUrlUploadFile; // <-- utiliser environment

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.apiUrl + '/upload/image', formData, {
      responseType: 'text',
    });
  }
}
