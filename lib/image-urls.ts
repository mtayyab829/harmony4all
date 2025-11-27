import imageUrls from '../app/image-urls.json';

export const getImageUrl = (path: string): string => {
  // Helper function to get Cloudinary URL from JSON structure
  const getNestedValue = (obj: any, path: string[]): any => {
    let current = obj;
    for (const key of path) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return null;
      }
    }
    return current;
  };

  // Try to find the image in the JSON structure
  const keys = path.split('.');
  const result = getNestedValue(imageUrls, keys);
  
  if (result && typeof result === 'object') {
    // If it's an object with cloudinaryUrl, return that
    if ('cloudinaryUrl' in result) {
      return result.cloudinaryUrl;
    }
    // If it's an array, try to find by name or return first item's cloudinaryUrl
    if (Array.isArray(result) && result.length > 0 && result[0].cloudinaryUrl) {
      return result[0].cloudinaryUrl;
    }
  }
  
  // Fallback to original path if not found
  return path;
};

// Direct access to image URLs object
export const imageUrlsData = imageUrls;

// Helper functions for specific sections
export const getAboutImage = (key: string) => {
  const img = (imageUrls.about as any)[key];
  return img?.cloudinaryUrl || img?.url || '';
};

export const getDonateImage = (index: number) => {
  return imageUrls.donate?.donationLevels?.[index]?.cloudinaryUrl || '';
};

export const getContactImage = (key: string) => {
  const img = (imageUrls.contact as any)[key];
  return img?.cloudinaryUrl || img?.url || '';
};

export const getCoFounderImage = (founder: 'bianca' | 'joshua', key: string) => {
  const img = (imageUrls.coFounders as any)[founder]?.[key];
  return img?.cloudinaryUrl || img?.url || '';
};

