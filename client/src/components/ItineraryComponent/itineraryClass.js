// components/AddPostComponent.js
import axios from "axios";
import iAPI from "../ItineraryComponent/itineraryAPI"

class itineraryClass {
  constructor({ validateForm, pushRoute, router }) {
    this.rules = [(value) => !!value || "This field is required!"];
    this.post = {
      startDate: "",
      endDate: "",
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
    formData.append("startDate", this.post.startDate);
    formData.append("endDate", this.post.endDate);
    formData.append("day", this.post.day);
    formData.append("image", this.image);


    if (this.validateForm()) {
      const response = await iAPI.addItinerary(formData);
      // Assuming you have a method to handle the navigation or display the message
      this.handleApiResponse(response);
    }
  }

  

  
  handleApiResponse(response) {
    // Check if the current route is different from the intended route
    const currentRoute = this.router.currentRoute.name; // Access the router instance
    const intendedRoute = "listplaceUI";

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

export default itineraryClass;

