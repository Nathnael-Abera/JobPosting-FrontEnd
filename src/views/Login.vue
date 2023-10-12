<template>
<div>
  <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model.trim="email"
            :class="{ 'is-invalid': errors.email }"
          />
          <div class="invalid-feedback" v-if="errors.email">{{ errors.email }}</div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model.trim="password"
            :class="{ 'is-invalid': errors.password }"
          />
          <div class="invalid-feedback" v-if="errors.password">{{ errors.password }}</div>
        </div>
        <div class="invalid-feedback" v-if="errors.invalid">{{ errors.invalid }}</div>

        <button type="submit">Login</button>
      </form>
    </div>
</div>
    
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    data() {
      return {
        email: 'NathnaelAbera21@gmail.com',
        password: '12345678',
        errors: {}
      };
    },
    methods: {
      isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
    navigateToHome() {
      this.$router.push('/');
    },
    async submitForm() {
        this.errors = {};
        try {
        const response = await axios.post('http://localhost:4002/api/users/login', {
          email: this.email,
          password: this.password,
        });
        // const name =name;
        localStorage.setItem('token', response.data.token);
        this.navigateToHome();
        console.log(response.data);
      } catch (error) {
        // Handle login error
        this.errors = {};
         if (!this.email) {
            this.errors.email = 'Email is required.';
          } else if (!this.isValidEmail(this.email)) {
            this.errors.email = 'Invalid email format.';
          }
          if (!this.password) {
            this.errors.password = 'Password is required.';
          }
          else{
            this.errors.invalid=error.response.data.msg
          }
        console.error(this.errors);
      }
      },
    }
  };
  </script>
  
  <style>
  .login-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .form-group {
    margin-bottom: 10px;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button[type="submit"] {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #5DA4A4;
    color: white;
    border: none;
    border-radius: 4px;
  }
  
  button[type="submit"]:hover {
    background-color: #125a5a;
  }
  
  .is-invalid {
    border-color: red;
  }
  
  .invalid-feedback {
    color: red;
    font-size: 14px;
  }
  </style>