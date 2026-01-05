import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Contact API functions
export const contactAPI = {
  // Submit contact form
  submitContact: async (contactData: {
    firstName?: string;
    lastName?: string;
    email: string;
    phone?: string;
    subject?: string;
    message?: string;
  }) => {
    const response = await api.post("/contact", contactData);
    return response.data;
  },
}
// Newsletter API functions
export const newsletterAPI = {
  // Subscribe to newsletter
  subscribe: async (email: string, source?: string) => {
    const response = await api.post("/newsletter/subscribe", { email, source });
    return response.data;
  },

  // Unsubscribe from newsletter
  unsubscribe: async (email: string) => {
    const response = await api.post("/newsletter/unsubscribe", { email });
    return response.data;
  },
}
// Welcome Popup API functions
export const welcomePopupAPI = {
  // Submit welcome popup form
  submitForm: async (formData: {
    firstName: string;
    lastName: string;
    email: string;
    cellNumber: string;
    promotionalUpdates: boolean;
    agreeToTerms: boolean;
  }) => {
    const response = await api.post("/welcome-popup/submit", formData);
    return response.data;
  },

  // Get user details by email
  getUserDetails: async (email: string) => {
    const response = await api.get(`/welcome-popup/details/${encodeURIComponent(email)}`);
    return response.data;
  },
}

// Volunteer API functions
export const volunteerAPI = {
  // Submit volunteer application
  submitApplication: async (volunteerData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      zipCode?: string;
    };
    dateOfBirth: string;
    emergencyContact?: {
      name?: string;
      relationship?: string;
      phone?: string;
    };
    availability: string;
    interests: string[];
    experience: string;
    motivation: string;
  }) => {
    const response = await api.post("/volunteer/submit", volunteerData);
    return response.data;
  },
};

// Donation API functions
export const donationAPI = {
  // Create Stripe Checkout session
  createCheckoutSession: async (donationData: {
    donorName: string;
    email: string;
    phone?: string;
    amount: number;
    donationType: 'one-time' | 'monthly';
    paymentMethod?: string;
    designation?: string;
    isAnonymous?: boolean;
    message?: string;
  }) => {
    const response = await api.post("/donation/create-checkout-session", donationData);
    return response.data;
  },

  // Get donation status
  getDonationStatus: async (donationId: string) => {
    const response = await api.get(`/donation/status/${donationId}`);
    return response.data;
  },
};

// Instrument Donation API functions
export const instrumentDonationAPI = {
  // Submit instrument donation
  submitDonation: async (donationData: {
    donorName: string;
    email: string;
    instrumentType: string;
    instrumentCondition: string;
    pickupLocation: string;
    phone?: string;
    additionalNotes?: string;
  }) => {
    const response = await api.post("/instrument-donations", donationData);
    return response.data;
  },

  // Get instrument donations with pagination and filters
  getDonations: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const queryString = queryParams.toString();
    const url = `/instrument-donations${queryString ? `?${queryString}` : ''}`;

    const response = await api.get(url);
    return response.data;
  },
};
// Blog API functions
export const blogAPI = {
  // Get all blogs with pagination and filters
  getBlogs: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    tag?: string;
    featured?: boolean;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.category) queryParams.append('category', params.category.toString());
    if (params?.tag) queryParams.append('tag', params.tag.toString());
    if (params?.featured !== undefined) queryParams.append('featured', params.featured.toString());

    const queryString = queryParams.toString();
    const url = `/blogs${queryString ? `?${queryString}` : ''}`;

    const response = await api.get(url);
    return response.data;
  },

  // Get featured blogs
  getFeaturedBlogs: async (limit?: number) => {
    const queryParams = new URLSearchParams();
    if (limit) queryParams.append('limit', limit.toString());

    const response = await api.get(`/blogs/featured${queryParams.toString() ? `?${queryParams.toString()}` : ''}`);
    return response.data;
  },

  // Get blog categories
  getCategories: async () => {
    const response = await api.get('/blogs/categories');
    return response.data;
  },

  // Get popular tags
  getTags: async () => {
    const response = await api.get('/blogs/tags');
    return response.data;
  },

  // Get single blog by slug or id
  getBlog: async (slugOrId: string) => {
    const response = await api.get(`/blogs/${slugOrId}`);
    return response.data;
  },

  // Get related blogs
  getRelatedBlogs: async (blogId: string, limit?: number) => {
    const queryParams = new URLSearchParams();
    if (limit) queryParams.append('limit', limit.toString());

    const response = await api.get(`/blogs/${blogId}/related${queryParams.toString() ? `?${queryParams.toString()}` : ''}`);
    return response.data;
  },

  // Like a blog
  likeBlog: async (blogId: string) => {
    const response = await api.post(`/blogs/${blogId}/like`);
    return response.data;
  },

  // Share a blog
  shareBlog: async (blogId: string) => {
    const response = await api.post(`/blogs/${blogId}/share`);
    return response.data;
  },

  // Add comment to blog
  addComment: async (blogId: string, content: string) => {
    const response = await api.post(`/blogs/${blogId}/comments`, { content });
    return response.data;
  }
};

// Text Updates API functions
export const textUpdatesAPI = {
  // Subscribe to text updates
  subscribe: async (formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    smsConsent: boolean;
  }) => {
    const response = await api.post("/text-updates/subscribe", formData);
    return response.data;
  },
};

// Export the base api instance for custom requests
export default api;
