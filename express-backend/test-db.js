require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function testDatabase() {
  console.log('Testing database connection...');
  console.log('DB Config:', {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
  });

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'tms_db',
    });

    console.log(' Database connected successfully\n');

    // Check if users table exists
    const [tables] = await connection.query("SHOW TABLES LIKE 'users'");
    console.log('Users table exists:', tables.length > 0);

    if (tables.length > 0) {
      // Check for demo user
      const [users] = await connection.query(
        "SELECT id, email, display_name, password_hash FROM users WHERE email = 'demo@minimals.cc'"
      );

      console.log('\nDemo user found:', users.length > 0);

      if (users.length > 0) {
        const user = users[0];
        console.log('User details:', {
          id: user.id,
          email: user.email,
          displayName: user.display_name,
        });
        console.log('Password hash exists:', !!user.password_hash);
        console.log('Password hash length:', user.password_hash?.length);

        // Test password verification
        const testPassword = 'demo1234';
        const isValid = await bcrypt.compare(testPassword, user.password_hash);
        console.log(`\nPassword 'demo1234' matches:`, isValid);

        // If password doesn't match, let's hash the correct password
        if (!isValid) {
          console.log('\n�  Password in database does not match "demo1234"');
          console.log('Current hash:', user.password_hash);

          // Generate correct hash
          const correctHash = await bcrypt.hash('demo1234', 10);
          console.log('\nCorrect hash for "demo1234":', correctHash);
          console.log('\n🔧 To fix, run this SQL:');
          console.log(`UPDATE users SET password_hash = '${correctHash}' WHERE email = 'demo@minimals.cc';`);
        }
      } else {
        console.log('\n�  No demo user found. Run seed.sql first.');
      }

      // Check all users
      const [allUsers] = await connection.query('SELECT id, email, display_name FROM users');
      console.log(`\nTotal users in database: ${allUsers.length}`);
      allUsers.forEach(u => {
        console.log(`  - ${u.email} (${u.display_name})`);
      });
    } else {
      console.log('�  Users table does not exist. Run schema.sql first.');
    }

    await connection.end();
  } catch (error) {
    console.error('L Database error:', error.message);
    process.exit(1);
  }
}

testDatabase();
