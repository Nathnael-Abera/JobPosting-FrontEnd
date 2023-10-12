<template>
    
    <div class="adduser-container">
      <button class="tag tagb tagbutton" @click="gotoHome">Home</button>
      <h2>Add User</h2>
      <form @submit.prevent="submitForm">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="userData.name" required>
        
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="userData.email" required>
        
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="userData.password" required>
        
        <label for="role">Role:</label>
        <select id="Role" v-model="userData.Role" required>
          <option value="" disabled>Select Role</option>
          <option value="candidate">Candidate</option>
          <option value="admin">Admin</option>
          <option value="super admin">Super Admin</option>
        </select>
        
        <button type="submit">Add User</button>
      </form>
    </div>
  </template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
     userData:{ 
        name: '',
      email: '',
      password: '',
    Role:''
}
    };
  },
  methods: {
   async submitForm() {
        const confirm =window.confirm('Are you sure you want to add this User?')
      const token=localStorage.getItem('token')
    //   console.log(token,this.jobData)
    if(confirm){
        console.log(this.userData)
        try {
            const response = await axios.post('http://localhost:4002/api/users', this.userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
            });
       console.log('user added successfully:', response.data);
        this.userData= {
        name: '',
        email: '',
        password: '',
        Role:''
        }
        } catch (error) {
            console.error('Error adding user:', error);
        }   
    }
    },
    gotoHome(){
        this.$router.push('/')
    }
  },
};
</script>

<style scoped>
   .adduser-container {
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
  input[type="text"],
  input[type="email"],
  input[type="password"],
  #Role {
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
    margin-top: 15px;
    cursor: pointer;
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