<template>
  <div>
    <TableRow :tableData="projectData" @refetch="getCollectionData" :key="Date.now()"/>
  </div>
</template>

<script>
import { collection, getDocs} from "firebase/firestore";
import { db } from "@/db/firebase.js";
import TableRow from '@/components/global/TableRow'
export default {
  components:{
    TableRow
  },
  data(){
      return{
          projectData:[],
      }
  },
  methods: {
    async getCollectionData() {
      const querySnapshot = await getDocs(collection(db, `${this.$route.params.id}`));
      querySnapshot.forEach((doc) => {
        if(doc.data()){
          this.projectData.push({data:doc.data(), id:doc.id})
        }else{
          this.projectData = []
        }
      });
    },
  },


   beforeRouteUpdate(to, from, next) {
    this.projectData = []
    console.log(to);
    console.log(from);
    // Call the API query method when the URL changes
    this.getCollectionData()
    next()
  },

  mounted(){
    this.getCollectionData();
  },
};
</script>