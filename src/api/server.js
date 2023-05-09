export const BASE_URL = 'https://pixabay.com/api/',
  API_KEY = '32810217-d4150f11c342a4e2afb80e8cd',
  SEARCH_PARAMS = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  });                 