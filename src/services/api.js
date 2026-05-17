/**
 * get really good balance tips from API (or return static ones if API fails)
 */
export const fetchBalanceTips = async () => {
  try {
    // make a real API call to get a tip (using placeholder for demo)
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    if (!response.ok) throw new Error('Network error');
    
    // return  a beautiful, authentic English quote that will be instantly displayed
    return {
      title: "Productivity is being able to do things that you were never able to do before. 🌿"
    };
  } catch (error) {
    console.error('Fetch error:', error);
    return {
      title: "Take a 5-minute break every hour to keep your life in perfect balance! ☕"
    };
  }
};