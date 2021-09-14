<template>
  <div class="container mx-auto bg-gray-800 mt-12 shadow-2xl rounded-3xl pb-5">
    <div class="flex px-8 flex-wrap">
      <div class="w-full mt-14">
         <p class="text-red-500 mb-3 font-bold">აირჩიეთ კატეგორია</p>
         <select name="cars" id="cars" class="w-full  px-4 pt-2 pb-2" v-model="selectedCategory">
            <option value="logobrand">Logo/Branding</option>
            <option value="socialmedia">Social Media/Graphic Design</option>
            <option value="animation">Animation</option>
            <option value="uiweb">UI/UX Design</option>
         </select>
      </div>
      <div class="w-full pt-4 pb-2 flex justify-between items-center">
         <div>
           <p class="text-red-500 mb-3 font-bold">აირჩიეთ პროექტის სურათი:</p>
           <input type="file" id="file" ref="authors" @change="handleAuthorsUpload()"/>
         </div>
         <div v-if="authorImagePaint">
            <img :src="authorImagePaint" height="200" width="200">
         </div>
      </div>
      <div class="w-full">
        <input
          type="text"
          class="
            w-full
            mt-14
            px-4
            pt-2
            pb-2
            shadow
            appearance-none
            border
            rounded
            outline-none
            placeholder-red-500
            font-bold
          "
          v-model="projectName"
          placeholder="პროექტის სათაური"
        />
      </div>
      <div class="w-full">
        <textarea
          type="text"
          class="
            w-full
            mt-14
            px-4
            pt-2
            pb-2
            shadow
            appearance-none
            border
            rounded
            outline-none
            placeholder-red-500
            font-bold
            h-40
          "
          v-model="projectDescription"
          placeholder="პროექტის აღწერა"
        />
      </div>
      <div class="flex justify-end py-5 w-full">
        <button @click="SaveData" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-52">შენახვა</button>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { db } from "@/db/firebase.js";
export default {
    data(){
        return{
            selectedCategory:'logobrand',
            authorImg:null,
            authorImagePaint:null,
            url:'',
            fields:'',
            downloadUrl:'',
            projectName:'',
            projectDescription:''

        }
    },

    methods:{
    async getSingleProjectData(){
      const docRef = doc(db, `${this.$route.query.category}`, `${this.$route.query.projectId}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.selectedCategory = this.$route.query.category;
        this.projectName = docSnap.data().project_name;
        this.projectDescription = docSnap.data().project_description;
        this.authorImagePaint = docSnap.data().img_url
      } else {
      console.log("No such document!");
      }
    },


    handleAuthorsUpload() {
        this.authorImg = this.$refs.authors.files[0];
        this.url = this.$refs.authors.files[0].name
        if (this.authorImg) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.authorImagePaint = e.target.result;
          };
          reader.readAsDataURL(this.authorImg);
        }
    },



    clearFrom(){
      this.projectName = '';
      this.projectDescription = '';
      this.authorImagePaint = '';
      this.selectedCategory = '';
    },

    SaveData(){
      const storage = getStorage();
      const storageRef = ref(storage, this.url);
      uploadBytes(storageRef, this.authorImg).then((snapshot) => {
      console.log('snapshotuploaded', snapshot);
      }).then(()=>{
        /* Save image */
        getDownloadURL(ref(storage, this.url))
          .then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
              const blob = xhr.response;
              console.log(blob);
              console.log(event);
            };
            xhr.open('GET', url);
            xhr.send();
            /* Save documetn data */
            addDoc(collection(db, `${this.selectedCategory}`), {
              project_name: this.projectName,
              project_description: this.projectDescription,
              img_url:url
            });
            this.clearFrom();
          })
          .catch((error) => {
            console.log(error);
          });
          this.$toast.success(`Hey! I'm here`,{
            position:'top',
            dismissible:false,
            duration:4000,
            message:`პროექტი წარმატებით დაემატა!`,
          });
      }).catch((error)=>{
        console.log(error);
      })
    },
    },

    mounted(){
      this.getSingleProjectData()
    }
}

</script>