# 🏇 ZED Champions Tracker

A comprehensive web application for managing and tracking your ZED Champions horses, races, breeding operations, and transactions.

![ZED Champions Tracker](https://img.shields.io/badge/Next.js-14.2.30-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.2-blue?style=for-the-badge&logo=react)
![Security](https://img.shields.io/badge/Security-✅_Audited-green?style=for-the-badge)

## 🌟 Features

### 🐎 Horse Management
- **Racing Horses**: Track performance, stats, and breeding potential
- **Breeding Horses**: Manage bloodlines, genetics, and breeding records
- **Advanced Stats**: Speed, Sprint, Endurance star tracking
- **Import/Export**: Direct integration with ZED Champions API

### 🏁 Race Tracking
- **Race History**: Comprehensive race results and analysis
- **Performance Analytics**: Win rates, earnings, and progression tracking
- **Visual Charts**: Performance trends and statistics visualization
- **MM Rating**: Track and monitor MM (MatchMaking) ratings

### 💰 Financial Management
- **Transaction Tracking**: Buy/sell records and profit analysis
- **Breeding Revenue**: Stud fees and breeding income tracking
- **Cost Analysis**: Training, racing, and maintenance costs
- **ROI Calculations**: Return on investment metrics

### 🧬 Breeding Operations
- **Bloodline Management**: Track genetic lineages
- **Breeding Records**: Successful breeding history
- **Stud Fee Management**: Set and track breeding fees
- **Genetic Analysis**: Breeding potential assessment

### 📊 Analytics & Reporting
- **Interactive Charts**: Performance visualization with Chart.js
- **Data Export**: Download your data in various formats
- **Custom Reports**: Generate detailed performance reports
- **Trend Analysis**: Historical data trends and insights

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- ZED Champions API access (optional, for direct import)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/zed-champions-tracker.git
   cd zed-champions-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 🔧 Configuration

### ZED Champions API Integration

1. Navigate to the **Import** tab in the application
2. Enter your ZED Champions API Bearer token
3. Test the connection using the "Test Connection" button
4. Import your horses directly from ZED Champions

### Environment Variables
Create a `.env.local` file for environment-specific configuration:

```env
# ZED Champions API Configuration
ZED_API_BASE_URL=https://api.zedchampions.com/v1
ZED_API_TIMEOUT=30000

# Application Settings
NEXT_PUBLIC_APP_NAME="ZED Champions Tracker"
NEXT_PUBLIC_VERSION="1.0.0"
```

## 📁 Project Structure

```
zed-champions-tracker/
├── pages/                    # Next.js pages and API routes
│   ├── api/
│   │   └── zed/             # ZED API proxy endpoints
│   ├── index.js             # Main application redirect
│   └── app.js               # Alternative entry point
├── public/                  # Static assets and legacy versions
│   ├── app.js              # Legacy application logic
│   ├── index.html          # Legacy interface
│   └── debug.html          # Debug and testing tools
├── archive/                 # Legacy files (for reference only)
│   ├── legacy-tracker.html # Original comprehensive tracker
│   └── README.md           # Archive documentation
├── reference/               # External examples and references
│   ├── zedsight-reference.html # ZedSight implementation example
│   └── README.md           # Reference documentation
├── stablefields-tracker.html # 🎯 MAIN PRODUCTION TRACKER
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
├── vercel.json            # Deployment configuration
└── README.md              # This file
```

## 🎯 Usage Guide

### Adding Horses

1. **Manual Entry**: Use the Racing or Breeding tabs to manually add horses
2. **API Import**: Use the Import tab to fetch horses directly from ZED Champions
3. **Bulk Import**: Import entire racing or breeding stables at once

### Tracking Races

1. **Manual Recording**: Add race results manually with detailed information
2. **Automatic Import**: Import race history for specific horses via API
3. **Performance Analysis**: View charts and analytics in the Races tab

### Managing Finances

1. **Transaction Entry**: Record buy/sell transactions in the Transactions tab
2. **Breeding Income**: Track stud fees and breeding revenue
3. **Cost Tracking**: Monitor ongoing expenses and investments
4. **Profit Analysis**: Calculate ROI and profitability metrics

### Breeding Management

1. **Bloodline Tracking**: Maintain detailed genetic records
2. **Breeding Schedule**: Plan and track breeding activities
3. **Stud Fee Management**: Set competitive breeding fees
4. **Success Tracking**: Monitor breeding success rates

## 🔒 Security & Privacy

- **Local Storage**: All data is stored locally in your browser
- **API Security**: ZED Champions API calls are proxied for CORS compliance
- **No Data Collection**: No personal data is collected or transmitted
- **Secure Dependencies**: Regular security audits and updates

## 🛠️ Technical Details

### Architecture
- **Frontend**: Next.js 14 with React 18
- **Backend**: Next.js API routes for ZED Champions integration
- **Storage**: Browser localStorage for data persistence
- **Charts**: Chart.js for data visualization
- **Styling**: Custom CSS with modern design patterns

### API Integration
- **Proxy Design**: Secure API calls through Next.js middleware
- **CORS Handling**: Proper cross-origin request management
- **Error Handling**: Comprehensive error handling and logging
- **Rate Limiting**: Respectful API usage patterns

### Performance
- **Lazy Loading**: Efficient data loading strategies
- **Caching**: Smart caching for API responses
- **Optimization**: Minified and optimized production builds
- **Responsive**: Mobile-friendly responsive design

## 🐛 Debugging & Support

### Debug Tools
Access the debug interface at `/debug.html` for:
- Environment information
- API connectivity testing
- Local storage inspection
- Error diagnostics

### Common Issues

1. **API Connection Failed**
   - Verify your API token is correct
   - Check internet connectivity
   - Ensure API endpoint is accessible

2. **Data Not Saving**
   - Check browser localStorage settings
   - Verify sufficient storage space
   - Clear browser cache if needed

3. **Performance Issues**
   - Clear old data regularly
   - Use the reset function for fresh start
   - Check browser memory usage

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **ZED Champions** for the amazing game and API access
- **Next.js Team** for the excellent framework
- **Chart.js** for beautiful data visualization
- **Community** for feedback and feature requests

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/zed-champions-tracker/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/zed-champions-tracker/discussions)
- **Email**: support@yourdomain.com

---

**Happy Racing! 🏇✨**

> Built with ❤️ for the ZED Champions community
