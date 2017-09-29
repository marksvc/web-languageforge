import * as angular from 'angular';

import { UserService } from '../../../core/api/user.service';
import { SessionService } from '../../../core/session.service';
import { UserWithPassword } from '../../../shared/model/user-password.model';

class UserSignup extends UserWithPassword {
  captcha?: string;
}

class ZxcvbnPasswordStrength {
  score: number;
}

export class SignupAppController implements angular.IController {
  showPassword = false;
  emailValid = true;
  emailProvided = false;
  submissionInProgress = false;
  emailExists = false;
  takenEmail = '';
  passwordIsWeak = false;
  passwordStrength = new ZxcvbnPasswordStrength();
  captchaData = '';
  captchaFailed = false;
  record = new UserSignup();
  hostname: string;

  static $inject = ['$scope', '$location', '$window',
    'userService', 'sessionService'];
  constructor(private $scope: any, private $location: angular.ILocationService,
              private $window: angular.IWindowService,
              private userService: UserService, private sessionService: SessionService) {}
  
  $onInit() {
    this.record.id = '';
    this.record.password = '';

    // Parse for email if given
    const email = this.$location.search().e;
    if (email !== undefined && email.length > 0) {
      this.record.email = decodeURIComponent(email);
      this.emailProvided = true;
    }

    this.sessionService.getSession().then((session) => {
      // signup app should only show when no user is present (not logged in)
      if (angular.isDefined(session.userId())) {
        this.$window.location.href = '/app/projects';
      }
    });

    this.hostname = this.$window.location.hostname;

    // we need to watch the passwordStrength score because zxcvbn seems to be changing the score
    // after the ng-change event.  Only after zxcvbn changes should we validate the form
    this.$scope.$watch(() => { return this.passwordStrength.score; }, () => {
      this.validateForm();
    });

    this.getCaptchaData();
  }

  validateForm() {
    this.emailValid = this.$scope.signupForm.email.$pristine ||
      ((this.$scope.signupForm.email.$dirty || this.emailProvided) &&
        !this.$scope.signupForm.$error.email);

    if (angular.isDefined(this.record.password)) {
      this.passwordIsWeak = this.passwordStrength.score < 2 ||
        this.record.password.length < 7;
    }
  }

  processForm() {
    this.registerUser((url: string) => {
      this.$window.location.href = url;
    });
  }

  private getCaptchaData() {
    this.sessionService.getCaptchaData((result) => {
      if (result.ok) {
        this.captchaData = result.data;
        this.record.captcha = null;
      }
    });
  }

  private registerUser(successCallback: (url: string) => void) {
    this.captchaFailed = false;
    this.submissionInProgress = true;
    this.userService.register(this.record, (result) => {
      if (result.ok) {
        switch (result.data) {
          case 'captchaFail':
            this.captchaFailed = true;
            this.getCaptchaData();
            break;
          case 'emailNotAvailable':
            this.emailExists = true;
            this.takenEmail = this.record.email.toLowerCase();
            this.$scope.signupForm.email.$setPristine();
            break;
          case 'login':
            successCallback('/app/projects');
            break;
        }
      }

      this.submissionInProgress = false;
    });
  }
}

export const SignupAppComponent: angular.IComponentOptions = {
  controller: SignupAppController,
  templateUrl: '/angular-app/bellows/apps/public/signup/signup-app.component.html'
};