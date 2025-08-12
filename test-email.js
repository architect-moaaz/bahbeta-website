// Simple test script to verify email API works locally
const handler = require('./api/send-email.js');

// Mock request and response objects
const mockReq = {
  method: 'POST',
  body: {
    name: 'Test User',
    email: 'test@example.com',
    company: 'Test Company',
    phone: '+973 1234 5678',
    service: 'mobile-web',
    message: 'This is a test message from the API function.'
  }
};

const mockRes = {
  status: (code) => ({
    json: (data) => {
      console.log(`Status: ${code}`);
      console.log('Response:', JSON.stringify(data, null, 2));
      return mockRes;
    },
    end: () => {
      console.log(`Status: ${code} - Request ended`);
      return mockRes;
    }
  }),
  setHeader: (name, value) => {
    console.log(`Header: ${name} = ${value}`);
  }
};

// Test the function
console.log('Testing email API function...');
handler(mockReq, mockRes).catch(console.error);