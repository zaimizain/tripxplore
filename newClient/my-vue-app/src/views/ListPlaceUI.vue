<template>
    <v-container>
        <!-- Add new post section -->
        <v-row no-gutters>
            
            <v-row no-gutters> </v-row>
 
          
          <v-btn class="mx-3 my-3" @click="openDialog">+</v-btn>


          <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Insert Location</span>
          </v-card-title>
          <v-form ref="form" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">      <v-card-text>
            <!-- Location Textfield -->
            <v-text-field v-model="locationClass.post.location" :rules="locationClass.rules" label="Location"></v-text-field>
            <!-- Place Textfield -->
            <v-text-field v-model="locationClass.post.placeName" :rules="locationClass.rules" label="Place Name"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="closeDialog" color="error">Cancel</v-btn>
            <v-btn @click="submitForm"  color="primary">Save</v-btn>
          </v-card-actions>
        </v-form>
    
        </v-card>
      </v-dialog>
  
            
        </v-row>
        

        <v-sheet>

 

<v-col class="pa-2" v-for="post in posts" :key="post._id">
    <v-card href="/placedetails">
    <v-card  class="mx-auto myp4" height="200" width="1000" :to="{  params: { id: post._id } }">
        
        <v-row> 
        <img  height="200" width="300" :src="`/images/${post.image}`" />
     
       <v-col><b class="text-h5">{{ post.location }} </b> 
        <v-col>{{ post.notes }}</v-col> <v-col>Located in {{ post.location }}</v-col></v-col>
       
        <v-btn color="red" text @click="removePost(post._id)">Delete</v-btn>
   
        </v-row>
    </v-card>
    </v-card>

    
    
</v-col>
</v-sheet>
     
    </v-container>
</template>

<script>
import placeClass from "../components/PlaceComponent/placeClass";
import pAPI from "../components/PlaceComponent/placeAPI";
import locationClass from "../components/LocationComponent/locationClass";

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
        };
    },

    async created() {
        this.fetchPosts(); // Fetch posts when the component is created
    },
    methods: {
        openDialog() {
        this.dialog = true;
      },
      closeDialog() {
        this.dialog = false;
      },
        async fetchPosts() {
            this.posts = await pAPI.getAllPlace();
        },
        async submitForm() {
    console.log("Submitting form...");
    try {
        // Validate the form
        const isValid = await this.$refs.form.validate();

        if (isValid) {
            // If the form is valid, submit the form
            await this.locationClass.submitForm();

            // After submitting the form, reset form data if the ref is defined
            if (this.$refs.form) {
                this.$refs.form.reset();
            }

            // Fetch posts again to update the list
            this.fetchPosts();

            // Optionally, display a success message or update component state
            console.log("Form submitted successfully!");
        } else {
            console.log("Form validation failed");
        }
    } catch (error) {
        // Log more details about the error
        console.error("Error in submitForm:", error);
    }
}
,
        async removePost(id) {
            const response = await pAPI.deletePlace(id);
            // Assuming you have a method to handle the navigation or display the message
            this.handleApiResponse(response);
            // After deleting, fetch posts again to update the list
            this.fetchPosts();
        },

        handleApiResponse(response) {
            // Check if the current route is different from the intended route
            const currentRoute = this.$router.currentRoute.name;
            const intendedRoute = "listplaceUI";

            try {
                if (currentRoute !== intendedRoute) {
                    // Navigate to the intended route
                    this.$router.push({ name: intendedRoute, params: { message: response.message } });
                } else {
                    // Handle the response differently if you are already on the intended route
                    // For example, update the component state or display a message
                    console.log("Already on the route. Handle the response here:", response);
                }
            } catch (error) {
                if (error.name !== "NavigationDuplicated") {
                    throw error;
                }
                // Handle duplicate navigation error here
            }
        },
    },
};
</script>
  
  

  