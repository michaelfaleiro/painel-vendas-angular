import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  message: string = '';
  type: string = 'success';

  constructor() {}

  add(message: string, type: string) {
    this.message = message;
    this.type = type;
    setTimeout(() => {
      this.clear();
    }, 4000);
  }

  clear() {
    this.message = '';
    this.type = '';
  }
}
