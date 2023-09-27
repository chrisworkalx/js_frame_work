<script>
import { addClass, removeClass } from 'element-ui/src/utils/dom';

class Transition {
  constructor(props) {
    // console.log('props', props);
    this.on = {};
    this.initProps(props);
  }

  initProps(props = {}) {
    for (let key in props) {
      this.on[key] = props[key];
    }
    console.log('this.on', this.on);
  }
  beforeEnter(el) {
    console.log('beforeEnter');
    addClass(el, 'collapse-transition');
    if (!el.dataset) el.dataset = {};

    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;

    el.style.height = '0';
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
  }

  enter(el) {
    el.dataset.oldOverflow = el.style.overflow;
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px';
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    } else {
      el.style.height = '';
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }

    el.style.overflow = 'hidden';
  }

  afterEnter(el) {
    console.log('---afetr');
    // for safari: remove class then reset height is necessary
    removeClass(el, 'collapse-transition');
    el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
    if (this.on.afterEnter) {
      console.log('good');
      this.on.afterEnter();
    }
  }

  beforeLeave(el) {
    if (this.on.beforeLeave) {
      this.on.beforeLeave();
    }
    if (!el.dataset) el.dataset = {};
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.dataset.oldOverflow = el.style.overflow;

    el.style.height = el.scrollHeight + 'px';
    el.style.overflow = 'hidden';
  }

  leave(el) {
    if (el.scrollHeight !== 0) {
      // for safari: add class after set height, or it will jump to zero height suddenly, weired
      addClass(el, 'collapse-transition');
      el.style.height = 0;
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    }
  }

  afterLeave(el) {
    removeClass(el, 'collapse-transition');
    el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
    el.style.paddingTop = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;
  }
}

export default {
  name: 'CstCollapseTransition',
  functional: true,
  render(h, { children, listeners = {}, props = {} }) {
    // const data = {
    //   on: new Transition(listeners),
    //   ...props
    // };
    const data = {
      on: new Transition()
    };

    return h('transition', data, children);
  }
};
</script>
