import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContentEmergence } from '../ui/ContentEmergence';
import { useFrameSequence } from '../../contexts/FrameSequenceProvider';
import { ContactFormValues } from '../../types';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please provide a valid email address.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export const ContactSection: React.FC = () => {
  const { selectedJob, setSelectedJob } = useFrameSequence();
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  });

  // Dynamically update form values when selectedJob is chosen from Careers list
  useEffect(() => {
    if (selectedJob) {
      setValue('subject', `Application for Role: ${selectedJob}`);
      setValue(
        'message',
        `Dear Rubicorn Team,\n\nI am writing to express my interest in the ${selectedJob} internship position. [Please insert details about your background, skills, and motivation here...]`
      );
    }
  }, [selectedJob, setValue]);

  const onSubmit = (data: ContactFormValues) => {
    setIsSubmittingForm(true);
    console.log('Sending message data:', data);

    // Simulate database network submission lag
    setTimeout(() => {
      setIsSubmittingForm(false);
      setIsSubmitSuccess(true);
      reset(); // Reset form fields
      setSelectedJob(''); // Clear selected job cache
    }, 1500);
  };

  return (
    <section 
      id="contact" 
      className="relative w-full py-24 md:py-32 bg-transparent flex flex-col items-center px-6"
    >
      <div className="max-w-[1200px] w-full flex flex-col gap-16 md:gap-20 relative">
        
        {/* Section Header — Content Emergence 3D launch */}
        <ContentEmergence intensity="feature" delay={0} className="flex flex-col items-center text-center gap-4 max-w-[700px] mx-auto">
          <motion.span
            className="font-space-grotesk text-[0.7rem] tracking-[0.25em] text-[#00C8FF] uppercase"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            CONTACT US
          </motion.span>
          
          <h2 className="font-orbitron font-extrabold text-[1.8rem] md:text-[2.8rem] text-white leading-[1.2] uppercase text-center">
            INNOVATE YOUR OPERATIONS
          </h2>
          
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#00C8FF] to-transparent shadow-[0_0_8px_rgba(0,200,255,0.8)] mt-2" />
          
          <p className="text-white/60 text-[0.92rem] leading-relaxed mt-2">
            Have a project in mind or applying for an open internship? Fill out the contact form below and we will get back to you shortly.
          </p>
        </ContentEmergence>

        {/* Contact Split Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-stretch z-10 relative">
          
          {/* Info Details Panel — ContentEmergence */}
          <ContentEmergence intensity="feature" delay={100} className="lg:col-span-2 flex flex-col gap-6">
            <div className="rounded-xl p-8 flex flex-col justify-between h-full" style={{ background: 'rgba(3, 10, 24, 0.52)', border: '1px solid rgba(0, 200, 255, 0.18)', backdropFilter: 'blur(12px)' }}>
              
              <div className="flex flex-col gap-8">
                <h3 className="font-orbitron font-bold text-[1.2rem] text-white tracking-wide uppercase">
                  GET IN TOUCH
                </h3>
                
                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded bg-[#00C8FF]/5 border border-[#00C8FF]/15 text-[#00C8FF] shrink-0">
                      <Mail size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-space-grotesk text-[0.7rem] tracking-[0.1em] text-white/40 uppercase">
                        Email Address
                      </span>
                      <a href="mailto:contact@rubicorn.in" className="text-white/85 hover:text-[#00C8FF] text-[0.92rem] transition-colors mt-0.5">
                        contact@rubicorn.in
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded bg-[#00C8FF]/5 border border-[#00C8FF]/15 text-[#00C8FF] shrink-0">
                      <Phone size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-space-grotesk text-[0.7rem] tracking-[0.1em] text-white/40 uppercase">
                        Phone Number
                      </span>
                      <a href="tel:+919494565162" className="text-white/85 hover:text-[#00C8FF] text-[0.92rem] transition-colors mt-0.5">
                        +91 94945 65162
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded bg-[#00C8FF]/5 border border-[#00C8FF]/15 text-[#00C8FF] shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-space-grotesk text-[0.7rem] tracking-[0.1em] text-white/40 uppercase">
                        Location
                      </span>
                      <span className="text-white/85 text-[0.92rem] mt-0.5">
                        Hyderabad, Telangana, India
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/[0.04] mt-8 text-white/30 text-[0.8rem] leading-relaxed">
                We read every inquiry and aim to respond within 24 business hours. Let us design your custom system architecture.
              </div>

            </div>
          </ContentEmergence>

          {/* Form Input Panel — ContentEmergence */}
          <ContentEmergence intensity="feature" delay={200} className="lg:col-span-3">
            <form 
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-xl p-8 flex flex-col gap-6 h-full"
              style={{ background: 'rgba(3, 10, 24, 0.52)', border: '1px solid rgba(0, 200, 255, 0.18)', backdropFilter: 'blur(12px)' }}
            >
              <h3 className="font-orbitron font-bold text-[1.2rem] text-white tracking-wide uppercase">
                SEND MESSAGE
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-space-grotesk text-[0.7rem] tracking-[0.15em] text-white/45 uppercase pl-0.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name')}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded border border-white/[0.08] focus:border-[#00C8FF] bg-white/[0.03] text-white text-[0.88rem] placeholder-white/20 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,200,255,0.08)]"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-[0.74rem] pl-0.5">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-space-grotesk text-[0.7rem] tracking-[0.15em] text-white/45 uppercase pl-0.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded border border-white/[0.08] focus:border-[#00C8FF] bg-white/[0.03] text-white text-[0.88rem] placeholder-white/20 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,200,255,0.08)]"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-[0.74rem] pl-0.5">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone Number */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="font-space-grotesk text-[0.7rem] tracking-[0.15em] text-white/45 uppercase pl-0.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone')}
                    placeholder="Enter phone number"
                    className="w-full px-4 py-3 rounded border border-white/[0.08] focus:border-[#00C8FF] bg-white/[0.03] text-white text-[0.88rem] placeholder-white/20 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,200,255,0.08)]"
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-[0.74rem] pl-0.5">
                      {errors.phone.message}
                    </span>
                  )}
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="font-space-grotesk text-[0.7rem] tracking-[0.15em] text-white/45 uppercase pl-0.5">
                    Subject / Project
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register('subject')}
                    placeholder="Enter subject"
                    className="w-full px-4 py-3 rounded border border-white/[0.08] focus:border-[#00C8FF] bg-white/[0.03] text-white text-[0.88rem] placeholder-white/20 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,200,255,0.08)]"
                  />
                  {errors.subject && (
                    <span className="text-red-500 text-[0.74rem] pl-0.5">
                      {errors.subject.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-space-grotesk text-[0.7rem] tracking-[0.15em] text-white/45 uppercase pl-0.5">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register('message')}
                  placeholder="Tell us about your project requirements or application details..."
                  className="w-full px-4 py-3 rounded border border-white/[0.08] focus:border-[#00C8FF] bg-white/[0.03] text-white text-[0.88rem] placeholder-white/20 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,200,255,0.08)] resize-none"
                />
                {errors.message && (
                  <span className="text-red-500 text-[0.74rem] pl-0.5">
                    {errors.message.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <AnimatePresence mode="wait">
                {isSubmitSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center justify-center gap-2 py-4 px-6 rounded border border-green-500/20 bg-green-500/5 text-green-400 font-space-grotesk text-[0.8rem] tracking-[0.1em] uppercase shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                  >
                    <CheckCircle size={16} /> Message Sent Successfully!
                  </motion.div>
                ) : (
                  <motion.button
                    key="submit"
                    type="submit"
                    disabled={isSubmittingForm}
                    className="w-full py-4 rounded bg-gradient-to-r from-[#00C8FF] to-[#0055FF] border border-transparent hover:shadow-[0_0_25px_rgba(0,200,255,0.5)] active:scale-[0.99] text-white font-space-grotesk text-[0.8rem] tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {isSubmittingForm ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        PROCESSING SUBMISSION...
                      </>
                    ) : (
                      <>
                        SEND MESSAGE <Send size={14} />
                      </>
                    )}
                  </motion.button>
                )}
              </AnimatePresence>

            </form>
          </ContentEmergence>

        </div>

      </div>
    </section>
  );
};
