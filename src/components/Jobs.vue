<template>
<div>
  <div class="container">
    <div id="search" :class="['search', { 'search--hidden': isSearchHidden }]">
      <div class="search__content" id="search-content" v-for="tag in search" :key="tag">
        <span @click="removeFromSearch(tag)" class="close-tag">{{tag}}</span>
      </div>

      <button @click="clearSearch" id="clear" class="search__clear">
        Clear
      </button>
    </div>
    <div class="tagb"  v-if = "data.Role == 'super admin'||data.Role == 'admin'">
      <button class="tag tagbutton" @click="gotoHome">Home</button>
      <button class="tag tagbutton" @click="addUser" v-if = "data.Role == 'super admin'">Add User</button>
      <button class="tag tagbutton" @click="addJob">Add Job</button>
    </div>

    <div class="jobs" id="jobs">
       <div v-for="jobData in jobLists" :key="jobData._id" :class="['jobs__item', jobData.postedAt === '1d ago' ? 'border-left' : '']">
            <div class="jobs__column jobs__column--left">
                <img src={{jobData.logo}} :alt="jobData.company" class="jobs__img" />
                <div class="jobs__info">
                    <span class="jobs__company">
                    {{ jobData.company }}
                    <span v-if="jobData.postedAt === '2d ago' || jobData.postedAt === '1d ago'" class="jobs__new">NEW!</span>
                    <span v-if="jobData.postedAt === '1d ago'" class="jobs__featured">FEATURED</span>
                    </span>
                    <span class="jobs__title">{{jobData.position}}</span>
                    
                    <ul class="jobs__details">
                        <li class="jobs__details-item">{{jobData.postedAt}}</li>
                        <li class="jobs__details-item">{{jobData.contract}}</li>
                        <li class="jobs__details-item">{{jobData.location}}</li>
                    </ul>
                </div>
            </div>
            <div class="jobs__column jobs__column--right">
                <span @click="addToSearch(tag)" class="tag" v-for="tag in getTagsForJob(jobData)" :key="tag">{{ tag }}</span>
            </div>  
    <div class="jobs__edit" v-if = "data.Role == 'super admin'||data.Role == 'admin'">
      <button class="tag jobs__edit-btn " @click="editJob(jobData._id)">Edit Job</button>
      <button class="tag jobs__edit-btn" @click="DeleteJob(jobData._id,jobData.position)">Delete Job</button>
    </div>
        </div>

    </div>
    <div class="pages">
      <button class="tag jobs__edit-btn" @click="prevPage">perv</button>
      <button class="tag jobs__edit-btn" @click="nextPage">next</button>
    </div>
    
  </div>
</div>
  
</template>

<script>
import { ref, computed } from 'vue';
import {useRoute, useRouter } from 'vue-router';
import axios from 'axios';
export default {  
  
  setup() {
const jobsListings =ref([])
    const search =ref([])
    const data=ref({})
    const router = useRouter();
    let currentPage=1
    let totalPage = 1
    
    const getTotalPage=async()=>{
      const token=localStorage.getItem('token')
      // console.log(token)
      try {
        const response = await axios.get(`http://localhost:4002/api/jobdata/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Process the response data here
    response.data.length
     totalPage=Math.round(response.data.length/5);
    // console.log('length', response.data.length)
    // console.log('pages',totalPage)
      } catch (error) {
        console.log(error)
      }
    }
    getTotalPage()

   const prevPage=()=> {
    if (currentPage > 1) {
      currentPage--;
      jobDataListning(currentPage);
    }
  }
 const nextPage=() =>{
    if (currentPage < totalPage) {
      currentPage++;
      jobDataListning(currentPage);
    }
  }

  const jobDataListning=async(page)=>{
      const token=localStorage.getItem('token')
      // console.log(token)
      try {
        const response = await axios.get(`http://localhost:4002/api/jobdata?perPage=5&page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Process the response data here
     jobsListings.value = response.data;
    // console.log(jobsListings.value)

      } catch (error) {
        console.log(error)
      }
    }
    jobDataListning(currentPage);
    const admin=async()=>{
      const token=localStorage.getItem('token')
      // console.log(token)
      try {
        const response = await axios.get('http://localhost:4002/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Process the response data here
     data.value = response.data;
  
    
    // console.log(data.value)
 
      } catch (error) {
        console.log(error)
      }
    }
    admin();
    const addJob =()=>{
      router.push('/add-job');
      // console.log('clicked start Adding Job')
    }
    const addUser =()=>{
      router.push('/add-user');
      // console.log('clicked start Adding User')
    }
    const editJob = (jobId) => {
    router.push({
    path: '/edit-job',
    query: { jobId: jobId }
  });
}
const gotoHome =()=>{
    router.push('/')
  }
    const DeleteJob =async (jobId,position)=>{
   
      const token=localStorage.getItem('token')
      // console.log(token)
      // console.log('clicked,Are you sure want to Delete',jobId)
      const confirmed = window.confirm(`Are you sure you want to delete ${position} job?`);
      if (confirmed) {
      try {
      const response = await axios.delete(`http://localhost:4002/api/jobdata/${jobId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('clicked,Are you sure want to Delete',jobId)
    window.location.reload();
      } 
      catch (error) {
        console.log(error)
      }
    }
    }
    const getTagsForJob = (jobData) => {
      let jobTags = [
        jobData.role,
        jobData.level,
        ...(jobData.languages || []),
        ...(jobData.tools || [])
      ];
    //   console.log(jobTags)
      return Array.from(new Set(jobTags));
    };
    const addToSearch = (tag) => {
      if (!search.value.includes(tag)) {
        search.value.push(tag);
      }
    // //  console.log(jobLists)
    //   console.log(search.value)
    };
    const removeFromSearch = (tag) => {
      const index = search.value.indexOf(tag);
      if (index !== -1) {
        search.value.splice(index, 1);
      }
    };

    const clearSearch = () => {
      search.value = [];
    };
    const isSearchHidden = computed(() => {
      return search.value.length === 0;
    });
    const isEditHidden =computed(()=>{

    })
    const jobLists = computed(() => {
      return jobsListings.value.filter((jobData) => {
        const jobTags = getTagsForJob(jobData);
        return search.value.every((tag) => jobTags.includes(tag));
      });
    });


    return {
      jobsListings,
      jobLists,
      search,
      isSearchHidden,
      data,
      getTagsForJob,
      addToSearch,
      clearSearch,
      removeFromSearch,
      admin,
     jobDataListning,
      editJob,
      DeleteJob,
      addJob,
      addUser,prevPage,nextPage
    };
  }  
};
</script>

<style>
:root {
    --highlight-color: #5DA4A4;
    --very-dark-color: hsl(180, 14%, 20%);
}
.container {
    max-width: 1110px;
    width: auto;
    display: block;
    margin: 0 auto;
    padding: 0 40px 40px;
}
.search {
    width: 100%;
    height: auto;
    min-height: 70px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 10px 15px -7px rgba(93,164,164,0.5);
    padding: 20px 40px;
    box-sizing: border-box;
    margin-top: -75px;
    opacity: 1;
    display: flex;
    justify-content: space-between;
    transition: opacity 1s;
}

.search--hidden {
    opacity: 0;
}

.search__clear {
    margin-left: 50px;
    background-color: transparent;
    border: none;
    font-size: 14px;
    color: var(--highlight-color);
    font-weight: 700;
    outline: none;
    cursor: pointer;
}

.search__clear:hover {
    text-decoration: underline;
}

.jobs {
    margin-top: 36px;
    width: 100%;
    height: auto;
    display: grid;
    grid-row-gap: 25px;
}

.jobs__item {
    width: 100%;
    height: auto;
    padding: 35px 40px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 10px 15px -7px rgba(93,164,164,0.5);
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
}
.border-left {
    border-left: 8px solid #5DA4A4; /* Replace with your desired border style */
}

.jobs__column {
    display: flex;
    align-items: center;
}

.jobs__img {
    width: 90px;
    height: 90px;
    background-color: #5DA4A4;
    border-radius: 50%;
}

.jobs__info {
    margin-left: 25px;
    width: auto;
}

.jobs__company {
    color: #40A5A4;
    font-size: 14px;
    display: block;
    font-weight: 700;
    margin-bottom: 15px;
    padding-right: 20px;
}
.jobs__featured{
    background-color: var(--very-dark-color);
    color: #fff;
    margin: 0 15px;
    font-size:9px;
    border-radius: 10px;
    padding: 6px;
}
.jobs__new{
    background-color: var(--highlight-color);
    color: #fff;
    margin-left:15px;
    font-size:10px;
    border-radius: 10px;
    padding: 4px;
}
.jobs__title {
    color: var(--very-dark-color);
    font-size: 18px;
    font-weight: 700;
    display: block;
    margin-bottom: 15px;
}

.jobs__details {
    margin: 0;
    padding: 0;
}

.jobs__details-item {
    display: inline-block;
    color: hsl(180, 8%, 52%);
    font-size: 15px;
}

.jobs__details-item::after {
    content: "";
    width: 3px;
    height: 3px;
    border-radius: 3px;
    background-color: hsl(180, 8%, 52%);
    display: inline-block;
    margin: 5px 15px;
}

.jobs__details-item:last-child::after {
    display: none;
}
.jobs__edit{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tag, .close-tag {
    display: inline-block;
    width: auto;
    height: auto;
    padding: 10px 15px;
    border-radius: 5px;
    background-color: hsl(180, 31%, 95%);
    font-weight: 700;
    font-size: 14px;
    color: var(--highlight-color);
    margin: 7.5px 5px;
    cursor: pointer;
    transition: background-color 0.2s;
    position: relative;
    border: none;
}

.close-tag {
    padding-right: 45px;
}
.tagb{
  position: absolute;
  top: 10px;
  left: 20px;

  /* border: none; */
}
.close-tag::after {
    content: "";
    display: block;
    width: 35px;
    height: 100%;
    background-color: var(--highlight-color);
    position: absolute;
    right: 0;
    top: 0;
    background-image: url('../image/icon-remove.svg');
    background-position: center;
    background-size: 15px;
    background-repeat: no-repeat;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

.tag:hover, .tag--active {
    background-color: var(--highlight-color);
    color: #fff;
}
.jobs__edit-btn{
  background-color: var(--highlight-color);
  color: #fff;
}
.jobs__edit-btn:hover{
  background-color: #ABABAB;
  color: var(--highlight-color);
}
.tagbutton:hover{
  background-color: black;
}

.close-tag:hover::after {
    background-color: var(--very-dark-color);
}
.pages{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;
  height: 100px;
}

@media (max-width: 1120px) {
    .search {
        margin-bottom: 50px;
    }

    .search__clear {
        margin-left: 20px;
    }

    .jobs {
        grid-row-gap: 50px;
    }

    .jobs__item {
        flex-wrap: wrap;
    }

    .jobs__info {
        margin-left: 0;
        width: 100%;
    }

    .jobs__column {
        justify-content: flex-start;
        flex: 0 1 100%;
        flex-wrap: wrap;
    }

    .jobs__column--left {
        border-bottom: #ABABAB solid 1px;
        margin-bottom: 20px;
        padding-bottom: 20px;
    }

    .jobs__column--right {
        width: 100%;
        justify-content: flex-start;
        flex: 0 1 100%;
        flex-wrap: wrap;
        margin-left: -5px;
    }

    .jobs__img {
        width: 70px;
        height: 70px;
        margin-top: calc(-35px - 25px);
        margin-bottom: 20px;
        background-color: #5DA4A4;
        border-radius: 50%;
    }
}@media (max-width: 768px){
    .header {
    background-image: url('../images/bg-header-mobile.svg');
}
}

</style>