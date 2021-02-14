import { BehaviorSubject } from 'rxjs';
import ApiCaller from '../api/ApiCaller';
import ErrorCodes from '../utils/ErrorCodes';
import Logger from '../utils/Logger';

export default class HomeController {
  constructor() {
    this.username = new BehaviorSubject('');
    this.usernameValidationErrors = new BehaviorSubject(undefined);
    this.subscriptions = [];
  }

  async enter() {
    if (!this.isFormValid()) {
      return;
    }
    const usernameValue = this.username.getValue();
    try {
      const response = await ApiCaller.fetch('/enter', 'POST', { username: usernameValue });
      if (response.isError) {
        this.usernameValidationErrors.next(response.errorCode);
      }
    } catch (e) {
      Logger.logError(e);
      this.usernameValidationErrors.next(ErrorCodes.GENERAL_ERROR);
    }
  }

  isFormValid() {
    this.usernameValidationErrors.next(undefined);
    const usernameValue = this.username.getValue();
    if (!usernameValue || usernameValue === '') {
      this.usernameValidationErrors.next('username required');
      return false;
    }
    return true;
  }

  subscribeUsername(setter) {
    const subscription = this.username.subscribe(setter);
    this.subscriptions.push(subscription);
  }

  subscribeUsernameValidationsErrors(setter) {
    const subscription = this.usernameValidationErrors.subscribe(setter);
    this.subscriptions.push(subscription);
  }

  unsubscribeAll() {
    this.subscriptions.forEach((subscriptions) => { subscriptions.unsubscribe(); });
  }

  updateUserName(value) {
    this.username.next(value);
  }
}
