

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchBalanceTips = async () => {
  try {
    const response = await fetch(`${API_URL}/posts?_limit=10`); 
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error; 
  }
};