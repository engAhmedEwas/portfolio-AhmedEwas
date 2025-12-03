const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

async function createAdmin() {
    // Generate hash for admin123
    const hash = await bcrypt.hash('admin123', 10);
    console.log('Generated hash:', hash);
    
    // Verify it works
    const isValid = await bcrypt.compare('admin123', hash);
    console.log('Hash verification:', isValid);
    
    // Read database
    const dbPath = path.join(__dirname, '../data/db.json');
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    
    // Update Ahmed's password
    const user = db.users.find(u => u.email === 'eng.ahmedewas@gmail.com');
    if (user) {
        user.passwordHash = hash;
        user.isAdmin = true;
        console.log('Updated user:', user.email);
    }
    
    // Write back
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    console.log('Database updated successfully!');
    console.log('Login with: eng.ahmedewas@gmail.com / admin123');
}

createAdmin().catch(console.error);
