import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../ui/ScrollReveal';
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
        
        {/* Section Header — fadeDown */}
        <ScrollReveal type="fadeDown" className="flex flex-col items-center text-center gap-4 max-w-[700px] mx-auto">
          <motion.span
            className="font-space-grotesk text-[0.7rem] tracking-[0.25em] text-[#00C8FF] uppercase"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            CONTACT US
          </motion.span>
          <h2 className="font-orbitron font-extrabold text-[1.8rem] md:text-[2.8rem] text-white leading-[1.2] uppercase">
            {'INNOVATE YOUR OPERATIONS'.split('').map((ch, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: -15 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.02 * i, duration: 0.4 }}
                className="inline-block">{ch === ' ' ? '\u00A0' : ch}
              </motion.span>
            ))}
          </h2>
          <motion.div
            className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#00C8FF] to-transparent shadow-[0_0_8px_rgba(0,200,255,0.8)]"
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.7, duration: 0.6 }}
            className="text-white/60 text-[0.92rem] leading-relaxed mt-2"
          >
            Have a project in mind or applying for an open internship? Fill out the contact form below and we will get back to you shortly.
          </motion.p>
        </ScrollReveal>

        {/* Contact Split Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-stretch z-10 relative">
          
          {/* Info Details Panel — fadeLeft */}
          <ScrollReveal className="lg:col-span-2 flex flex-col gap-6" delay={100} type="fadeLeft">
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
          </ScrollReveal>

          {/* Form Input Panel — fadeRight */}
          <ScrollReveal className="lg:col-span-3" delay={200} type="fadeRight">
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
                  <label htmlFor="name" className="font-space-grotesk text-[0.7rem] tracking-[0.1em] text-white/50 uppercase">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name')}
                    placeholder="John Doe"
                    className="px-4 py-3 rounded bg-white/[0.02] border border-white/[0.08] hover:border-white/15 focus:border-[#00C8FF]/50 focus:bg-[#02060D]/50 text-white text-[0.9rem] focus:outline-none transition-all duration-300"
                  />
                  {errors.name && <span className="text-red-500 text-[0.75rem]">{errors.name.message}</span>}
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-space-grotesk text-[0.7rem] tracking-[0.1em] text-white/50 uppercase">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="john@example.com"
                    className="px-4 py-3 rounded bg-white/[0.02] border border-white/[0.08] hover:border-white/15 focus:border-[#00C8FF]/50 focus:bg-[#02060D]/50 text-white text-[0.9rem] focus:outline-none transition-all duration-300"
                  />
                  {errors.email && <span className="text-red-500 text-[0.75rem]">{errors.email.message}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone number */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="font-space-grotesk text-[0.7rem] tracking-[0.1em] text-white/50 uppercase">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    placeholder="e.g. 9876543210"
                    className="px-4 py-3 rounded bg-white/[0.02] border border-white/[0.08] hover:border-white/15 focus:border-[#00C8FF]/50 focus:bg-[#02060D]/50 text-white text-[0.9rem] focus:outline-none transition-all duration-300"
                  />
                  {errors.phone && <span className="text-red-500 text-[0.75rem]">{errors.phone.message}</span>}
                </div>

                {/* Subject line */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="font-space-grotesk text-[0.7rem] tracking-[0.1em] text-white/50 uppercase">
                    Subject *
                  </label>
                  <input
                    id="subject"
                    type="text"
                    {...register('subject')}
                    placeholder="Project Inquiry / Job Title"
                    className="px-4 py-3 rounded bg-white/[0.02] border border-white/[0.08] hover:border-white/15 focus:border-[#00C8FF]/50 focus:bg-[#02060D]/50 text-white text-[0.9rem] focus:outline-none transition-all duration-300"
                  />
                  {errors.subject && <span className="text-red-500 text-[0.75rem]">{errors.subject.message}</span>}
                </div>
              </div>

              {/* Message Details */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-space-grotesk text-[0.7rem] tracking-[0.1em] text-white/50 uppercase">
                  Message Details *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register('message')}
                  placeholder="Describe your project, timeline, or internship application background here..."
                  className="px-4 py-3 rounded bg-white/[0.02] border border-white/[0.08] hover:border-white/15 focus:border-[#00C8FF]/50 focus:bg-[#02060D]/50 text-white text-[0.9rem] focus:outline-none transition-all duration-300 resize-none"
                />
                {errors.message && <span className="text-red-500 text-[0.75rem]">{errors.message.message}</span>}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmittingForm}
                className="mt-2 w-full py-4 rounded bg-gradient-to-r from-[#00C8FF] to-[#0055FF] shadow-[0_0_15px_rgba(0,200,255,0.3)] hover:shadow-[0_0_25px_rgba(0,200,255,0.5)] text-white font-space-grotesk text-[0.82rem] tracking-[0.15em] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 uppercase font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmittingForm ? (
                  <span className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                ) : (
                  <>
                    Send Message
                    <Send size={15} />
                  </>
                )}
              </button>

            </form>
          </ScrollReveal>

        </div>

        {/* Successful Submit overlay notification modal */}
        {isSubmitSuccess && (
          <div className="fixed inset-0 bg-[#02060D]/85 backdrop-blur-[15px] z-[99999] flex items-center justify-center px-4">
            <div className="bg-[#040B18] border border-[#00C8FF]/30 p-8 rounded-xl max-w-[420px] w-full text-center flex flex-col items-center gap-6 shadow-[0_0_50px_rgba(0,200,255,0.25)] animate-in fade-in zoom-in-95 duration-300">
              <CheckCircle size={64} className="text-[#00C8FF] drop-shadow-[0_0_10px_rgba(0,200,255,0.5)]" />
              <h4 className="font-orbitron font-extrabold text-[1.4rem] tracking-wide text-white uppercase">
                MESSAGE SENT
              </h4>
              <p className="text-white/60 text-[0.9rem] leading-relaxed">
                Thank you for reaching out! Your message was submitted successfully. Our engineering team will review it and follow up shortly.
              </p>
              <button
                onClick={() => setIsSubmitSuccess(false)}
                className="mt-2 px-6 py-3 rounded bg-[#00C8FF]/10 hover:bg-[#00C8FF]/20 border border-[#00C8FF]/40 text-[#00C8FF] font-space-grotesk text-[0.78rem] tracking-[0.15em] transition-all duration-300 uppercase font-semibold cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
