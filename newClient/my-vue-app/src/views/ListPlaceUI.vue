<template>
    <v-container>
        <!-- Add new post section -->
        <v-row no-gutters>
            <v-row no-gutters> </v-row>
            <v-btn large plain class="mx-3" icon="mdi-plus" size="small" href="/placeUI"
                  style="background-color: #a88a5e; color: #1d1d1d; transition: box-shadow 0.3s;border-radius: 999px;">
            </v-btn>
        </v-row>
        <v-sheet>
            <v-col class="pa-2" v-for="post in posts" :key="post._id">
                <v-card class="mx-auto" height="169" width="1000" :to="{ params: { id: post._id } }">
                    <v-row class="mx-0"> 
                        <router-link :to="{ name: 'placedetails', params: { id: post._id } }">
                            <img class="custom-image" :src="`/images/${post.image}`" />
                        </router-link>
                        <v-col class="my-2 mx-3">
                            <b class="text-h6">
                                {{ post.activities }}
                            </b>
                            <v-col>
                                <v-icon class="mx-2">mdi-map-marker</v-icon>Located in {{ post.location }}
                                <div>
                                    <v-icon class="mx-2">mdi-cash</v-icon>{{ post.budget }}
                                </div>
                                <div>
                                    <v-icon class="mx-2">mdi-human-female-boy</v-icon>{{ post.age }}
                                </div>
                                
                            </v-col>
                        </v-col>
                        <v-btn class="my-6 mx-0" icon="mdi-file-document-edit" size="small" :to="{name: 'updateplace', params: {id: post._id}}"></v-btn>
                        <v-btn class="my-6 mx-2" icon="mdi-delete-empty" size="small" @click="removePost(post._id)"></v-btn>
                    </v-row>
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
        async updatePost(id) {
            const response = await pAPI.updatePlace(id);
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
  
<style >
.custom-image {
  height: 200px; /* Set your desired height */
  width: 300px; /* Ensures the width adjusts according to the height */
  object-fit: cover; /* Maintains aspect ratio and covers the entire container */
}
</style>

  