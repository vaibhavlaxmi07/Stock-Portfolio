# Stock-Portfolioimport yfinance as yf
import pandas as pd
from tabulate import tabulate

# Define your stock portfolio
portfolio = {
    'AAPL': {'shares': 10, 'buy_price': 150},
    'MSFT': {'shares': 5, 'buy_price': 250},
    'GOOGL': {'shares': 2, 'buy_price': 2800},
    'TSLA': {'shares': 3, 'buy_price': 600}
}

# Create lists for DataFrame
tickers = []
shares = []
buy_prices = []
current_prices = []
total_values = []
gains_losses = []

# Fetch current stock data
for symbol, data in portfolio.items():
    ticker = yf.Ticker(symbol)
    current_price = ticker.history(period='1d')['Close'].iloc[-1]
    
    total_value = data['shares'] * current_price
    gain_loss = (current_price - data['buy_price']) * data['shares']
    
    tickers.append(symbol)
    shares.append(data['shares'])
    buy_prices.append(data['buy_price'])
    current_prices.append(round(current_price, 2))
    total_values.append(round(total_value, 2))
    gains_losses.append(round(gain_loss, 2))

# Create DataFrame
df = pd.DataFrame({
    'Ticker': tickers,
    'Shares': shares,
    'Buy Price': buy_prices,
    'Current Price': current_prices,
    'Total Value': total_values,
    'Gain/Loss': gains_losses
})

# Calculate total portfolio value and total gain/loss
total_portfolio_value = df['Total Value'].sum()
total_gain_loss = df['Gain/Loss'].sum()

# Output the portfolio
print("\nYour Stock Portfolio:\n")
print(tabulate(df, headers='keys', tablefmt='pretty', showindex=False))

print(f"\nTotal Portfolio Value: ${total_portfolio_value:,.2f}")
print(f"Total Gain/Loss: ${total_gain_loss:,.2f}")
