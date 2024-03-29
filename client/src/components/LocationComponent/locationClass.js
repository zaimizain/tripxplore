// components/AddPostComponent.js
import axios from "axios";
import lAPI from "../LocationComponent/locationAPI"

class locationClass {
  constructor({ validateForm, pushRoute, router }) {
    this.rules = [(value) => !!value || "This field is required!"];
    this.post = {
      location: "",
      placeName: "",
      
    };
    this.validateForm = validateForm;
    this.pushRoute = pushRoute;
    this.router = router; // Accept the router instance as a parameter
  }


  async submitForm() {
    if (this.validateForm()) {
      try {
        const response = await axios.post('/api/location', this.post);
        // Assuming you have a method to handle the navigation or display the message
        this.handleApiResponse(response);
      } catch (error) {
        // Handle error
        console.error('Sini Error submitting form:', error);
      }
    }
  }
  
  handleApiResponse(response) {
    // Check if the current route is different from the intended route
    const currentRoute = this.router.currentRoute.name; // Access the router instance
    const intendedRoute = "placeUI";

    if (currentRoute !== intendedRoute) {
      // Navigate to the intended route
      this.pushRoute(intendedRoute, { message: response.message });
    } else {
      // Handle the response differently if you are already on the intended route
      // For example, update the component state or display a message
      console.log("Already on the 'placeUI' route. Handle the response here:", response);
    }
  }
}

export default locationClass;

