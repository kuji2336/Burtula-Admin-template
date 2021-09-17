<template>
 <div class="container mx-auto mt-9">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col max-w-md w-full mx-auto">
        <div class="mb-4">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
             ელ.ფოსტა
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" v-model="email" id="username" type="text" placeholder="Username">
        </div>
        <div class="mb-6">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
             პაროლი
            </label>
            <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" v-model="password" id="password" type="password" placeholder="******************">
        </div>
        <div class="flex items-center justify-end">
            <button class="bg-red-800 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="button" @click="authUser">
            Sign In
            </button>
        </div>
    </div>
 </div>
</template>


<script>
import {signInWithEmailAndPassword } from "firebase/auth";
import { getAuths } from "@/db/firebase.js";
export default {
    data(){
        return{
            email: '',
            password:''

        }
    },
    methods:{
        authUser(){
            let auth = getAuths;
            signInWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
                const user = userCredential.user;
                if(user){
                    this.$router.push('/admin')
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
        }
    }
}
</script>