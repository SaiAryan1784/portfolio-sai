"use client"
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { send } from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [emailCount, setEmailCount] = useState<number>(0);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (emailCount >= 2) {
      setError(true);
      setSuccess(false);
      return;
    }
    
    setLoading(true);
    
    try {
      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Sai Aryan',
        reply_to: formData.email
      };
      
      // Log the attempt (for debugging)
      console.log('Attempting to send email with EmailJS');
      
      // Send the email using EmailJS
      await send(
        'service_1z01708',  // Service ID
        'template_7v1c0ry',  // Template ID
        templateParams,     // Template parameters
        'DFOCDgwz_bFaT14kt' // Public Key
      );
      
      setSuccess(true);
      setError(false);
      setEmailCount(prev => prev + 1);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (err) {
      console.error("Error sending email:", err);
      setError(true);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id='contact' className='bg-secondary text-primary py-20 px-4'>
      <motion.div 
        className='max-w-6xl mx-auto'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className='text-4xl md:text-5xl font-bold mb-6'>Get In Touch</h2>
            <p className='text-lg mb-8 opacity-90'>
              Feel free to reach out if you want to collaborate, have a question, 
              or just want to connect.
            </p>
            
            <div className='space-y-6'>
              <div className='flex items-center space-x-4'>
                <div className='bg-primary text-secondary p-3 rounded-full'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className='font-semibold'>Email</h3>
                  <p className='text-primary opacity-90'>saiaryan.goswami1784@gmail.com</p>
                </div>
              </div>
              
              <div className='flex items-center space-x-4'>
                <div className='bg-primary text-secondary p-3 rounded-full'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className='font-semibold'>Location</h3>
                  <p className='text-primary opacity-90'>Available for Remote Work</p>
                </div>
              </div>
              
              <div className='flex items-center space-x-4'>
                <div className='bg-primary text-secondary p-3 rounded-full'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className='font-semibold'>Working Hours</h3>
                  <p className='text-primary opacity-90'>Mon-Fri: 9AM - 6PM</p>
                </div>
              </div>
              
              <div className='pt-6'>
                <h3 className='font-semibold mb-4'>Connect With Me</h3>
                <div className='flex space-x-4'>
                  <motion.a
                    href="https://github.com/SaiAryan1784"
                    target='_blank'
                    className='bg-primary text-secondary p-3 rounded-full'
                    whileHover={{ y: -5, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/saiaryangoswami/"
                    target='_blank'
                    className='bg-primary text-secondary p-3 rounded-full'
                    whileHover={{ y: -5, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className='bg-primary/10 p-8 rounded-lg backdrop-blur-sm'
          >
            <h2 className='text-2xl font-bold mb-6'>Send Me a Message</h2>
            {emailCount >= 2 && (
              <div className='mb-6 p-4 bg-red-500/20 text-white rounded-lg'>
                <p className='font-medium'>Email limit reached (max 2)</p>
                <p className='text-sm'>Please use direct email contact instead. 
                  <a href="mailto:saiaryangoswami1784@gmail.com" className='text-primary'>saiaryangoswami1784@gmail.com</a>
                </p>
              </div>
            )}
            
            {success && (
              <div className='mb-6 p-4 bg-green-500/20 text-white rounded-lg'>
                <p className='font-medium'>Message sent successfully!</p>
                <p className='text-sm'>I&apos;ll get back to you as soon as possible.</p>
              </div>
            )}
            
            {error && !success && (
              <div className='mb-6 p-4 bg-red-500/20 text-white rounded-lg'>
                <p className='font-medium'>Failed to send message</p>
                <p className='text-sm'>Please try again later or contact me directly via email.
                  <a href="mailto:saiaryangoswami1784@gmail.com" className='text-primary'>saiaryangoswami1784@gmail.com</a>
                </p>
              </div>
            )}
            
            <form ref={formRef} onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label htmlFor="name" className='block mb-2 text-sm font-medium'>Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-secondary border ${errors.name ? 'border-red-500' : 'border-primary/30'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50`}
                  placeholder="John Doe"
                />
                {errors.name && <p className='mt-1 text-sm text-red-400'>{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className='block mb-2 text-sm font-medium'>Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-secondary border ${errors.email ? 'border-red-500' : 'border-primary/30'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className='mt-1 text-sm text-red-400'>{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="message" className='block mb-2 text-sm font-medium'>Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 bg-secondary border ${errors.message ? 'border-red-500' : 'border-primary/30'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50`}
                  placeholder="Hi there, I'd like to talk about..."
                ></textarea>
                {errors.message && <p className='mt-1 text-sm text-red-400'>{errors.message}</p>}
              </div>
              
              <motion.button
                type="submit"
                disabled={loading || emailCount >= 2}
                className={`w-full py-3 px-6 rounded-lg font-medium ${emailCount >= 2 ? 'bg-gray-500 cursor-not-allowed' : 'bg-primary text-secondary hover:bg-primary/90'} transition-all duration-300 flex items-center justify-center`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Send Message"
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;