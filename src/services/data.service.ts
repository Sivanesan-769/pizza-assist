import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { data } from '../assets/data/data';

@Injectable({ providedIn: 'root' })
export class DataService {

  public getData() {
    return Promise.resolve(data);
  }


}
