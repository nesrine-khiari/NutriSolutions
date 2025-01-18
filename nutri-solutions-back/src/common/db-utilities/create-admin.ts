import * as bcrypt from 'bcrypt';

async function hashPassword() {
  const password = 'admin123'; // Replace with your desired password
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log('Hashed Password:', hashedPassword);
}

hashPassword()
  .then(() => {
    console.log('Password hashing completed.');
    process.exit(0); // Exit after hashing
  })
  .catch((error) => {
    console.error('Error hashing password:', error);
    process.exit(1); // Exit with error
  });
