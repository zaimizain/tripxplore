<template>
  <v-container>
    <v-col class="pa-2 my-3" :key="post._id">
      <v-card class="mx-auto" width="300">
        <v-img
          :src="`/images/${post.image}`"
          height="300px"
          width="1000px"
          cover
        ></v-img>
        <v-card-title>{{ post.location }}</v-card-title>
        <v-card-subtitle>
          Located in {{ post.location }}
          <v-spacer></v-spacer>
          Created on {{ post.created }}
        </v-card-subtitle>

       
    <v-card-actions>
        
        <v-card-title>Activity</v-card-title>
    
          <v-spacer></v-spacer>
    
          <v-btn
            @click="show = !show"
            :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
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
              <v-btn  :icon="show2 ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show2 = !show2">
                
    </v-btn>
              
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
                :icon="show3 ? 'mdi-chevron-up' : 'mdi-chevron-down'"
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
                :icon="show4 ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              > </v-btn>
              
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
                :icon="show5 ? 'mdi-chevron-up' : 'mdi-chevron-down'"
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

        <v-btn color="green" @click="editPost(post._id)">Edit</v-btn>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import pAPI from "../components/PlaceComponent/placeAPI";

export default {
  data() {
    return {
      post: {
        // Initialize with default values or an empty object if needed
      },
      show: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
    };
  },

  async created() {
    const postId = this.$route.params.id;

    if (postId) {
      try {
        this.post = await pAPI.getPlaceByID(postId);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }
  },

  methods: {
    async fetchPost(id) {
  try {
    const post = await pAPI.getPlaceByID(id);
    console.log("Fetched Post:", post);
    this.posts = [post];
  } catch (error) {
    console.error("Error fetching post:", error);
  }
},

    async updatePost(id) {
      try {
        const response = await pAPI.updatePlace(id);
        this.handleApiResponse(response);
        this.fetchPost(id);
      } catch (error) {
        console.error("Error updating post:", error);
      }
    },

    editPost(id) {
      this.$router.push({ name: "updateplace", params: { id } });
    },

    // ... rest of your methods ...
  },
};
</script>
