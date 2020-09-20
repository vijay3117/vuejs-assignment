<template>
    <div id="all-products">
        <!-- <h1 class="col-6">Jobs List</h1>
         <p><button class="btn btn-primary" v-on:click="login">Create Jobs</button></p> -->
         <!-- <p><button class="btn btn-primary" v-on:click="logout">Logout</button></p> -->
       
<div id="block_container">

    <div id="bloc1" class="float-left"  v-if="!isCreateJobs">
        <h1>Jobs List</h1>
    </div>  
    <div id="bloc2" class="create-jobs"  v-if="!isCreateJobs">
        <button class="btn btn-primary" v-on:click="createJobs">Create Jobs</button>
        <button class="btn btn-danger" v-on:click="logout">Logout</button>
    </div>

</div>
        <div class="form-group" v-if="!isCreateJobs">
            
                 <table id="jobs">
                    <thead>
                    <tr>
                        <th>Organization Name</th>
                        <th>Skills</th>
                        <th>Desgination</th>
                        <th>Experience</th>
                        <th>Salary</th>
                        <th>Degree</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(job, index)  in jobsList">
                        <td>{{job.orgName}}</td>
                        <td>{{job.skills}}</td>
                        <td>{{job.designation}}</td>
                        <td>{{job.experience}}</td>
                        <td>{{job.salary}}</td>
                        <td>{{job.degree}}</td>
                        <td><a v-on:click="edit(job, index)">Edit</a>/<a v-on:click="deleteJob(index)">Delete</a></td>
                    </tr>
                    </tbody>
                </table>
                <h4 v-if="!jobsList.length" class="text-center">No Jobs Found...</h4>
                
<!-- debug: sort={{currentSort}}, dir={{currentSortDir}} -->
        </div>


    <!-- Create Jobs -->
     <div class="form-group" v-if="isCreateJobs">

        <form
  id="app"
  @submit="checkForm"
  method="post"
>

  <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors" class="error">{{ error }}</li>
    </ul>
  </p>

  <p>
    <label for="name">Organization Name</label>
    <input
      id="name"
      v-model="jobsObj.orgName"
      type="text"
      name="name"
    >
  </p>

  <p>
    <label for="name">Skill Sets</label>
    <input
      id="skills"
      v-model="jobsObj.skills"
      type="text"
      name="skills"
    >
  </p>

  <p>
    <label for="name">Designation</label>
    <input
      id="designation"
      v-model="jobsObj.designation"
      type="text"
      name="designation"
    >
  </p>


  <p>
    <label for="name">Degree</label>
    <input
      id="degree"
      v-model="jobsObj.degree"
      type="text"
      name="degree"
    >
  </p>

  <p>
    <label for="age">Experience</label>
    <input
      id="experience"
      v-model="jobsObj.experience"
      type="text"
      name="experience"
      min="0"
    >
  </p>

    <p>
    <label for="age">Salary</label>
    <input
      id="salary"
      v-model="jobsObj.salary"
      type="text"
      name="salary"
      min="0"
    >
  </p>

  <p>
    <input
      type="submit"
      value="Submit"
    >
  </p>

</form>
     </div>

    </div>
</template>

<script>
import VueRouter from 'vue-router'
const { isNavigationFailure, NavigationFailureType } = VueRouter;
    // import router from '../router';
    export default{
        data(){
            if (localStorage.getItem('isLoggedIn')) {
                const userName = localStorage.getItem('loggedUser');
                if (userName === 'recruiter@screel.in') {
                    this.$router.push({ name: 'jobs' });
                } else {
                    this.$router.push({ name: 'applyJobs' });
                }
            } else {
                this.$router.push({ name: 'login' });
            }
            return{
                errors: [],
                editIndex: null,
                isCreateJobs: false,
                currentSort:'name',
                currentSortDir:'asc',
                jobsList: localStorage.getItem('jobs') ? JSON.parse(localStorage.getItem('jobs')) : [],
                jobsObj: {
                    orgName: '',
                    skills: '',
                    designation: '',
                    experience: '',
                    salary: '',
                    degree: ''
                }
            }
        },

        created: function()
        {
            this.fetchProductData();
        },

        methods: {
            fetchProductData: function()
            {
            },
            deleteJob: function(index) {
                this.jobsList.splice(index , 1);
                 localStorage.setItem('jobs', JSON.stringify(this.jobsList));
            },
            edit: function(params, index) {
                console.log(params, index);
                this.editIndex = index;
                this.isCreateJobs = true;
                this.jobsObj = params;
            },
            createJobs: function() {
                this.isCreateJobs = true;
            },
            checkForm: function (e) {
                const errorsList = ['orgName', 'skills', 'designation', 'salary', 'degree'];
                const errorsName = ['Organization name', 'Skill sets', 'Designation', 'Salary', 'Degree'];
                this.errors = [];
                for(let i=0; i < errorsList.length; i++) {
                    if (!this.jobsObj[errorsList[i]]) {
                        this.errors.push(errorsName[i] + ' is required');
                    }
                }

                if (!this.errors.length) {
                    const jobs = localStorage.getItem('jobs');
                    if (this.editIndex === null) {
                        this.addJobs(jobs);
                    } else {
                        if (jobs) {
                            const editJobs = JSON.parse(jobs);
                            editJobs.splice(this.editIndex, 1, this.jobsObj);
                            localStorage.setItem('jobs', JSON.stringify(editJobs));
                             this.isCreateJobs = false;   
                             this.jobsObj = {
                                orgName: '',
                                skills: '',
                                designation: '',
                                experience: '',
                                salary: '',
                                degree: ''
                             }
                        } else {
                            this.addJobs(jobs);
                        }
                    }
                }
                e.preventDefault();
            },
            addJobs: function(jobs) {
                let jobsLists = [];
                if (jobs) {
                    jobsLists = JSON.parse(jobs);
                    jobsLists.push(this.jobsObj);
                } else {
                    jobsLists.push(this.jobsObj);
                }
                localStorage.setItem('jobs', JSON.stringify(jobsLists));

                this.jobsList = jobsLists;
                this.isCreateJobs = false;   
                this.jobsObj = {
                    orgName: '',
                    skills: '',
                    designation: '',
                    experience: '',
                    salary: '',
                    degree: ''
                }
            },
            logout: function() {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('loggedUser');
                this.$router.push({ name: 'login' })
            }
        }
    }
</script>

<style scoped>
    .error {
        color: red;
    }

    #jobs {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    }

    #jobs td, #jobs th {
    border: 1px solid #ddd;
    padding: 8px;
    }

    #jobs tr:nth-child(even){background-color: #f2f2f2;}

    #jobs tr:hover {background-color: #ddd;}

    #jobs th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #4CAF50;
        color: white;
    }
    a {
        cursor: pointer;
    }
    #block_container
    {
        text-align:center;
    }
    #bloc1, #bloc2
    {
        display:inline;
    }
    .create-jobs {
        float: right;
        margin-top: 30px;
    }
    .float-left {
        float: left;
    }

    /** Form Css **/
    
input[type=text], input[type=number], select, textarea {
  width: 100%;
  padding: 7px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

label {
  padding: 7px 7px 7px 0;
  display: inline-block;
}

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

input[type=submit]:hover {
  background-color: #45a049;
}

</style>