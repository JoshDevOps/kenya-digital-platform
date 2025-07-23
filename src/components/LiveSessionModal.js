import React, { useState, useEffect } from 'react';

const LiveSessionModal = ({ show, handleClose, handleSave, editSession = null }) => {
  const [title, setTitle] = useState(editSession ? editSession.title : '');
  const [description, setDescription] = useState(editSession ? editSession.description : '');
  const [date, setDate] = useState(editSession ? editSession.date : '');
  const [time, setTime] = useState(editSession ? editSession.time : '');
  const [platform, setPlatform] = useState(editSession ? editSession.platform : 'zoom');
  const [meetingLink, setMeetingLink] = useState(editSession ? editSession.meetingLink : '');
  const [isPaid, setIsPaid] = useState(editSession ? editSession.isPaid : false);
  const [price, setPrice] = useState(editSession ? editSession.price : 0);
  const [capacity, setCapacity] = useState(editSession ? editSession.capacity || 20 : 20);

  const handleSubmit = (e) => {
    e.preventDefault();
    
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
    handleClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">
          {editSession ? 'Edit Session' : 'Create Live Session'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="zoom">Zoom</option>
              <option value="teams">Microsoft Teams</option>
              <option value="meet">Google Meet</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Meeting Link</label>
            <input
              type="url"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isPaid}
                onChange={(e) => setIsPaid(e.target.checked)}
                className="mr-2"
              />
              Paid Session
            </label>
          </div>
          
          {isPaid && (
            <div>
              <label className="block text-sm font-medium mb-1">Price ($)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full p-2 border rounded"
                min="0"
                step="0.01"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-1">Capacity</label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              className="w-full p-2 border rounded"
              min="1"
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {editSession ? 'Update' : 'Create'} Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LiveSessionModal;