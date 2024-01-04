// components/AddPostComponent.js
import axios from "axios";
import API from "../../api";

class userClass {
  constructor({ validateForm, pushRoute, router }) {
    this.rules = [(value) => !!value || "This field is required!"];
    this.post = {
      username: "",
      phoneNumber: "",
      image: "",
    };
    this.image = "";
    this.validateForm = validateForm;
    this.pushRoute = pushRoute;
    this.router = router; // Accept the router instance as a parameter
  }

  selectFile(file) {
    if (file && file.length > 0) {
        this.image = file[0];
    } else {
        console.error("Invalid file:", file);
    }
}

  async submitForm() {
    const formData = new FormData();
    formData.append("image", this.image);
    formData.append("username", this.post.username);
    formData.append("phoneNumber", this.post.phoneNumber);

    if (this.validateForm()) {
      const response = await API.addPost(formData);
      // Assuming you have a method to handle the navigation or display the message
      this.handleApiResponse(response);
    }
  }


  
  handleApiResponse(response) {
    // Check if the current route is different from the intended route
    const currentRoute = this.router.currentRoute.name; // Access the router instance
    const intendedRoute = "userUI";

    if (currentRoute !== intendedRoute) {
      // Navigate to the intended route
      this.pushRoute(intendedRoute, { message: response.message });
    } else {
      // Handle the response differently if you are already on the intended route
      // For example, update the component state or display a message
      console.log("Already on the 'userUI' route. Handle the response here:", response);
    }
  }
}

export default userClass;

