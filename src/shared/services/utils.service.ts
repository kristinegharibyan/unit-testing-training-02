import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class UtilsService {
  clone<T extends object>(obj: T): T {
    return JSON.parse(JSON.stringify(obj)) as T;
  }
}