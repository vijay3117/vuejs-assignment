<template>
    <div id="all-products">
        <!-- <h1 class="col-6">Jobs List</h1>
         <p><button class="btn btn-primary" v-on:click="login">Create Jobs</button></p> -->
       
<div id="block_container">

    <div id="bloc1" class="float-left"  v-if="!isCreateJobs">
        <h1>Apply Jobs</h1>
    </div>  
    <div id="bloc2" class="create-jobs"  v-if="!isCreateJobs">
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
                        <td>
                          <a v-on:click="applyJob(index)" v-if="appliedJobsList.indexOf(index) === -1">Apply</a>
                          <p v-if="appliedJobsList.indexOf(index) !== -1">Applied</p>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <h4 v-if="!jobsList.length" class="text-center">No Jobs Found...</h4>
                
<!-- debug: sort={{currentSort}}, dir={{currentSortDir}} -->
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
                appliedJobsList: localStorage.getItem('applied-jobs') ? JSON.parse(localStorage.getItem('applied-jobs')) : [],
                jobsList: localStorage.getItem('jobs') ? JSON.parse(localStorage.getItem('jobs')) : []
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
            applyJob: function(index) {
              this.appliedJobsList.push(index);
              localStorage.setItem('applied-jobs' ,JSON.stringify(this.appliedJobsList));
              alert('Applied Successfully...');
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


</style>