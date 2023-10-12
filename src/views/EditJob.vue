<template>
    <div class="container">
      <button class="tag tagb tagbutton" @click="gotoHome">Home</button>

      <h1>Edit Job</h1>
      <form class="job-form" @submit.prevent="editJob">
        <div class="form-group">
          <label for="company">Company:</label>
          <input class="form-control" type="text" id="company" v-model="jobData.company" required>
        </div>
        <div class="form-group">
          <label for="logo">Logo:</label>
          <input class="form-control" type="text" id="logo" v-model="jobData.logo" required>
        </div>
        <div class="form-group">
          <label for="position">Position:</label>
          <input class="form-control" type="text" id="position" v-model="jobData.position" required>
        </div>
        <div class="form-group">
          <label for="role">Role:</label>
          <input class="form-control" type="text" id="role" v-model="jobData.role" required>
        </div>
        <div class="form-group">
          <label for="level">Level:</label>
          <input class="form-control" type="text" id="level" v-model="jobData.level" required>
        </div>
        <div class="form-group">
          <label for="contract">Contract:</label>
          <input class="form-control" type="text" id="contract" v-model="jobData.contract" required>
        </div>
        <div class="form-group">
          <label for="location">Location:</label>
          <input class="form-control" type="text" id="location" v-model="jobData.location" required>
        </div>
        <div class="form-group">
          <label for="languages">Languages:</label>
          <input class="form-control" type="text" id="languages" v-model="jobData.languages" required>
        </div>
        <div class="form-group">
          <label for="tools">Tools:</label>
          <input class="form-control" type="text" id="tools" v-model="jobData.tools" required>
        </div>
        
        <button class="btn-submit" type="submit">Edit Job</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        jobData: {
          company: '',
          logo: '',
          position: '',
          role: '',
          level: '',
          postedAt: '',
          contract: '',
          location: '',
          languages: [],
          tools: [],
          jobId:null
        },
      };
    },
    methods: {
 async editJob() {
    const confirm =window.confirm('Are you sure you want to edit this job?')
      const token=localStorage.getItem('token')
    //   console.log('iddddd',this.jobId)
    if(confirm){
        try {
            const response = await axios.put(`http://localhost:4002/api/jobdata/${this.jobId}`, this.jobData, {
  headers: {
    Authorization: `Bearer ${token}`,
  }
});
       console.log('Job edit successfully:', response.data);
        } catch (error) {
            console.error('Error editing job:', error.response.data);
        }   
    }
      },
async getJobById(jobId){
    const token=localStorage.getItem('token')
    try {
            const response = await axios.get(`http://localhost:4002/api/jobdata/${jobId}`,{
  headers: {
    Authorization: `Bearer ${token}`,
  }
});
const data = response.data.jobsById[0];
       console.log(`Job with this Id(${jobId}):`, response.data);
       this.jobData= {
          company:data.company,
          logo : data.logo,
          position: data.position,
          role :data.role,
          level: data.level,
          postedAt: data.postedAt,
          contract :data.contract,
          location: data.location,
          languages :data.languages,
          tools:data.tools,
        }
        } catch (error) {
            console.error('Error feching job by Id:', error.response.data);
        }  
  },
  gotoHome(){
        this.$router.push('/')
    }
    },
    mounted() {
    const jobId = this.$route.query.jobId;
    console.log('Received jobId:', jobId);
    this.jobId=jobId
    this.getJobById(jobId);
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  
  h1 {
    margin-bottom: 20px;
  }
  
  .job-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 5px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    font-weight: bold;
    display: block;
    text-align: start;
  }
  
  .form-control {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .btn-submit {
    background-color: #5DA4A4;
    color: #fff;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
  
  .btn-submit:hover {
    background-color: #125a5a;
  }
  </style>