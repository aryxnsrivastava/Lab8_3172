import{useEffect, useState} from "react";

function Messages(){
  const [messages, setMessages] = useState([]);

  useEffect(() =>{
    const fetchMessages = async () =>{
      try{
        const response = await fetch("https://mywebsite-op4x.onrender.com/api/messages");
        const data = await response.json();
        setMessages(data);
      } 
      catch(error){
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return(
    <div className="p-6 bg-black">
      <h1 className="text-2xl font-bold mb-4 bg-black text-white">Submitted Messages</h1>
      {messages.length === 0 ?(
        <p>Empty inbox.</p>
      ) : (
        <ul>
          {messages.map((msg, index) =>(
            <li key={index} className="mb-4 border p-4 rounded bg-gray-100">
              <p><strong>Name:</strong> {msg.name}</p>
              <p><strong>Subject:</strong> {msg.subject}</p>
              <p><strong>Message:</strong> {msg.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Messages;
