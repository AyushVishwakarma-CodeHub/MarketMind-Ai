const fs = require('fs');

const firstNames = ['Aiden', 'Mia', 'Liam', 'Emma', 'Noah', 'Olivia', 'Elijah', 'Ava', 'James', 'Isabella', 'William', 'Sophia', 'Benjamin', 'Amelia', 'Lucas', 'Harper', 'Henry', 'Evelyn', 'Alexander', 'Abigail', 'Michael', 'Emily', 'Daniel', 'Elizabeth', 'Matthew', 'Mila', 'Samuel', 'Ella', 'David', 'Avery', 'Joseph', 'Sofia', 'Carter', 'Camila', 'Owen', 'Aria', 'Wyatt', 'Scarlett', 'John', 'Victoria', 'Jack', 'Madison', 'Luke', 'Luna', 'Jayden', 'Grace', 'Dylan', 'Chloe', 'Grayson', 'Penelope', 'Levi', 'Layla', 'Isaac', 'Riley', 'Gabriel', 'Zoey', 'Julian', 'Nora', 'Mateo', 'Lily', 'Anthony', 'Eleanor', 'Jaxon', 'Hannah', 'Lincoln', 'Lillian', 'Joshua', 'Addison', 'Christopher', 'Aubrey', 'Andrew', 'Ellie', 'Theodore', 'Stella', 'Caleb', 'Natalie', 'Ryan', 'Zoe', 'Asher', 'Leah', 'Nathan', 'Hazel', 'Thomas', 'Violet', 'Leo', 'Aurora'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes', 'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper', 'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson', 'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes', 'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers', 'Long', 'Ross', 'Foster', 'Jimenez'];

const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'company.com', 'business.net'];

// Helper to get random number
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper to generate a realistic looking last purchase date
const getRandomDate = () => {
    // Dates mostly biased towards the last 3 months, with some inactive
    const isInactive = Math.random() < 0.25; // 25% chance of being inactive (>30 days ago)
    const now = new Date();
    
    let daysAgo;
    if (isInactive) {
        daysAgo = getRandomInt(35, 180); // Inactive: 35 to 180 days ago
    } else {
        daysAgo = getRandomInt(1, 29); // Active: 1 to 29 days ago
    }
    
    const date = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
    return date.toISOString().split('T')[0];
};

// Helper to generate a realistic looking spend amount
const getRandomSpend = () => {
    const isHighValue = Math.random() < 0.15; // 15% high value shoppers
    if (isHighValue) {
        return getRandomInt(5000, 15000); // High spend: 5k+
    }
    return getRandomInt(100, 4900); // Regular spend: 100 to 4.9k
};

// Generate the CSV data
const generateCSV = (numRecords) => {
    let csvContent = 'name,email,last_purchase_date,total_spent\n';
    
    for (let i = 0; i < numRecords; i++) {
        const firstName = firstNames[getRandomInt(0, firstNames.length - 1)];
        const lastName = lastNames[getRandomInt(0, lastNames.length - 1)];
        const fullName = `${firstName} ${lastName}`;
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${getRandomInt(1, 999)}@${domains[getRandomInt(0, domains.length - 1)]}`;
        
        csvContent += `${fullName},${email},${getRandomDate()},${getRandomSpend()}\n`;
    }
    
    return csvContent;
};

// Write large file
const data = generateCSV(2500); // 2500 Customers!
fs.writeFileSync('c:\\Users\\ayush\\Desktop\\MarketMind AI\\large_dataset_2500.csv', data);
console.log('✅ Generated massive dataset: large_dataset_2500.csv');
