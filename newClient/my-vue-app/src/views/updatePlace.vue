<template>
  <v-container>
    <!-- Add new post section -->
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-2">
          <v-card-title class=" text-center">Update Place</v-card-title>
         
          <v-form ref="form" @submit.prevent="updateForm(this.$route.params.id)" class="pa-5" enctype="multipart/form-data">
            <v-text-field v-model="placeClass.post.activities" label="Activities" prepend-icon="mdi-note" outlined
            class="my-5"  density="compact" variant="solo" single-line hide-details></v-text-field>
            <v-text-field v-model="placeClass.post.location" label="Location" prepend-icon="mdi-map-marker" outlined
            class="my-5"  density="compact" variant="solo" single-line hide-details></v-text-field>
            <v-text-field v-model="placeClass.post.expect" label="Expectations" prepend-icon="mdi-account-question" outlined
            class="my-5"  density="compact" variant="solo" single-line hide-details></v-text-field>
            <v-text-field v-model="placeClass.post.age" label="Age Restriction" prepend-icon="mdi-human-child" outlined
            class="my-5" :loading="loading" density="compact" variant="solo" single-line hide-details></v-text-field>
            <v-text-field v-model="placeClass.post.notes" label="Notes" prepend-icon="mdi-note-text" outlined
            class="my-5"  density="compact" variant="solo" single-line hide-details></v-text-field>
            <v-text-field v-model="placeClass.post.budget" label="Budget" prepend-icon="mdi-currency-usd" outlined
               class="my-5" :loading="loading" density="compact" variant="solo" single-line hide-details></v-text-field>

               

            <v-file-input @change="selectFile" show-size counter prepend-icon="mdi-image-plus" multiple label="Select Image"  class="my-5"  density="compact" variant="solo" single-line hide-details></v-file-input>

            <v-img :key="placeClass.post.image" :src="`/${placeClass.post.image}`"  ></v-img>

            <v-row justify="center" >
              <v-btn type="submit"
                color="primary"
                rounded
                >Update</v-btn>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


  
  
<script>
import placeClass from "../components/PlaceComponent/placeClass";
import pAPI from "../components/PlaceComponent/placeAPI";
import API from "../api";

export default {
    data() {
        const router = this.$router; // Store the router instance in a variable
        const validateForm = () => this.$refs.form.validate();
        const pushRoute = (routeName, params) => this.$router.push({ name: routeName, params });
       

        return {
            placeClass: new placeClass({ validateForm, pushRoute, router }),
            image: [],
            posts: [],
        };
    },

    async created() {
        const response = await pAPI.getPlaceByID(this.$route.params.id);
        this.placeClass.post = response;
        
    },
    methods: {
        async fetchPosts() {
            this.posts = await pAPI.getAllPlace();
        },
        selectFile(event) {
            console.log("Selected file:", event.target.files[0]);
            this.placeClass.selectFile(event.target.files[0]);
        },

//         async updateForm(id) {
//     console.log("Submitting form...");
//     try {
//         // Validate the form
//         const isValid = await this.$refs.form.validate();

//         if (isValid) {
//             // If the form is valid, submit the form
//             await this.placeClass.updateForm(id);

//             // After submitting the form, reset form data if the ref is defined
//             if (this.$refs.form) {
//                 this.$refs.form.reset();
//             }

//             // Fetch posts again to update the list
//             this.fetchPosts();

//             // Optionally, display a success message or update component state
//             console.log("Form submitted successfully!");
//         } else {
//             console.log("Form validation failed");
//         }
//     } catch (error) {
//         // Log more details about the error
//         console.error("Error in updateForm:", error);
//     }
// },

        async removePost(id) {
            const response = await pAPI.deletePlace(id);
            // Assuming you have a method to handle the navigation or display the message
            this.handleApiResponse(response);
            // After deleting, fetch posts again to update the list
            this.fetchPosts();
        },
        async updateForm(id) {
            console.log("Updating place with ID:", id);
            
            const formData = new FormData();
            formData.append('image', this.placeClass.image);
        formData.append("activities", this.placeClass.post.activities);
        formData.append("location", this.placeClass.post.location);
        formData.append("expect", this.placeClass.post.expect);
        formData.append("age", this.placeClass.post.age);
        formData.append("notes", this.placeClass.post.notes);
        formData.append("budget", this.placeClass.post.budget);
        formData.append("old_image", this.placeClass.post.image);

        if(this.$refs.form.validate()){
                const response = await API.updatePost(id, formData);
                console.log(response);
                this.$router.push({ name: "listplaceUI", params: {message: response.message}});
            }
    
      
    
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
  
