<template>
    <v-container>
        <!-- Add new post section -->
        <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <v-card-title>Add new post</v-card-title>
                    <v-divider></v-divider>
                    <v-form ref="form" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
                        <!-- Your form fields here -->
                        <v-text-field v-model="placeClass.post.activities" label="activities" prepend-icon="mdi-note"
                            :rules="placeClass.rules"></v-text-field>
                        <v-text-field v-model="placeClass.post.location" label="location" prepend-icon="mdi-view-list"
                            :rules="placeClass.rules"></v-text-field>
                            <v-text-field v-model="placeClass.post.expect" label="expect" prepend-icon="mdi-note"
                            :rules="placeClass.rules"></v-text-field>
                        <v-text-field v-model="placeClass.post.age" label="age" prepend-icon="mdi-view-list"
                            :rules="placeClass.rules"></v-text-field>
                            <v-text-field v-model="placeClass.post.notes" label="notes" prepend-icon="mdi-note"
                            :rules="placeClass.rules"></v-text-field>
                        <v-text-field v-model="placeClass.post.budget" label="budget" prepend-icon="mdi-view-list"
                            :rules="placeClass.rules"></v-text-field>

                            <v-file-input @change="selectFile" :rules="placeClass.rules" show-size counter multiple
                            label="Select Image"></v-file-input>


                        <v-btn type="submit"  class="mt-3" color="primary">Add post</v-btn>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>

       
     
    </v-container>
</template>
  
<script>
import placeClass from "@/components/PlaceComponent/placeClass";
import pAPI from "../components/PlaceComponent/placeAPI";

export default {
    data() {
        const router = this.$router; // Store the router instance in a variable
        const validateForm = () => this.$refs.form.validate();
        const pushRoute = (routeName, params) => this.$router.push({ name: routeName, params });

        return {
            placeClass: new placeClass({ validateForm, pushRoute, router }),
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
        selectFile(file) {
            console.log("Selected file:", file);
            this.placeClass.selectFile(file);
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
  
