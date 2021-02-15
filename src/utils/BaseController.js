import { BehaviorSubject } from 'rxjs';

export default class BaseController {
  subscriptions = [];

  pageErrors = new BehaviorSubject(null);

  registerToUnsubscribe(subscription) {
    this.subscriptions.push(subscription);
  }

  unsubscribeAll() {
    this.subscriptions.forEach((subscriptions) => { subscriptions.unsubscribe(); });
  }
}
