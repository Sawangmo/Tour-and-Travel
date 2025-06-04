// models/service.js

const services = [
  {
    id: 1,
    title: "Experienced Tourist Guides",
    shortDesc: "Professional guides for your travel comfort",
    fullDesc:
      "Our knowledgeable tourist guides will ensure you gain insightful experiences about Bhutanese culture, traditions, and history.",
    image: "/img/guides-group-photo.jpg",
  },
  {
    id: 2,
    title: "Professional Photography",
    shortDesc: "Capture every moment of your trip",
    fullDesc:
      "We offer skilled photographers to document your journey beautifully.",
    image: "/img/download.jpeg",
  },
  {
    id: 3,
    title: "Accommodation Booking",
    shortDesc: "Comfortable stays arranged for you",
    fullDesc:
      "From boutique hotels to traditional homestays, we provide booking support tailored to your needs.",
    image: "/img/accom-yugharling-bumthang.jpg",
  },

  {
    id: 4,
    title: "Accommodation Booking",
    shortDesc: "Comfortable stays arranged for you",
    fullDesc:
      "Embark on thrilling adventures in Bhutan.",
    image: "/img/bhutan-trekking-tours-from-india.jpg",
  },
  
  
];

// ✅ Exporting a function
function getAllServices() {
  return services;
}

module.exports = { getAllServices };
