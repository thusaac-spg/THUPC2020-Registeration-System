<template>
  <v-app>
    <Navbar />
    <v-main>
      <router-view />

      <v-snackbar
        top
        timeout = '2000'
        v-model = 'notify'
        :color = 'notification.type'
        >
        <p class = 'text-center pa-0 ma-0'>{{notification.message}}</p>
      </v-snackbar>

    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar';
import { mapState } from 'vuex';

export default {
  name: 'App', 
  components: {
    Navbar,
  },
  computed: {
    ...mapState(['notification']),
    notify: {
      get() {
        return this.notification.show;
      },
      set(value) {
        this.$store.commit('toggleNotification', value);
      }
    }
  }
};
</script>
