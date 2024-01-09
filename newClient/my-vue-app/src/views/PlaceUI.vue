<template>
    <v-container>
      <!-- Add new post section -->
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="elevation-2">
            <v-card-title class="headline text-center">Add New Post</v-card-title>
            <v-divider></v-divider>
            <v-form ref="form" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
              <!-- Your form fields here -->
              <v-text-field v-model="placeClass.post.activities" label="Activities" prepend-icon="mdi-note" outlined
                :rules="placeClass.rules" class="custom-text-field"></v-text-field>
              <v-text-field v-model="placeClass.post.location" label="Location" prepend-icon="mdi-view-list" outlined
                :rules="placeClass.rules" class="custom-text-field"></v-text-field>
              <v-text-field v-model="placeClass.post.expect" label="Expect" prepend-icon="mdi-note" outlined
                :rules="placeClass.rules" class="custom-text-field"></v-text-field>
              <v-text-field v-model="placeClass.post.age" label="Age" prepend-icon="mdi-view-list" outlined
                :rules="placeClass.rules" class="custom-text-field"></v-text-field>
              <v-text-field v-model="placeClass.post.notes" label="Notes" prepend-icon="mdi-note" outlined
                :rules="placeClass.rules" class="custom-text-field"></v-text-field>
              <v-text-field v-model="placeClass.post.budget" label="Budget" prepend-icon="mdi-view-list" outlined
                :rules="placeClass.rules" class="custom-text-field"></v-text-field>
  
              <v-file-input @change="selectFile" :rules="placeClass.rules" show-size counter multiple
                label="Select Image"></v-file-input>
  
              <v-btn type="submit" class="mt-4" color="primary" block>Add Post</v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  
<script>
import placeClass from "../components/PlaceComponent/placeClass";
import pAPI from "../components/PlaceComponent/placeAPI";

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
        this.fetchPosts(); // Fetch posts when the component is created
        
    },
    methods: {
        async fetchPosts() {
            this.posts = await pAPI.getAllPlace();
        },
        selectFile(event) {
            console.log("Selected file:", event.target.files[0]);
            this.placeClass.selectFile(event.target.files[0]);
        },

        async submitForm() {
    console.log("Submitting form...");
    try {
        // Validate the form
        const isValid = await this.$refs.form.validate();

        if (isValid) {
            // If the form is valid, submit the form
            await this.placeClass.submitForm();

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
  
