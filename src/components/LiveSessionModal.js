import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Video, Link as LinkIcon, DollarSign, Info, Users, Check } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';
import StepIndicator from './StepIndicator';
import toast from 'react-hot-toast';

const LiveSessionModal = ({ show, handleClose, handleSave, editSession = null }) => {
  // Form state
  const [title, setTitle] = useState(editSession ? editSession.title : '');
  const [description, setDescription] = useState(editSession ? editSession.description : '');
  const [date, setDate] = useState(editSession ? editSession.date : '');
  const [time, setTime] = useState(editSession ? editSession.time : '');
  const [platform, setPlatform] = useState(editSession ? editSession.platform : 'zoom');
  const [meetingLink, setMeetingLink] = useState(editSession ? editSession.meetingLink : '');
  const [isPaid, setIsPaid] = useState(editSession ? editSession.isPaid : false);
  const [price, setPrice] = useState(editSession ? editSession.price : 0);
  const [capacity, setCapacity] = useState(editSession ? editSession.capacity || 20 : 20);
  
  // Multi-step form state
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  
  // Define steps
  const steps = [
    { label: 'Basic Info', icon: <Info size={16} /> },
    { label: 'Schedule', icon: <Calendar size={16} /> },
    { label: 'Platform', icon: <Video size={16} /> },
    { label: 'Payment', icon: <DollarSign size={16} /> },
    { label: 'Review', icon: <Check size={16} /> },
  ];
  
  // Reset form when modal is closed
  useEffect(() => {
    if (!show) {
      setCurrentStep(0);
      setErrors({});
    }
  }, [show]);
  
  // Validate current step
  const validateStep = () => {
    let stepErrors = {};
    let isValid = true;
    
    switch (currentStep) {
      case 0: // Basic Info
        if (!title.trim()) {
          stepErrors.title = 'Title is required';
          isValid = false;
        }
        if (!description.trim()) {
          stepErrors.description = 'Description is required';
          isValid = false;
        }
        break;
      case 1: // Schedule
        if (!date) {
          stepErrors.date = 'Date is required';
          isValid = false;
        }
        if (!time) {
          stepErrors.time = 'Time is required';
          isValid = false;
        }
        break;
      case 2: // Platform
        if (!meetingLink.trim()) {
          stepErrors.meetingLink = 'Meeting link is required';
          isValid = false;
        }
        break;
      case 3: // Payment
        if (isPaid && (!price || price <= 0)) {
          stepErrors.price = 'Please enter a valid price';
          isValid = false;
        }
        break;
      default:
        break;
    }
    
    setErrors(stepErrors);
    return isValid;
  };
  
  // Handle next step
  const handleNextStep = () => {
    if (validateStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };
  
  // Handle previous step
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateStep()) {
      const sessionData = {
        id: editSession ? editSession.id : Date.now(),
        title,
        description,
        date,
        time,
        platform,
        meetingLink,
        isPaid,
        price: isPaid ? price : 0,
        capacity,
        createdAt: editSession ? editSession.createdAt : new Date().toISOString(),
      };
      
      handleSave(sessionData);
      toast.success(editSession ? 'Session updated successfully!' : 'Session created successfully!');
      handleClose();
    }
  };