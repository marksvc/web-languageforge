import * as angular from 'angular';

import {ModalService} from '../../../../bellows/core/modal/modal.service';
import {LexiconUtilityService} from '../../core/lexicon-utility.service';
import {LexEntry} from '../../shared/model/lex-entry.model';
import {LexSense} from '../../shared/model/lex-sense.model';
import {LexConfigFieldList} from '../../shared/model/lexicon-config.model';
import {FieldControl} from './field-control.model';

export class FieldEntryController implements angular.IController {
  model: LexEntry;
  config: LexConfigFieldList;
  control: FieldControl;

  contextGuid: string = '';
  fieldName: string = 'entry';

  static $inject = ['$state', 'modalService'];
  constructor(private $state: angular.ui.IStateService, private modal: ModalService) {
  }

  $onInit(): void {
    for (const fieldName in this.config.fields) {
      if (this.config.fields.hasOwnProperty(fieldName)) {
        this.config.fields[fieldName].senseLabel = ['Entry'];
      }
    }
  }

  isAtEditorEntry(): boolean {
    return LexiconUtilityService.isAtEditorEntry(this.$state);
  }

  deleteEntry(): void {
    this.control.deleteEntry(this.control.currentEntry);
  }

  addSense($position: number): void {
    const newSense = {};
    this.control.makeValidModelRecursive(this.config.fields.senses, newSense, 'examples');
    if ($position === 0) {
      this.model.senses.unshift(newSense as LexSense);
    } else {
      this.model.senses.push(newSense as LexSense);
    }

    this.control.hideRightPanel();
  }

  deleteSense = (index: number): void => {
    const deletemsg = 'Are you sure you want to delete the meaning <b>\' ' +
      LexiconUtilityService.getMeaning(this.control.config, this.config.fields.senses as LexConfigFieldList,
        this.model.senses[index]) + ' \'</b>';
    this.modal.showModalSimple('Delete Meaning', deletemsg, 'Cancel', 'Delete Meaning')
      .then(() => {
        this.model.senses.splice(index, 1);
        this.control.saveCurrentEntry();
        this.control.hideRightPanel();
      }, () => {});
  }

}

export const FieldEntryComponent: angular.IComponentOptions = {
  bindings: {
    model: '=',
    config: '<',
    control: '<'
  },
  controller: FieldEntryController,
  templateUrl: '/angular-app/languageforge/lexicon/editor/field/dc-entry.component.html'
};
