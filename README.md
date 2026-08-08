QuantEdge
A quant trading dashboard for backtesting and paper-trading algorithmic strategies — built with React, TypeScript, and real-time WebSocket price feeds.
Live DemoQuantEdge is a full-stack quantitative trading research and paper-trading platform built to experiment with trading strategies, backtesting, performance analysis, and eventually broker integrations.
The project is designed around a modern React + TypeScript frontend with an Express + MongoDB backend, providing a foundation for a multi-user fintech/SaaS application.
⚠️ QuantEdge is a research and paper-trading project. It does not provide financial advice and should not be used for real-money trading without proper validation and risk controls.
🚀 Features
📊 Trading Dashboard
Portfolio/wallet overview
Today's P&L
Win rate
Active strategy
Equity curve visualization
Strategy leaderboard
Strategy comparison
🧪 Backtesting
Multi-strategy backtesting
Momentum strategy
Mean-reversion strategy
Configurable starting capital
Configurable lot size
Trading fees
Equity curve visualization
Trade history
P&L calculation
📁 Data Export
Export research results directly from the browser:
Trade history → CSV
Equity curve → CSV
🕒 Backtest History
Store previous backtest runs locally
Replay previous results
Compare different strategy configurations
🤖 Strategy Research
The architecture supports adding:
Additional trading strategies
Parameter optimization
Performance comparison
Risk metrics
Strategy ranking
📈 Paper Trading
A simulated trading environment for testing strategies without real capital.
🗄️ Backend & MongoDB
Backend architecture includes:
Node.js
Express
MongoDB
Mongoose
REST API
Backtest persistence
Backtest history retrieval
🔌 Broker Integration Architecture
QuantEdge is designed with future broker integration in mind, including potential integration with Zerodha APIs.
The current project focuses on safe research and paper trading rather than directly placing real orders.
🏗️ Architecture
                    ┌─────────────────────┐
                    │      QuantEdge      │
                    │   Trading Platform  │
                    └──────────┬──────────┘
                               │
              ┌────────────────┴────────────────┐
              │                                 │
              ▼                                 ▼
     ┌─────────────────┐              ┌─────────────────┐
     │ React Frontend  │              │ Express Backend │
     │                 │              │                 │
     │ TypeScript      │              │ Node.js         │
     │ Vite            │              │ REST API        │
     │ Tailwind v4     │              │                 │
     │ Recharts        │              │                 │
     └────────┬────────┘              └────────┬────────┘
              │                                │
              │                                ▼
              │                       ┌─────────────────┐
              │                       │    MongoDB      │
              │                       │                 │
              │                       │ Backtest Data   │
              │                       │ History         │
              └───────────────────────┴─────────────────┘
📂 Project Structure
quant-trading-app/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── EquityCurve.tsx
│   │   ├── LeaderBoard.tsx
│   │   ├── navbar.tsx
│   │   ├── sidebar.tsx
│   │   ├── StatCard.tsx
│   │   └── StrategyComparison.tsx
│   │
│   ├── screen/
│   │   └── pages/
│   │       ├── Dashboard.tsx
│   │       ├── Backtesting.tsx
│   │       ├── PaperTrading.tsx
│   │       └── login.tsx
│   │
│   ├── services/
│   │   ├── backtestEngine.ts
│   │   ├── equityAnalytics.ts
│   │   ├── optimizer.ts
│   │   ├── paperEngine.ts
│   │   └── strategyEngine.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── server/
│   ├── models/
│   │   └── Backtest.ts
│   │
│   ├── routes/
│   │   └── backtests.ts
│   │
│   ├── db.ts
│   ├── index.ts
│   └── package.json
│
├── package.json
├── vite.config.ts
└── README.md
🛠️ Tech Stack
Technology
Purpose
React 19
Frontend UI
TypeScript
Type-safe development
Vite
Fast development/build tooling
Tailwind CSS v4.1
UI styling
Recharts
Equity curves and financial charts
Node.js
Backend runtime
Express.js
REST API
MongoDB
Persistent backtest storage
Mongoose
MongoDB object modeling
Git/GitHub
Version control
💡 Why These Technologies?
React + TypeScript
React provides a component-based architecture while TypeScript makes the trading and financial data models safer.
For example:
type Trade = {
  entryPrice: number;
  exitPrice: number;
  pnl: number;
};
This helps prevent accidental misuse of trading data.
Vite
Vite provides extremely fast development feedback and a lightweight frontend build system.
Tailwind CSS v4.1
QuantEdge uses the modern Tailwind v4 CSS-first approach:
@import "tailwindcss";
This keeps the styling setup simple while allowing the dashboard to be built rapidly.
Recharts
Recharts is used for financial visualization such as:
Equity curves
P&L
Strategy performance
Future performance analytics
Express
Express provides a lightweight REST API layer between the React application and MongoDB.
Example:
POST /api/backtests
GET  /api/backtests
MongoDB
MongoDB is used to persist backtesting results and research history.
This allows QuantEdge to move from:
Browser-only research
to:
Persistent research platform
🧪 Example Backtest Flow
Market Data
     │
     ▼
Strategy
     │
     ▼
Trade Generation
     │
     ▼
Fees + Lot Size
     │
     ▼
Equity Calculation
     │
     ├──────────────► Trade History
     │
     ├──────────────► Equity Curve
     │
     └──────────────► Total P&L
                         │
                         ▼
                    MongoDB
📊 Supported Strategies
Momentum
The current momentum strategy looks for price movement in the same direction as the previous price movement.
Price ↑ → Entry
Price ↓ → Exit
Mean Reversion
The current implementation provides a simple mean-reversion research model.
The strategy architecture is intentionally modular so additional strategies can be added later.
⚙️ Getting Started
1. Clone the repository
git clone https://github.com/YOUR_USERNAME/quant-trading-app.git
cd quant-trading-app
2. Install frontend dependencies
npm install
3. Start the frontend
npm run dev
The Vite development server will run on:
http://localhost:5173
🗄️ Backend Setup
Go into the backend:
cd server
Install backend dependencies:
npm install
Start the backend:
npm run dev
The API runs on:
http://localhost:4000
🔐 Environment Variables
For local MongoDB:
MONGO_URL=mongodb://127.0.0.1:27017/quantedge
For MongoDB Atlas:
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>/<database>
Never commit credentials or .env files to GitHub.
Add:
.env
to .gitignore.
🔌 API
Save Backtest
POST /api/backtests
Example:
{
  "userId": "demo-user",
  "result": {
    "strategy": "Momentum",
    "totalPnL": 2450,
    "trades": []
  }
}
Get Backtest History
GET /api/backtests
Returns previously stored backtests.
🛣️ Roadmap
✅ Completed
[x] React trading dashboard
[x] Tailwind CSS v4.1
[x] Equity curve
[x] Strategy leaderboard
[x] Strategy comparison
[x] Backtesting engine
[x] Multi-strategy backtesting
[x] Capital configuration
[x] Lot-size configuration
[x] Fee configuration
[x] Trade history
[x] CSV export
[x] Backtest history/replay
[x] Paper trading foundation
[x] Express backend foundation
[x] MongoDB persistence architecture
🚧 In Progress
[ ] Backend-connected backtest history
[ ] Strategy optimizer UI
[ ] Advanced performance metrics
[ ] Risk management
[ ] Real-time WebSocket market data
[ ] Authentication
[ ] Multi-user accounts
🔮 Future
[ ] Zerodha API integration
[ ] Broker abstraction layer
[ ] Live market data
[ ] Paper → live trading workflow
[ ] SaaS subscriptions
[ ] Role-based access control
[ ] Cloud deployment
[ ] CI/CD
[ ] Advanced portfolio analytics
🔒 Trading Safety
QuantEdge is primarily designed for:
Research
   ↓
Backtesting
   ↓
Optimization
   ↓
Paper Trading
   ↓
Validation
   ↓
Potential Live Integration
Real broker execution should only be enabled after implementing proper authentication, order validation, risk limits, logging, monitoring, and kill-switch mechanisms.
🎯 Project Goals
QuantEdge aims to become a complete quantitative trading research platform where traders and developers can:
Build strategies
Backtest strategies
Compare strategies
Analyze performance
Optimize parameters
Store research results
Paper trade
Eventually connect to supported brokers
👨‍💻 Author
Abhinav Prasad
Built with:
React + TypeScript + Tailwind CSS + Node.js + Express + MongoDB
⭐ If you find this project interesting
Give the repository a ⭐ and follow the development of QuantEdge as it evolves from a backtesting application into a complete quantitative trading platform.