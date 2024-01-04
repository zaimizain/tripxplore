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
                        <v-text-field v-model="userClass.post.username" label="Username" prepend-icon="mdi-note"
                            :rules="userClass.rules"></v-text-field>
                        <v-text-field v-model="userClass.post.phoneNumber" label="Phone Number" prepend-icon="mdi-view-list"
                            :rules="userClass.rules"></v-text-field>


                        <v-file-input @change="selectFile" :rules="userClass.rules" show-size counter multiple
                            label="Select Image"></v-file-input>

                        <v-btn type="submit" class="mt-3" color="primary">Add post</v-btn>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>

        <!-- Display posts section -->
        <v-sheet>

            <v-col sm="2" class="pa-2" v-for="post in posts" :key="post._id">
                <v-card class="pa-2" :to="{  params: { id: post._id } }">
                    <v-card-title class="headline">
                        {{ post.username }}
                    </v-card-title>
                    <v-card-text>
                        <v-avatar size="150">
                            <img alt="Profile Picture" :src="`/${post.image}`" />
                        </v-avatar>
                    </v-card-text>
                    <v-card-text class="py-0">
                        <p>{{ post.phoneNumber }}</p>
                        <v-btn color="red" text @click="removePost(post._id)">Delete</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-sheet>
    </v-container>
</template>
  
<script>
import userClass from "../components/UserComponent/userClass";
import API from "../api";

export default {
    data() {
        const router = this.$router; // Store the router instance in a variable
        const validateForm = () => this.$refs.form.validate();
        const pushRoute = (routeName, params) => this.$router.push({ name: routeName, params });

        return {
            userClass: new userClass({ validateForm, pushRoute, router }),
            posts: [],
        };
    },

    async created() {
        this.fetchPosts(); // Fetch posts when the component is created
    },
    methods: {
        async fetchPosts() {
            this.posts = await API.getAllPost();
        },
        // Proxy methods to your class methods
        selectFile(file) {
            console.log("Selected file:", file);
            this.userClass.selectFile(file);
        },

        async submitForm() {
    console.log("Submitting form...");
    try {
        // Validate the form
        const isValid = await this.$refs.form.validate();

        if (isValid) {
            // If the form is valid, submit the form
            await this.userClass.submitForm();

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
            const response = await API.deletePost(id);
            // Assuming you have a method to handle the navigation or display the message
            this.handleApiResponse(response);
            // After deleting, fetch posts again to update the list
            this.fetchPosts();
        },

        handleApiResponse(response) {
            // Check if the current route is different from the intended route
            const currentRoute = this.$router.currentRoute.name;
            const intendedRoute = "userUI";

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
  