import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

function Contact(){
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  useEffect(() =>{
    const draft = JSON.parse(localStorage.getItem("contactDraft"));
    if (draft) setFormData(draft);
  }, []);


  useEffect(() =>{
    localStorage.setItem("contactDraft", JSON.stringify(formData));
  }, [formData]);

  const validate = () =>{
    const errs = {};
    const nameRegex = /^[A-Za-z\s\-\'À-ſ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const subjectRegex = /^[A-Za-z\s]+$/;
    const messageRegex = /^[^<>]*$/;

    if(!nameRegex.test(formData.name)) errs.name = "Invalid name.";
    if(!emailRegex.test(formData.email)) errs.email = "Invalid email.";
    if(!subjectRegex.test(formData.subject)) errs.subject = "Subject must be letters only.";
    if(!messageRegex.test(formData.message)) errs.message = "Message must not contain < or >.";
    if(!formData.consent) errs.consent = "Consent is required.";
    return errs;
  };

  const handleChange = (e) =>{
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const errs = validate();
    if(Object.keys(errs).length > 0){
      setErrors(errs);
      return;
    }

    try{
      const response = await fetch("https://mywebsite-op4x.onrender.com/api/messages",{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if(!response.ok){
        const errorData = await response.json();
        setStatus("Error: " + errorData.message);
        return;
      }


      localStorage.removeItem("contactDraft");
      setFormData({ name: "", email: "", subject: "", message: "", consent: false });
      setErrors({});
      setStatus("Message sent successfully!");
      setTimeout(() => {
        setStatus("");
        navigate("/messages");
      }, 2000);
    } 
    catch(error){
      console.error("Error:", error);
      setStatus("Failed to send message. Try again.");
    }
  };

  return(
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label className="block">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label className="block">Subject</label>
          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
        </div>
        <div>
          <label className="block">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
        </div>
        <div>
          <label className="flex items-center space-x-2">
            <input
              name="consent"
              type="checkbox"
              checked={formData.consent}
              onChange={handleChange}
            />
            <span>Check the box for consent agreement.</span>
          </label>
          {errors.consent && <p className="text-red-500 text-sm">{errors.consent}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
        {status && <p className="text-green-600 font-semibold">{status}</p>}
      </form>
    </div>
  );
}

export default Contact;
