<template>

  <v-row
    class = 'fill-height'
    align = 'center'
    justify = 'center' 
    >

    <vue-headful
      title = 'THUPC2021 报名系统'
      >
    </vue-headful>

    <v-col>

    <v-card
      v-if = 'isLoggedIn'
      width="800px"
      class = 'mx-auto'
      >

      <v-card-title
        class = 'primary--text'
        >
        报名信息
      </v-card-title>

      <v-card-text
        class = 'pb-0'
        >

        <v-container
          v-if = 'this.$store.state.user'
          >

          <v-form v-model = 'isFormValid'>

          <v-row>

            <v-col
              cols = '12'
              class = 'py-0'
              >

              <v-tabs>

                <v-tab>队伍基本信息</v-tab>
                <v-tab>队员 1</v-tab>
                <v-tab>队员 2</v-tab>
                <v-tab>队员 3</v-tab>

                <v-tabs-slider></v-tabs-slider>

                <v-tab-item
                  class = 'mt-5'
                  eager
                  >

                  <v-text-field
                    label = '队伍名称'
                    prepend-icon = "mdi-account-group"
                    :value = 'username'
                    readonly
                    >
                  </v-text-field>

                  <v-select
                    prepend-icon = "mdi-compare-vertical"
                    :value = 'type'
                    label = '队伍类型'
                    :items = '["A", "B", "C"]'
                    readonly
                    >
                  </v-select>

                  <p class = 'text-caption'>
                    A 类：队伍中的所有选手都为清华大学在校学生 <br />
                    B 类：队伍中的所有选手都为大学在校学生，但存在不是清华大学在校学生的选手 <br />
                    C 类：其他队伍
                  </p>

                </v-tab-item>

                <v-tab-item
                  class = 'mt-5'
                  eager
                  v-for = '(member, index) in members'
                  :key = 'index'
                  >

                  <v-row
                    align="center"
                    justify="center"
                    >

                    <v-col
                      cols = 12
                      class = 'py-0'
                      >
                      <v-text-field
                        label = '队员姓名'
                        prepend-icon = "mdi-account"
                        v-model = 'member.name'
                        :rules = '[rules.rangeLength(2, 10)]'
                        readonly
                        >
                      </v-text-field>
                    </v-col>

                    <v-col
                      cols = 10
                      class = 'py-0'
                      >
                      <v-text-field
                        label = '电子邮箱'
                        prepend-icon="mdi-email"
                        v-model = 'member.email'
                        :rules = '[rules.checkEmail]'
                        >
                      </v-text-field>
                    </v-col>

                    <v-col
                      cols = 2
                      class = 'py-0'
                      >

                      <v-btn
                        v-if = 'emailStatus[member.email] == "verified"'
                        text
                        readonly 
                        color = 'primary'
                        >
                        已验证
                      </v-btn>


                      <v-btn
                        v-else-if = 'emailStatus[member.email] == "waiting"'
                        text
                        color = 'secondary'
                        @click = 'handleEmail(member.email)'
                        >
                        已发送验证码
                      </v-btn>

                      <v-btn
                        v-else-if = 'emailStatus[member.email] == "waitForResponse"'
                        text
                        loading
                        >
                        加载中
                      </v-btn>

                      <v-btn
                        v-else
                        text
                        color = 'error'
                        @click = 'verifyEmail(member.email)'
                        >
                        尚未验证
                      </v-btn>


                    </v-col>

                    <v-col
                      cols = 12
                      class = 'py-0'
                      >
                      <v-text-field
                        label = '就读学校'
                        prepend-icon = "mdi-school"
                        v-model = 'member.school'
                        :rules = '[rules.rangeLength(2, 100)]'
                        readonly
                        >
                      </v-text-field>
                    </v-col>

                    <v-col
                      cols = 12
                      class = 'py-0'
                      >
                      <v-text-field
                        prepend-icon = "mdi-phone"
                        label = '电话号码'
                        v-model = 'member.phone'
                        >
                      </v-text-field>
                    </v-col>

                    <v-col
                      cols = 12
                      class = 'py-0'
                      >
                      <v-text-field
                        prepend-icon = "mdi-google-maps"
                        label = '收货地址'
                        v-model = 'member.location'
                        >
                      </v-text-field>
                    </v-col>

                    <v-col
                      cols = 12
                      class = 'py-0'
                      >
                      <v-select
                        :items = "['Male', 'Female']"
                        label = '性别'
                        prepend-icon = "mdi-gender-male-female"
                        v-model = 'member.gender'
                        >
                      </v-select>
                    </v-col>

                  </v-row>

                </v-tab-item>

              </v-tabs>

            </v-col>

          </v-row>

          </v-form>

        </v-container>

      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn 
          text 
          :disabled = '!isFormValid' 
          @click = 'editProfile( members )' 
          color = 'primary' 
          :loading = 'waitForEditingProfile'>
          更新个人信息
        </v-btn>
      </v-card-actions>

    </v-card>

    </v-col>
    <HandleEmailDialog />
  </v-row>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import HandleEmailDialog from '@/components/HandleEmailDialog';

export default {
  name: 'Profile',
  components: {
    HandleEmailDialog,
  },
  data() {
    return {
      isFormValid: false,
      waitForGettingEmailStatus: false,
      username: '',
      type: 'A',
      members: [
        {
          name: '',
          school: '',
          gender: 'Male',
          email: '',
          phone: '',
          location: '',
        },
        {
          name: '',
          school: '',
          gender: 'Male',
          email: '',
          phone: '',
          location: '',
        },
        {
          name: '',
          school: '',
          gender: 'Male',
          email: '',
          phone: '',
          location: '',
        },
      ],
      rules: {
        rangeLength(lowerbound, upperbound) {
          return function(value) {
            if (lowerbound <= value.length && value.length <= upperbound)
              return true;
            return `The length should be between ${lowerbound} and ${upperbound}`;
          }
        },
        sameWith(thisValue) {
          return function(value) {
            if (value && value == thisValue)
              return true;
            return `Confirmed password not match`;
          } 
        },
        checkEmail(value) {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid e-mail.';
        },
      }
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
    ...mapState(['user', 'emailStatus']),
    waitForEditingProfile() {
      return Boolean(this.$store.state.status.waitForEditingProfile);
    }
  },
  methods: {
    ...mapActions(['editProfile', 'verifyEmail', 'handleEmail']),
  },
  created() {
    if (this.$store.getters.isLoggedIn)
      this.$store.dispatch('fetchUserInfo', localStorage.getItem('username'));
  },
  watch: {
    user() {
      if (this.$store.state.user) {
        this.username = this.$store.state.user.teamname;
        if (this.$store.state.user.type)
          this.type = this.$store.state.user.type.toUpperCase();
        for (let i = 0; i < 3; i++) {
          this.members[i].name = this.$store.state.user.members[i].name;
          this.members[i].email = this.$store.state.user.members[i].email;
          this.members[i].phone = this.$store.state.user.members[i].phone;
          this.members[i].school = this.$store.state.user.members[i].school;
          this.members[i].gender = this.$store.state.user.members[i].gender;
          this.members[i].location = this.$store.state.user.members[i].location;
        }
        for (let member of this.members) 
          this.$store.dispatch('updateMemberEmailStatus', member.email);
      }
    }
  }
}
</script>
