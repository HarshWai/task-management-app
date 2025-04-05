import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  private notificationSubject = new Subject<{ message: string, type: string }>();
  notifications$ = this.notificationSubject.asObservable();

  show(message: string, type: string = 'success') {
    this.notificationSubject.next({ message, type });
  }
}
