import { BehaviorSubject } from 'rxjs';
import ApiCaller from '../api/ApiCaller';
import BaseController from '../utils/BaseController';
import ErrorCodes from '../utils/ErrorCodes';
import Logger from '../utils/Logger';

export default class JobsFitController extends BaseController {
  fitToJob = new BehaviorSubject([]);

  jobsPerSkill = new BehaviorSubject([]);

  constructor({ username }) {
    super();
    this.username = username;
  }

  async fetchFitToJob() {
    try {
      const response = await ApiCaller.fetch('/profile/v1/fetchfittojob', 'POST', { username: this.username });
      if (response.isError) {
        this.pageErrors.next(response.errorCode);
      }

      this.fitToJob.next(response.ok.jobsFit);
    } catch (e) {
      Logger.logError(e);
      this.pageErrors.next(ErrorCodes.GENERAL_ERROR);
    }
  }

  async fetchJobsPerSkill() {
    try {
      const response = await ApiCaller.fetch('/profile/v1/countjobsperskill', 'POST', { username: this.username });
      if (response.isError) {
        this.pageErrors.next(response.errorCode);
      }

      this.jobsPerSkill.next(response.ok.skills);
    } catch (e) {
      Logger.logError(e);
      this.pageErrors.next(ErrorCodes.GENERAL_ERROR);
    }
  }

  subscribeFitToJob(setter) {
    this.registerToUnsubscribe(this.fitToJob.subscribe(setter));
  }

  subscribeJobsPerSkill(setter) {
    this.registerToUnsubscribe(this.jobsPerSkill.subscribe(setter));
  }
}
