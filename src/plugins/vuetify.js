import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
// don't forget to import CSS styles
import 'tiptap-vuetify/dist/main.css'
// Vuetify's CSS styles 
import 'vuetify/dist/vuetify.min.css'
const vuetify = new Vuetify()
Vue.use(Vuetify);

Vue.use(TiptapVuetifyPlugin, {
    vuetify,
    iconsGroup: 'mdi'
});

export default new Vuetify({
    icons: {
        iconfont: 'mdi'
    }
});
