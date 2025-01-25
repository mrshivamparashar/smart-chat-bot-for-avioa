from react import React, useState
from axios import axios
from components.ui.card import Card, CardContent
from components.ui.button import Button

const Chatbot = () => {
  const [query, setQuery] = useState('');
  const [responses, setResponses] = useState([]);

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = { sender: 'user', text: query };
    setResponses((prev) => [...prev, userMessage]);

    try {
      const { data } = await axios.post('/api/query', { query });
      const botMessage = { sender: 'bot', text: data.response };
      setResponses((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { sender: 'bot', text: 'An error occurred. Please try again later.' };
      setResponses((prev) => [...prev, errorMessage]);
    }

    setQuery('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="h-96 overflow-y-auto p-4 bg-white rounded-lg shadow-inner">
              {responses.map((res, index) => (
                <div
                  key={index}
                  className={`mb-4 p-2 rounded-lg max-w-xs ${
                    res.sender === 'user' ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-200 text-gray-800'
                  }`}
                >
                  {res.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleQuerySubmit} className="flex space-x-2">
              <input
                type="text"
                className="flex-grow p-2 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ask a question..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button type="submit" className="bg-blue-500 text-white shadow hover:bg-blue-600">
                Send
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

