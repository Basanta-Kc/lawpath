import express from 'express';
import axios from 'axios';

interface AddressInput {
  postcode: string;
  suburb: string;
  state: string;
}

interface ValidationResult {
  isValid: boolean;
  message?: string;
}

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // Extract and validate input
    const { postcode, suburb, state } = await req.json() as AddressInput;

    if (!postcode || !suburb || !state) {
      return res.status(400).json({ isValid: false, message: 'Postcode, suburb, and state are required.' });
    }

    // Make request to Australia Post API
    const url = `https://api.auspost.com.au/address/validate?postcode=${postcode}&suburb=${suburb}&state=${state}`; // Replace with actual API endpoint
    const response = await axios.get(url, {
      headers: {
        'Authorization': `apikey ${process.env.AUSTRALIA_POST_API_KEY}` // Replace with your API key
      }
    });

    // Process API response and determine validation result
    let result: ValidationResult;
    if (response.status === 200 && response.data.addresses && response.data.addresses.length > 0) {
      result = { isValid: true };
    } else {
      result = { isValid: false, message: 'Address validation failed.' };
    }

    res.json(result);
  } catch (error) {
    console.error('Error validating address:', error);
    res.status(500).json({ isValid: false, message: 'An error occurred while validating the address.' });
  }
});

export default router;

