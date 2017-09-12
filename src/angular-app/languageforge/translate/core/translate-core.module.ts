import * as angular from 'angular';

import { MachineService } from './machine.service';
import { RealTimeService } from './realtime.service';
import { TranslateProjectService } from './translate-project.service';
import { TranslateRightsService } from './translate-rights.service';

export const TranslateCoreModule = angular
  .module('translateCoreModule', [])
  .service('translateProjectApi', TranslateProjectService)
  .service('translateRightsService', TranslateRightsService)
  .service('machineService', MachineService)
  .service('realTimeService', RealTimeService)
  .name;
