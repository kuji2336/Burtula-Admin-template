<template>
  <div
    class="container mx-auto bg-gray-800 mt-12 shadow-2xl rounded-3xl pb-5"
  >
    <div
      class="flex bg-red-800 w-full justify-between items-center px-12 h-10"
    >
      <li class="list-none cursor-pointer text-white font-bold">
        <router-link :to="`/projects/logobrand`"
          >Logo/Branding</router-link
        >
      </li>
      <li class="list-none cursor-pointer text-white font-bold">
        <router-link :to="`/projects/socialmedia`"
          >Social Media/Graphic Design</router-link
        >
      </li>
      <li class="list-none cursor-pointer text-white font-bold">
          <router-link :to="`/projects/animation`">
                  Animation
          </router-link>
      </li>
      <li class="list-none cursor-pointer text-white font-bold">
        <router-link :to="`/projects/uiweb`">
             UI/UX Design
        </router-link>
      </li>
    </div>
    <div class="p-5">
        <router-view  :key="$route.path"></router-view>
    </div>
  </div>
</template>