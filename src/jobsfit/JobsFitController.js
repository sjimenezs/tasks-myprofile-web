import { BehaviorSubject } from 'rxjs';
import ApiCaller from '../api/ApiCaller';
import BaseController from '../utils/BaseController';
import ErrorCodes from '../utils/ErrorCodes';
import Logger from '../utils/Logger';

export default class JobsFitController extends BaseController {
  fitToJob = new BehaviorSubject([]);

  async fetchFitToJob() {
    try {
      const response = await ApiCaller.fetch('/profile/v1/fetchfittojob', 'POST', { username: 'seduardojs' });
      if (response.isError) {
        this.pageErrors.next(response.errorCode);
      }

      this.fitToJob.next(response.ok);
    } catch (e) {
      Logger.logError(e);
      this.pageErrors.next(ErrorCodes.GENERAL_ERROR);
    }
  }

  subscribeFitToJob(setter) {
    this.registerToUnsubscribe(this.fitToJob.subscribe(setter));
  }
}
