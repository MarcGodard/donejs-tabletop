import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './modal.less!';
import template from './modal.stache!';

export const ViewModel = Map.extend({
  define: {
    title: {
      value: 'Title of Modal'
    },
    classes: {
      value: []
    }
  },
  openModal() {
    this.attr('modal.classes', this.attr('modal.classes').filter(e => e !== 'closing'));
    this.attr('modal.classes').push('opening');
  },
  closeModal() {
    this.attr('modal.classes', this.attr('modal.classes').filter(e => e !== 'opening'));
    this.attr('modal.classes').push('closing');
    setTimeout(() => this.attr('modals', this.attr('modals').filter(e => e.id !== this.attr('modal.id'))), 300);
  },
  focusModal() {
    let tempArr = [].reduce.call(
      this.attr('modals'),
      function(a, b) {
        return a.zIndex > b.zIndex ? a : b
      },
      {zIndex: -1}
    );
    this.attr('modal.zIndex', tempArr.zIndex + 1);
  }
});

export default Component.extend({
  tag: 'tabletop-modal',
  viewModel: ViewModel,
  template: template,
  events: {
    inserted() {
      setTimeout(() => {
        this.viewModel.openModal();
      }, 0);
    },
    '.modal mousedown': function() {
      this.viewModel.focusModal();
    }
  }
});