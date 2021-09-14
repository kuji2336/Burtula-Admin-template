<template>
  <notifications position="top right" group="foo" classes="success-box" />
  <TheHeaderAdmin/>
  <router-view/>
</template>


<script>
import TheHeaderAdmin from '@/components/global/TheHeader.vue'
import './assets/tailwind.css'
export default {
   components:{
     TheHeaderAdmin
   },
}
</script>
<style>
  body, html{
    background-image: url('./assets/burtula.jpg');
    height: 100vh;
    background-position: center;
    background-size: contain;
  }

  .success-box{
    padding: 10px;
    text-align: center;
    border-radius: 12px;
    color: green;
    font-weight: 900;
  }
</style>