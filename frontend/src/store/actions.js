import { userService } from '@/service';

export default {
  loginRequest({ commit, dispatch }, { username, password }) {
    commit('setStatus', 'waitForLogin');
    commit('setUsername', username);
    userService.login(username, password)
    .then(res => {
      dispatch('loginSuccess', res.token);
    }, error => {
      dispatch('loginFailed', error);
    });
  },
  loginSuccess({ commit, dispatch }, token) {
    commit('clearStatus', 'waitForLogin');
    commit('clearStatus', 'loggingIn');
    commit('setToken', token);
    commit('notify', { type: 'success', message: 'Login Success' });
    dispatch('fetchUserInfo', localStorage.getItem('username'));
  },
  loginFailed({ commit }, error) {
    commit('clearStatus', 'waitForLogin');
    commit('clearStatus', 'loggingIn');
    commit('notify', { type: 'error', message: error });
  },
  registerRequest({ commit, dispatch }, { username, password, email, type, members }) {
    commit('setStatus', 'waitForRegister');
    userService.register(username, password, email, type.toLowerCase(), members)
    .then(() => {
      dispatch('registerSuccess');
    }, error => {
      dispatch('registerFailed', error);
    });
  },
  registerSuccess({ commit }) {
    commit('clearStatus', 'waitForRegister');
    commit('clearStatus', 'registering');
    commit('notify', { type: 'success', message: 'Sign up Success' });
  },
  registerFailed({ commit }, error) {
    commit('clearStatus', 'waitForRegister');
    commit('clearStatus', 'registering');
    commit('notify', { type: 'error', message: error });
  },
  fetchUserInfo({ commit, dispatch }, username) {
    userService.userinfo(username)
    .then(user => {
      commit('setUser', user);
    }, error => {
      commit('notify', { type: 'error', message: error });
    });
    dispatch('getAnnouncements');
  },
  logout({ commit }) {
    userService.logout();
    commit('clearAll');
  },
  deleteAnnouncement({ commit }, id) {
    commit('setStatus', 'waitForDeleteAnnouncement');
    userService.postAnnouncement(id, '', '', '', '') 
    .then(() => {
      commit('clearStatus', 'waitForDeleteAnnouncement');
    }, error => {
      commit('clearStatus', 'waitForDeleteAnnouncement');
      commit('notify', { type: 'error', message: error });
    });
  },
  postAnnouncement({ commit, dispatch }, { title, timestamp, author, content, id }) {
    commit('setStatus', 'waitForPostAnnouncement');
    userService.postAnnouncement(id, title, content, author, timestamp)
    .then(() => {
      commit('clearStatus', 'waitForPostAnnouncement');
      commit('clearStatus', 'postingAnnouncement');
      dispatch('getAnnouncements');
    }, error => {
      commit('clearStatus', 'waitForPostAnnouncement');
      commit('notify', { type: 'error', message: error });
    })
  },
  getAnnouncements({ commit }) {
    commit('setStatus', 'waitForGetAnnouncement');
    userService.getAnnouncements()
    .then(announcements => {
      for (let announcement of announcements) {
        announcement.show = false;
        announcement.timestamp *= 1000;
      }
      announcements.sort((lhs, rhs) => rhs.timestamp - lhs.timestamp);
      commit('setAnnouncements', announcements);
      commit('clearStatus', 'waitForGetAnnouncement');
    }, error => {
      commit('notify', { type: 'error', message: error });
    })
  }
};
