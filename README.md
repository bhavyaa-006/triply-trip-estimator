# ✈️ Trip Estimator App

## 📦 Setup

### Backend
1. Navigate to `backend/`
2. Install dependencies: `pip install -r requirements.txt`
3. Run the server: `python backend.py`

### Frontend
1. Navigate to `frontend/`
2. Install dependencies: `npm install`
3. Run React app: `npm start`

## 🔗 Notes
- Backend runs on `http://localhost:5000`
- Frontend proxies API requests using `"proxy"` setting in `package.json`

## 🚀 Vercel Deployment

### Prerequisites
- A [Vercel](https://vercel.com) account (sign up with GitHub)
- An [OpenRouter API key](https://openrouter.ai)

### Steps to Deploy

1. **Clone and Push to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -m main
   git remote add origin https://github.com/your-username/triply-trip-estimator
   git push -u origin main
   ```

2. **Create `.env.local` file** with your OpenRouter API key:
   ```
   OPENROUTER_API_KEY=sk-or-v1-your-api-key-here
   ```

3. **Deploy to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect the configuration
   - Add environment variables:
     - Key: `OPENROUTER_API_KEY`
     - Value: Your OpenRouter API key
   - Click "Deploy"

4. **Access Your App**:
   - Once deployed, Vercel will provide a URL like `https://triply-trip-estimator.vercel.app`
   - Your app is now live!

### Project Structure for Vercel

```
/api
  /estimate.js       → POST /api/estimate
  /chat.js           → POST /api/chat
/frontend            → React app (builds to /frontend/build)
vercel.json          → Vercel configuration
package.json         → Root dependencies
.env.local           → Environment variables (not committed)
```

### Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:
- `OPENROUTER_API_KEY` - Your OpenRouter API key (required)

### Troubleshooting

- **"Could not connect to backend"**: Check that environment variables are set in Vercel
- **API key not found**: Verify `OPENROUTER_API_KEY` is in Vercel environment variables
- **Build fails**: Check that `frontend/package.json` has all required dependencies
- **CORS errors**: Already handled in serverless functions
