# Professional Weather Application

A modern, production-ready weather application built with React, TypeScript, and Tailwind CSS.

## Features

- **Real-time Weather Data**: Current conditions with comprehensive metrics
- **5-Day Forecast**: Detailed daily forecasts with hourly breakdowns
- **Location Search**: Intelligent autocomplete search with global coverage
- **Geolocation Support**: Automatic location detection
- **Unit Conversion**: Toggle between Celsius/Fahrenheit
- **Responsive Design**: Optimized for all devices
- **Professional UI**: Glassmorphism design with smooth animations
- **Error Handling**: Comprehensive error states and user feedback
- **Rate Limiting**: Built-in API request management
- **Offline Support**: Caching and graceful degradation

## Setup Instructions

### 1. Get Weather API Key

1. Sign up for a free account at [WeatherAPI.com](https://www.weatherapi.com/)
2. Navigate to your dashboard and copy your API key
3. The free tier includes 1 million API calls per month

### 2. Environment Configuration

Create a `.env` file in the project root:

```env
VITE_WEATHER_API_KEY=your_api_key_here
VITE_WEATHER_API_URL=https://api.weatherapi.com/v1
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

## Production Deployment

### Build for Production

```bash
npm run build
```

### Environment Variables for Production

Ensure these environment variables are set in your production environment:

- `VITE_WEATHER_API_KEY`: Your WeatherAPI.com API key
- `VITE_WEATHER_API_URL`: API base URL (optional, defaults to WeatherAPI.com)

### Deployment Platforms

This app can be deployed to:

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your GitHub repository
- **AWS S3 + CloudFront**: Upload build files to S3
- **Firebase Hosting**: Use Firebase CLI

## API Usage & Costs

### WeatherAPI.com Pricing

- **Free Tier**: 1M calls/month
- **Starter**: $4/month for 10M calls
- **Pro**: $10/month for 100M calls

### Rate Limiting

The app includes built-in rate limiting to prevent API quota exhaustion:
- Maximum 100 requests per minute
- Automatic request queuing
- User-friendly error messages

## Performance Optimizations

- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Weather icons cached and optimized
- **API Caching**: Location search results cached locally
- **Local Storage**: User preferences and last location saved
- **Debounced Search**: Prevents excessive API calls during typing

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Security Features

- **API Key Protection**: Environment variables prevent key exposure
- **HTTPS Only**: All API calls use secure connections
- **Input Validation**: User inputs sanitized and validated
- **Error Boundaries**: Graceful error handling prevents crashes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
1. Check the GitHub Issues page
2. Review the API documentation at WeatherAPI.com
3. Ensure your API key is valid and has sufficient quota