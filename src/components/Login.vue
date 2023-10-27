<template>
  <div class="login-register">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="userName">
          <input
            type="text"
            placeholder="Nombre de usuario"
            id="userName"
            v-model="userName"
            name="userName"
            class="form-control"
            :class="{ 'is-invalid': submitted && !userName }"
          /></label
        >
        <div v-show="submitted && !userName" class="invalid-feedback">Campo requerido</div>
      </div>
      <div class="form-group">
        <label for="password">
          <input
            id="password"
            placeholder="Contraseña"
            type="password"
            v-model="password"
            name="password"
            class="form-control"
            :class="{ 'is-invalid': submitted && !password }"
          />
        </label>
        <div v-show="submitted && !password" class="invalid-feedback">Campo requerido
        </div>
      </div>
      <div class="texts">
        <button class="btn-login" type="submit">Login</button>
      </div>
      <div class="texts">
        |
        <router-link to="/register" class="btn btn-link">Register</router-link>
        |
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';

export default defineComponent({
  name: 'login-form',
  data() {
    return {
      userName: '',
      password: '',
      submitted: false,
    };
  },
  computed: {
    ...mapState('account', ['status']),
  },
  mounted() {
    const id = localStorage.getItem('id');
    localStorage.setItem('id', '');
  },
  methods: {
    ...mapActions('account', ['login', 'logout']),
    handleSubmit() {
      this.submitted = true;
      const { userName, password } = this;
      if (userName && password) {
        this.login({ userName, password });
      }
    },
  },
});
</script>
<style lang="scss">
.login-register {
  input,
  input::before,
  input::after {
    box-sizing: border-box;
  }

  input {
    border: none;
    -webkit-appearance: none;
    -ms-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: #f2f2f2;
    padding: 12px;
    border-radius: 3px;
    width: 250px;
    font-size: 14px;
  }

  h2 {
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    .form-group {
      margin-top: 1rem;
      margin-bottom: 1rem;
      margin-right: 1rem;
      margin-left: 1rem;
    }
  }
}
.texts {
  // display: flex;
  // justify-content: space-evenly;
  padding-top: 4rem;
  padding-left: 3rem;
  padding-right: 3rem;

  .btn-login{
    background-color: #85d273b8;
    border-radius: 8px;
    border-width: 0;
    color: #4a8452;
    cursor: pointer;
    display: inline-block;
    font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    list-style: none;
    margin: 0;
    padding: 10px 12px;
    text-align: center;
    transition: all 200ms;
    vertical-align: baseline;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }
}



</style>
