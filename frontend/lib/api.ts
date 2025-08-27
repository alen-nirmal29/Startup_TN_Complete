const API_BASE_URL = 'http://localhost:8000'; // Update this with your backend URL

export interface ChatResponse {
  results: any[];
  explanation: string;
  sql?: string;
}

export const chatWithAI = async (message: string): Promise<ChatResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: message }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from AI');
    }

    return await response.json();
  } catch (error) {
    console.error('Error calling AI API:', error);
    throw error;
  }
};
