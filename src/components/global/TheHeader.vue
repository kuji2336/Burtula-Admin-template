<template>
<nav class="bg-gray-800">
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <div class="relative flex items-center justify-between h-16">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <!-- Mobile menu button-->
        <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        <div class="flex-shrink-0 flex items-center">
           <p class="text-red-500 text-4xl font-bold cursor-pointer"><router-link :to="`${ !user ? '/' : '/admin'}`">Burtula Admin</router-link></p>
        </div>
        <div class="hidden sm:block sm:ml-6" v-if="user">
          <div class="flex space-x-5">
            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
            <router-link to="/admin" class="text-gray-300 hover:bg-gray-700 hover:text-white px-5 py-3 rounded-md text-lg font-medium">პროექტების დამატება</router-link>
            <router-link to="/projects" class="text-gray-300 hover:bg-gray-700 hover:text-white px-5 py-3 rounded-md text-lg font-medium">პროექტები</router-link>
          </div>
        </div>
      </div>
      <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0" v-if="user">
        <!-- Profile dropdown -->
        <div class="ml-3 relative">
          <div @mouseenter="showDropdown">
            <button type="button" class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span class="sr-only">Open user menu</span>
              <img class="h-8 w-8 rounded-full" :src="require('@/assets/user.png')" alt="">
            </button>
          </div>

          <div @mouseleave="hideDropdown" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1" :class="[menuIsVisiable ? 'visivle' : 'hidden']">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2" @click="singOutUser">Sign out</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="sm:hidden" id="mobile-menu">
    <div class="px-2 pt-2 pb-3 space-y-1">
      <a href="#" class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Dashboard</a>

      <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>

      <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>

      <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a>
    </div>
  </div>
</nav>
</template>


<script>
import {signOut, onAuthStateChanged} from "firebase/auth";
import { getAuths} from "@/db/firebase.js";
export default {
    data(){
        return{
            user:'',
            menuIsVisiable:false,
        }
    },

    methods:{
       showDropdown(){
           this.menuIsVisiable = true
       },

       hideDropdown(){
           this.menuIsVisiable = false
       },

       singOutUser(){
          const auth = getAuths;
          signOut(auth).then(() => {
             this.$router.push('/')
          }).catch((error) => {
            console.log(error);
          });
       },

       getUserState2(){
        const auth = getAuths;
        onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = true;
        }else{
           this.user = false;
        }
        });
       }
    },


    watch:{
      $route(){
        this.getUserState2()
      }
    }
}
</script>
