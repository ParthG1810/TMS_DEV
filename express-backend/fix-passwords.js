require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function fixPasswords() {
  console.log('Fixing user passwords in database...\n');

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'tms_db',
    });

    console.log(' Connected to database\n');

    // All users will have password "demo1234"
    const password = 'demo1234';
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(`Hashed password for "demo1234": ${hashedPassword}\n`);

    // Update all users
    const users = [
      { email: 'demo@minimals.cc', name: 'Demo Admin' },
      { email: 'john.doe@example.com', name: 'John Doe' },
      { email: 'jane.smith@example.com', name: 'Jane Smith' },
      { email: 'mike.johnson@example.com', name: 'Mike Johnson' },
    ];

    for (const user of users) {
      const [result] = await connection.query(
        'UPDATE users SET password_hash = ? WHERE email = ?',
        [hashedPassword, user.email]
      );

      if (result.affectedRows > 0) {
        console.log(` Updated password for ${user.name} (${user.email})`);
      } else {
        console.log(`   User not found: ${user.email}`);
      }
    }

    console.log('\n All passwords have been updated!');
    console.log('\nYou can now login with:');
    console.log('  Email: demo@minimals.cc');
    console.log('  Password: demo1234');

    await connection.end();
  } catch (error) {
    console.error('L Error:', error.message);
    process.exit(1);
  }
}

fixPasswords();
