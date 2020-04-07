import Component from 'can/component/component';
import Map from 'can/map/map';
import 'can/map/define/';
import './top.less!';
import template from './top.stache!';

export const ViewModel = Map.extend({
  define: {
    modals: {
      value: []
    },
    currentIndex: {
      value: 1
    },
    currentLeft: {
      value: 50
    },
    currentTop: {
      value: 50
    }
  },
  openModal() {
    let tempArr = [].reduce.call(
      this.attr('modals'),
      function(a, b) {
        return a.zIndex > b.zIndex ? a : b
      },
      {zIndex: -1}
    );
    this.attr("currentIndex", tempArr.zIndex + 1);
    this.attr("currentLeft", this.attr("currentLeft")+25);
    this.attr("currentTop", this.attr("currentTop")+25);
    this.attr('modals').push(
      {
        id: Math.floor(Math.random() * 2000),
        zIndex: this.attr("currentIndex"),
        left: this.attr("currentLeft"),
        top: this.attr("currentTop"),
        width: 400,
        height: 200,
        minWidth: 300,
        minHeight: 120,
        maxWidth: 900,
        maxHeight: 800,
        classes: []
      }
    );
  },
  addClass(modal, toAdd) {
    modal.attr('classes').push(toAdd);
    modal.attr('classes', modal.attr('classes').filter((value, index, self) => self.indexOf(value) === index));
  },
  removeClass(modal, toRemove) {
    modal.attr('classes', modal.attr('classes').filter(e => e !== toRemove));
  },
});

export default Component.extend({
  tag: 'tabletop-top',
  viewModel: ViewModel,
  template: template,
  events: {
    'mousedown': function (something, event) {
      this.currentModalID = $(event.target).closest(".modal").attr('id');
      let modal = this.viewModel.attr('modals').filter(e => e.id === this.currentModalID)[0];
      let $closestResize = $(event.target).closest(".resize");

      if ($closestResize.hasClass('north-resize')) {
        this.hasNorthResize = true;
        this.startY = event.screenY;
        this.viewModel.addClass(modal, 'is-dragging');
      } else if ($closestResize.hasClass('south-resize')) {
        this.hasSouthResize = true;
        this.startY = event.screenY;
        this.viewModel.addClass(modal, 'is-dragging');
      } else if ($closestResize.hasClass('east-resize')) {
        this.hasEastResize = true;
        this.startX = event.screenX;
        this.viewModel.addClass(modal, 'is-dragging');
      } else if ($closestResize.hasClass('west-resize')) {
        this.hasWestResize = true;
        this.startX = event.screenX;
        this.viewModel.addClass(modal, 'is-dragging');
      } else if ($closestResize.hasClass('nw-resize')) {
        this.hasNWResize = true;
        this.startY = event.screenY;
        this.startX = event.screenX;
        this.viewModel.addClass(modal, 'is-dragging');
      } else if ($closestResize.hasClass('ne-resize')) {
        this.hasNEResize = true;
        this.startY = event.screenY;
        this.startX = event.screenX;
        this.viewModel.addClass(modal, 'is-dragging');
      } else if ($closestResize.hasClass('se-resize')) {
        this.hasSEResize = true;
        this.startY = event.screenY;
        this.startX = event.screenX;
        this.viewModel.addClass(modal, 'is-dragging');
      } else if ($closestResize.hasClass('sw-resize')) {
        this.hasSWResize = true;
        this.startY = event.screenY;
        this.startX = event.screenX;
        this.viewModel.addClass(modal, 'is-dragging');
      } else if ($closestResize.hasClass('drag-modal')) {
        this.hasDragModal = true;
        this.startY = event.screenY;
        this.startX = event.screenX;
        this.viewModel.addClass(modal, 'is-dragging');
      }
    },
    'mousemove': function(something, event) {
      let $tabletop = $('.tabletop');
      let modal = this.viewModel.attr('modals').filter(e => e.id === this.currentModalID)[0];
      let newTop, newLeft, newWidth, newHeight;
      let tabletopHeight = $tabletop.height(), tabletopWidth = $tabletop.width();

      if (typeof modal !== 'undefined') {
        if (!modal.attr('maxHeight') || modal.attr('maxHeight') === 0) modal.attr('maxHeight', tabletopHeight);
        if (!modal.attr('maxWidth') || modal.attr('maxWidth') === 0) modal.attr('maxWidth', tabletopWidth);

        if (this.hasNorthResize) {
          newTop = modal.attr('top') - (this.startY - event.screenY);
          newHeight = modal.attr('height') + (this.startY - event.screenY);
          if (newHeight >= modal.attr('minHeight')) {
            console.log(newTop);
            modal.attr('top', (newTop > 0 ? (newHeight <= modal.attr('maxHeight') ? newTop : modal.attr('top')) : 0));
            modal.attr('height', (newHeight <= modal.attr('maxHeight') ? (newTop > 0 ? newHeight : modal.attr('height')) : modal.attr('maxHeight')));
            if (newTop > 0 && newHeight <= modal.attr('maxHeight')) this.startY = event.screenY;
          }
        } else if (this.hasSouthResize) {
          newHeight = modal.attr('height') - (this.startY - event.screenY);
          if (newHeight >= modal.attr('minHeight')) {
            modal.attr('height', (newHeight <= modal.attr('maxHeight') ? newHeight : modal.attr('maxHeight')));
            if (newHeight <= modal.attr('maxHeight')) this.startY = event.screenY;
          }
        } else if (this.hasEastResize) {
          newWidth = modal.attr('width') - (this.startX - event.screenX);
          if (newWidth >= modal.attr('minWidth')) {
            modal.attr('width', (newWidth <= modal.attr('maxWidth') ? newWidth : modal.attr('maxWidth')));
            if (newWidth <= modal.attr('maxWidth')) this.startX = event.screenX;
          }
        } else if (this.hasWestResize) {
          newLeft = modal.attr('left') - (this.startX - event.screenX);
          newWidth = modal.attr('width') + (this.startX - event.screenX);
          if (newWidth >= modal.attr('minWidth')) {
            modal.attr('left', (newLeft > 0 ? (newWidth <= modal.attr('maxWidth') ? newLeft : modal.attr('left')) : 0));
            modal.attr('width', (newWidth <= modal.attr('maxWidth') ? (newLeft > 0 ? newWidth : modal.attr('width')) : modal.attr('maxWidth')));
            if (newLeft > 0 && newWidth <= modal.attr('maxWidth')) this.startX = event.screenX;
          }
        } else if (this.hasNWResize) {
          newLeft = modal.attr('left') - (this.startX - event.screenX);
          newWidth = modal.attr('width') + (this.startX - event.screenX);
          newTop = modal.attr('top') - (this.startY - event.screenY);
          newHeight = modal.attr('height') + (this.startY - event.screenY);
          if (newWidth >= modal.attr('minWidth')) {
            modal.attr('left', (newLeft > 0 ? (newWidth <= modal.attr('maxWidth') ? newLeft : modal.attr('left')) : 0));
            modal.attr('width', (newWidth <= modal.attr('maxWidth') ? (newLeft > 0 ? newWidth : modal.attr('width')) : modal.attr('maxWidth')));
            if (newLeft > 0 && newWidth <= modal.attr('maxWidth')) this.startX = event.screenX;
          }
          if (newHeight >= modal.attr('minHeight')) {
            modal.attr('top', (newTop > 0 ? (newHeight <= modal.attr('maxHeight') ? newTop : modal.attr('top')) : 0));
            modal.attr('height', (newHeight <= modal.attr('maxHeight') ? (newTop > 0 ? newHeight : modal.attr('height')) : modal.attr('maxHeight')));
            if (newTop > 0 && newHeight <= modal.attr('maxHeight')) this.startY = event.screenY;
          }
        } else if (this.hasNEResize) {
          newWidth = modal.attr('width') - (this.startX - event.screenX);
          newTop = modal.attr('top') - (this.startY - event.screenY);
          newHeight = modal.attr('height') + (this.startY - event.screenY);
          if (newWidth >= modal.attr('minWidth')) {
            modal.attr('width', (newWidth <= modal.attr('maxWidth') ? newWidth : modal.attr('maxWidth')));
            if (newWidth <= modal.attr('maxWidth')) this.startX = event.screenX;
          }
          if (newHeight >= modal.attr('minHeight')) {
            modal.attr('top', (newTop > 0 ? (newHeight <= modal.attr('maxHeight') ? newTop : modal.attr('top')) : 0));
            modal.attr('height', (newHeight <= modal.attr('maxHeight') ? newHeight : modal.attr('maxHeight')));
            if (newTop > 0 && newHeight <= modal.attr('maxHeight')) this.startY = event.screenY;
          }
        } else if (this.hasSEResize) {
          newWidth = modal.attr('width') - (this.startX - event.screenX);
          newHeight = modal.attr('height') - (this.startY - event.screenY);
          if (newWidth >= modal.attr('minWidth')) {
            modal.attr('width', (newWidth <= modal.attr('maxWidth') ? newWidth : modal.attr('maxWidth')));
            if (newWidth <= modal.attr('maxWidth')) this.startX = event.screenX;
          }
          if (newHeight >= modal.attr('minHeight')) {
            modal.attr('height', (newHeight <= modal.attr('maxHeight') ? newHeight : modal.attr('maxHeight')));
            if (newHeight <= modal.attr('maxHeight')) this.startY = event.screenY;
          }
        } else if (this.hasSWResize) {
          newLeft = modal.attr('left') - (this.startX - event.screenX);
          newWidth = modal.attr('width') + (this.startX - event.screenX);
          newHeight = modal.attr('height') - (this.startY - event.screenY);
          if (newWidth >= modal.attr('minWidth')) {
            modal.attr('left', (newLeft > 0 ? (newWidth <= modal.attr('maxWidth') ? newLeft : modal.attr('left')) : 0));
            modal.attr('width', (newWidth <= modal.attr('maxWidth') ? newWidth : modal.attr('maxWidth')));
            if (newLeft > 0 && newWidth <= modal.attr('maxWidth')) this.startX = event.screenX;
          }
          if (newHeight >= modal.attr('minHeight')) {
            modal.attr('height', (newHeight <= modal.attr('maxHeight') ? newHeight : modal.attr('maxHeight')));
            if (newHeight <= modal.attr('maxHeight')) this.startY = event.screenY;
          }
        } else if (this.hasDragModal) {
          newLeft = modal.attr('left') - (this.startX - event.screenX);
          newTop = modal.attr('top') - (this.startY - event.screenY);

          modal.attr('left', (newLeft > 0 ? newLeft : 0));
          if (newLeft > 0) this.startX = event.screenX;
          modal.attr('top', (newTop > 0 ? newTop : 0));
          if (newTop > 0) this.startY = event.screenY;
        }
      }
    },
    'mouseup': function() {
      let modal = this.viewModel.attr('modals').filter(e => e.id === this.currentModalID)[0];
      if (typeof modal !== 'undefined') this.viewModel.removeClass(modal, 'is-dragging');

      if (this.hasNorthResize) {
        this.hasNorthResize = false;
      } else if (this.hasSouthResize) {
        this.hasSouthResize = false;
      } else if (this.hasEastResize) {
        this.hasEastResize = false;
      } else if (this.hasWestResize) {
        this.hasWestResize = false;
      } else if (this.hasNWResize) {
        this.hasNWResize = false;
      } else if (this.hasNEResize) {
        this.hasNEResize = false;
      } else if (this.hasSEResize) {
        this.hasSEResize = false;
      } else if (this.hasSWResize) {
        this.hasSWResize = false;
      } else if (this.hasDragModal) {
        this.hasDragModal = false;
      }
    },
    'mouseleave': function() {
      let modal = this.viewModel.attr('modals').filter(e => e.id === this.currentModalID)[0];
      if (typeof modal !== 'undefined') this.viewModel.removeClass(modal, 'is-dragging');

      if (this.hasNorthResize) {
        this.hasNorthResize = false;
      } else if (this.hasSouthResize) {
        this.hasSouthResize = false;
      } else if (this.hasEastResize) {
        this.hasEastResize = false;
      } else if (this.hasWestResize) {
        this.hasWestResize = false;
      } else if (this.hasNWResize) {
        this.hasNWResize = false;
      } else if (this.hasNEResize) {
        this.hasNEResize = false;
      } else if (this.hasSEResize) {
        this.hasSEResize = false;
      } else if (this.hasSWResize) {
        this.hasSWResize = false;
      } else if (this.hasDragModal) {
        this.hasDragModal = false;
      }
    }
  }
});