import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@ayoglow.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    skinType: 'Combination',
    skinConcerns: ['Hyperpigmentation', 'Fine Lines']
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    skinType: 'Dry',
    skinConcerns: ['Dryness', 'Sensitivity']
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
    skinType: 'Oily',
    skinConcerns: ['Acne', 'Excess Oil']
  },
];

export default users; 