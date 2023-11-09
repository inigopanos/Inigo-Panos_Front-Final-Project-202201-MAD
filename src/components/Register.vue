<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleSubmit" class="register-card">
      <div class="form-group">
        <label for="userName">
          <input type="text" v-model="user.userName" id="userName" name="userName" placeholder="Nombre de usuario"/>
        </label>
        <div v-show="submitted && !user.userName" class="invalid-feedback">Campo requerido</div>
      </div>

      <div class="form-group">
        <label for="password">
          <input type="password" v-model="user.password" name="password" placeholder="Contraseña"/></label
        >
        <div v-show="submitted && !user.password" class="invalid-feedback">Campo requerido</div>
      </div>

      <!-- <div class="form-group">
        <label for="isAdmin">
          <input type="text" id="isAdmin" name="isAdmin" placeholder="Administrador / true / false"/>
        </label> 
        <div v-show="submitted && !user.isAdmin" class="invalid-feedback">Campo requerido</div>
      </div> -->
      
      <div class ="register-succesful" v-show="submitted && user.userName && user.password">
        Usuario registrado correctamente
      </div>
      
      <div>
        <button class="btn-register">Registro</button>
      </div>
      <div class="form-group">
        <router-link to="/login" class="btn btn-link">Login</router-link> |
        <router-link to="/" class="btn btn-link">Cancelar</router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';

export default defineComponent({
  name: 'register-form',
  data() {
    return {
      user: {
        userName: '',
        password: '',
        isAdmin: false,
      },
      submitted: false,
    };
  },
  computed: {
    ...mapState('account', ['status']),
  },
  methods: {
    ...mapActions('account', ['register']),
    handleSubmit() {
      this.submitted = true;
      if (this.user.userName !== undefined && this.user.password !== undefined) {
        // Mostrar en pantalla que se ha registrado el usuario de forma exitosa. 
        setTimeout(() => 1000);
        this.register(this.user);
      }
    },
  },
});
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;

  text-decoration: none;
  list-style-type: none;
  // width: 100%;
  // height: 100%;
}

.register-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn-register{
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
  .invalid-feedback{
    background-color: rgb(252, 102, 102);
    background-size: 1rem;
    width: 9.3rem;
    border-radius: 5px;
    border-width: 0;
    margin-top: 1rem;
    padding: 10px 12px;
  }
</style>
