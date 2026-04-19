# MarketMind AI – Smart Revenue Engine for Local Businesses

> *"Helping small businesses make smarter marketing decisions with AI-driven insights and revenue predictions."*

![Tech Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## 🎯 Problem Statement

Small and local businesses often lack the resources and expertise to:
- Understand their customer base
- Create targeted marketing campaigns
- Predict the financial impact of their marketing efforts

They end up spending on generic marketing that yields poor ROI.

---

## 💡 Solution

**MarketMind AI** is a lightweight marketing automation platform that enables small businesses to:

1. **Upload** customer data via CSV
2. **Automatically segment** customers using intelligent rules
3. **Generate AI-powered campaign recommendations** tailored to each segment
4. **Predict expected revenue** from each campaign
5. **Customize strategies** based on business type (Food, Gym, Clothing)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📤 CSV Upload | Drag-and-drop CSV upload with validation |
| 🧠 Smart Segmentation | Rule-based engine (High Value, Inactive, New, Regular) |
| 🚀 Campaign Engine | AI-powered recommendations per segment |
| 💰 Revenue Predictions | Formula-based revenue forecasting |
| 🤖 AI Explanations | Each campaign includes reasoning |
| 🏪 Business Customization | Tailored suggestions for Food, Gym, Clothing |
| ⏰ Best Time Suggestions | Optimal campaign timing per business |
| 📊 Interactive Dashboard | Charts, stats, and data tables |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js (Vite), Recharts, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| File Upload | Multer |
| CSV Parsing | csv-parser |
| Charts | Recharts |

---

## 📦 Project Structure

```
MarketMind AI/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── uploadController.js
│   │   ├── customerController.js
│   │   ├── segmentController.js
│   │   └── campaignController.js
│   ├── models/
│   │   └── Customer.js        # Mongoose schema
│   ├── routes/
│   │   ├── uploadRoutes.js
│   │   ├── customerRoutes.js
│   │   ├── segmentRoutes.js
│   │   └── campaignRoutes.js
│   ├── services/
│   │   ├── segmentationService.js  # Segmentation engine
│   │   └── campaignService.js      # Campaign + Revenue engine
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── FileUpload.jsx
│   │   │   ├── SegmentChart.jsx
│   │   │   ├── RevenueChart.jsx
│   │   │   ├── CampaignCard.jsx
│   │   │   ├── BusinessTypeSelector.jsx
│   │   │   └── CustomerTable.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
├── sample_data.csv
└── README.md
```

---

## 🔄 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/upload` | Upload CSV file |
| `GET` | `/api/customers` | Get all customers (paginated) |
| `GET` | `/api/segments` | Get segmented users |
| `GET` | `/api/campaigns` | Get campaign recommendations + revenue |

### Query Parameters:
- `GET /api/customers?segment=High Value&page=1&limit=50`
- `GET /api/segments?summary=true`
- `GET /api/campaigns?businessType=food`

---

## 🚀 How to Run

### Prerequisites
- Node.js (v18+)
- MongoDB (running locally or MongoDB Atlas)

### 1. Clone the repository
```bash
git clone <repo-url>
cd "MarketMind AI"
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file (already included):
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/marketmind
```

Start the backend:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Open the App
Visit `http://localhost:5173` in your browser.

### 5. Upload Sample Data
Use the provided `sample_data.csv` file to test the application.

---

## 📊 Segmentation Rules

| Segment | Rule |
|---------|------|
| **High Value** | `total_spent > ₹5,000` |
| **Inactive** | `last_purchase_date > 30 days ago` |
| **New** | `created_at within last 7 days` |
| **Regular** | Everyone else |

---

## 💰 Revenue Prediction Formula

```
expected_revenue = target_users × conversion_rate × avg_order_value
```

| Segment | Conversion Rate |
|---------|----------------|
| High Value | 15% |
| Inactive | 8% |
| New | 12% |
| Regular | 10% |

---

## 🔮 Future Scope

- 🤖 Integrate OpenAI for dynamic campaign copy generation
- 📧 Email automation (SendGrid/Mailchimp integration)
- 📈 A/B testing framework for campaigns
- 🔐 User authentication & multi-tenant support
- 📱 Mobile-responsive progressive web app
- 🧪 Machine learning-based segmentation
- 📊 Historical campaign performance tracking
- 🌐 Multi-language support

---

## 📄 License

MIT License © 2026 MarketMind AI

---

<p align="center">
  <strong>Built with ❤️ for small businesses everywhere</strong>
</p>
