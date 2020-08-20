import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import IconExpandMore from '../components/icons/IconExpandMore.vue'
import IconRadioChecked from '../components/icons/IconRadioChecked.vue'
Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    disable: true
  },
  icons: {
    iconfont: 'mdiSvg',
    values: {
      expandMore: {
        component: IconExpandMore,
      },
      radioChecked: {
        component: IconRadioChecked,
      },
    },
  }
});
