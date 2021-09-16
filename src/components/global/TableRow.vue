<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="w-full relative">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                 პროექტის სახელი
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  პროექტის ლოგო
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  პროექტის აღწერა
                </th>
                <th scope="col" class="relative  text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  <span>რედაქტირება</span>
                </th>
                <th scope="col" class="relative text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  <span class="text-red-800">წაშლა</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(project,index) in tableData" :key="index">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ project.data.project_name }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                   <img :src="project.data.img_url" height="100" width="100">
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <p>{{project.data.project_description}}</p>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <router-link href="#" class="text-indigo-600 hover:text-indigo-900" 
                  :to='{name:"Admin", query:{category:$route.params.id, projectId:project.id}}'>
                  Edit
                  </router-link>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <p class="text-indigo-600 hover:text-indigo-900 cursor-pointer" @click="deletePr(project.id)">წაშლა</p>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="!tableData.length" class="flex justify-center w-full">
             <div>
               <h1 class="text-center font-bold text-red-600  text-lg mt-5">ჩანაწერები ვერ მოიძებნა!</h1>
               <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_CWcCII.json"  background="transparent"  speed="1"  style="width: 200px; height: 200px;"  loop  autoplay></lottie-player>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/db/firebase.js";
export default {
    props:{
        tableData:{
            type:Array
        }
    },

    methods:{
      async deletePr(projectId){
         try{
            let response =  await deleteDoc(doc(db, `${this.$route.params.id}`, projectId));
            this.refetchData()
            console.log(response);
            this.$toast.success(`Hey! I'm here`,{
            position:'top',
            dismissible:false,
            duration:4000,
            message:`პროექტი წარმატებით წაიშალა!`,
          });
         }catch(err){
            console.log(err);
            this.$toast.error(`Hey! I'm here`,{
            position:'top',
            dismissible:false,
            duration:4000,
            message:`მოხდა შეცდომა!`,
          });
         }
      },

      refetchData(){
        this.$emit('refetch')
      },

    }
}
</script>