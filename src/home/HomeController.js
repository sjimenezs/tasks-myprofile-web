import { BehaviorSubject } from 'rxjs';
import ApiCaller from '../api/ApiCaller';
import BaseController from '../utils/BaseController';
import ErrorCodes from '../utils/ErrorCodes';
import Logger from '../utils/Logger';

export default class HomeController extends BaseController {
  constructor({ history }) {
    super();
    this.history = history;
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
      const response = await ApiCaller.fetch('/profile/v1/login', 'POST', { username: usernameValue });
      if (response.isError) {
        this.usernameValidationErrors.next(response.errorCodes[0]);
      }
      if (!response.ok.exists) {
        this.usernameValidationErrors.next('error.usernotexists');
        return;
      }
      this.history.push({ pathname: '/jobs', state: { username: usernameValue } });
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
    this.registerToUnsubscribe(this.username.subscribe(setter));
  }

  subscribeUsernameValidationsErrors(setter) {
    this.registerToUnsubscribe(this.usernameValidationErrors.subscribe(setter));
  }

  updateUserName(value) {
    this.username.next(value);
  }
}
