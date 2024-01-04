<template>
    <v-container>
       
<v-col class="pa-2 my-3" v-for="post in posts" :key="post._id">
  
   
    <v-card
    class="mx-auto"
    max-width="700"
  >
    <v-img
    :src="`/${post.image}`"
      height="500px"
      width="700px"
      cover
    ></v-img>
   <v-btn class="mx-3 my-2">Add to itinerary</v-btn>
   <v-card-title>
        {{ post.location }}
    </v-card-title>
    <v-card-subtitle>
       Located in {{ post.location }}
       <v-spacer></v-spacer>
       Located in {{ post.created }}
    </v-card-subtitle>


    <v-card-actions>
        
    <v-card-title>Activity</v-card-title>

      <v-spacer></v-spacer>

      <v-btn
        @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-divider></v-divider>
    <v-expand-transition>
      <div v-show="show">

        <v-card-text>
            {{ post.activities }} 
        </v-card-text>
      </div>
    </v-expand-transition>

    <v-card-actions>
        
        <v-card-title>What to Expect?</v-card-title>
    
          <v-spacer></v-spacer>
    
          <v-btn
            @click="show2 = !show2"
          >  </v-btn>
          
        </v-card-actions>
    
        <v-divider></v-divider>
        <v-expand-transition>
            
          <div v-show="show2">
    
            <v-card-text>
                {{ post.expect }} 
            </v-card-text>
          </div>
        </v-expand-transition>
        <v-card-actions>
        
        <v-card-title>Age Restriction</v-card-title>
    
          <v-spacer></v-spacer>
    
          <v-btn
            @click="show3 = !show3"
          >  </v-btn>
          
        </v-card-actions>
    
        <v-divider></v-divider>
        <v-expand-transition>
            
          <div v-show="show3">
    
            <v-card-text>
                {{ post.age }}+ Years Old
            </v-card-text>
          </div>
        </v-expand-transition>
        <v-card-actions>
        
        <v-card-title>Notes</v-card-title>
    
          <v-spacer></v-spacer>
    
          <v-btn
            @click="show4 = !show4"
          >  </v-btn>
          
        </v-card-actions>
    
        <v-divider></v-divider>
        <v-expand-transition>
            
          <div v-show="show4">
    
            <v-card-text>
                {{ post.notes }}
            </v-card-text>
          </div>
        </v-expand-transition>
          <v-card-actions>
        
        <v-card-title>Budget</v-card-title>
    
          <v-spacer></v-spacer>
    
          <v-btn
            @click="show5= !show5"
          >  </v-btn>
          
        </v-card-actions>
    
        <v-divider></v-divider>
        <v-expand-transition>
            
          <div v-show="show5">
    
            <v-card-text>
                {{ post.budget }}
            </v-card-text>
          </div>
        </v-expand-transition>
  </v-card>

  
    
</v-col>


     
    </v-container>
</template>

<script>
import placeClass from "@/components/PlaceComponent/placeClass";
import pAPI from "../components/PlaceComponent/placeAPI";
import locationClass from "@/components/LocationComponent/locationClass";



export default {

    data() {
        const router = this.$router; // Store the router instance in a variable
        const validateForm = () => this.$refs.form.validate();
        const pushRoute = (routeName, params) => this.$router.push({ name: routeName, params });
        
     
        return {
            placeClass: new placeClass({ router }),
            locationClass: new locationClass({ validateForm, pushRoute, router }),
            posts: [],
            dialog: false,
            show: false,
            show2: false,
            show3: false,
            show4: false,
            show5: false,
        };
    },

    async created() {
        this.fetchPosts(); // Fetch posts when the component is created
    },
    methods: {
        async fetchPosts() {
            this.posts = await pAPI.getAllPlace();
        },
    },
};
</script>
  
  
