
// Константи для базових налаштувань API
const API_URL = 'https://jsonplaceholder.typicode.com';
/**
 * Отримує список постів (завдань) з сервера.
 * Використовує ліміт у 10 елементів для оптимізації.
 */
export const fetchBalanceTips = async () => {
  try {
    const response = await fetch(`${API_URL}/posts?_limit=10`); 
    // Перевірка на успішність відповіді (статус 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Парсимо JSON та повертаємо дані
    return await response.json();
  } catch (error) {
    // Логування помилки для розробника та передача її далі
    console.error('Fetch error:', error);
    throw error; 
  }
};