<template>
    <div id="all-products">
        <h1>Login</h1>

       

        <div class="form-group">
            <input type="text" name="username" v-model="username" placeholder="Please enter username" class="form-control" >

            <div v-if="isError" class="error">Please provide valid username</div>
        </div>

         <p><button class="btn btn-primary" v-on:click="login">Login</button></p>
    </div>
</template>

<script>
import VueRouter from 'vue-router'
const { isNavigationFailure, NavigationFailureType } = VueRouter;
    // import router from '../router';
    export default{
        data(){

            if (localStorage.getItem('isLoggedIn')) {
                 this.$router.push({ name: 'jobs' });
            }
            return{
                username : '',
                isError: false
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
             login: function (message){
                 this.isError = false;
                if (this.username === 'recruiter@screel.in' || this.username === 'candidate@screel.in') {
                    localStorage.setItem('isLoggedIn', true);
                    localStorage.setItem('loggedUser', this.username);
                    if (this.username === 'candidate@screel.in') {
                        this.$router.push({ name: 'applyJobs' });
                    } else {
                        this.$router.push({ name: 'jobs' });
                    }
                } else {
                    this.isError = true;
                }
            }
        }
    }
</script>

<style scoped>
    .error {
        color: red;
    }
</style>