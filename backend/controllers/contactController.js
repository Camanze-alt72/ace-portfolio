import Contact from '../models/contact.js';

// Create new contact message
export const createContact = async (req, res, next) => {
  try {
    const { firstName, lastName, contactNumber, email, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !contactNumber || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create new contact document
    const contact = new Contact({
      firstName,
      lastName,
      contactNumber,
      email,
      message
    });

    // Save to database
    await contact.save();

    res.status(201).json({
      message: 'Message sent successfully',
      contact: contact
    });
  } catch (error) {
    next(error);
  }
};

// Get all contact messages (for admin)
export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: 'All contact messages',
      contacts: contacts
    });
  } catch (error) {
    next(error);
  }
};

// Delete contact message by ID
export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    res.status(200).json({
      message: 'Contact message deleted successfully',
      contact: contact
    });
  } catch (error) {
    next(error);
  }
};
