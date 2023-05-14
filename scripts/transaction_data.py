import requests
import pandas as pd
import datetime
from tqdm import tqdm

# PolygonScan API endpoint
api_url = "https://api.polygonscan.com/api"

# PolygonScan API key (replace with your own)
api_key = "I1ABHF2Z7QKPARYT5YZ1X46WWVE2ENEUT1"

# Function to fetch transaction history for an address within a specified date range
def fetch_transaction_history(address, start_date, end_date):
    payload = {
        "module": "account",
        "action": "txlist",
        "address": address,
        "startblock": 0,
        "endblock": 99999999,
        "sort": "asc",
        "apikey": api_key
    }
    response = requests.get(api_url, params=payload)
    data = response.json()

    # Filter transactions within the specified date range
    transactions = [tx for tx in data["result"] if start_date <= int(tx["timeStamp"]) <= end_date]

    return transactions

# Load addresses from a CSV file
df = pd.read_csv("input.csv")

# Convert Unix timestamps to datetime objects
start_date = datetime.datetime.utcfromtimestamp(1641427200)
end_date = datetime.datetime.utcfromtimestamp(1646092799)

# Create new columns
df["potential_wallet_address"] = ""
df["transaction_amount"] = ""
df["total_transactions"] = ""
df["address_age"] = ""

# Iterate over each row in the dataframe with tqdm progress bar
for index, row in tqdm(df.iterrows(), total=len(df), desc="Processing"):
    address = row["from"]
    transactions = fetch_transaction_history(address, start_date.timestamp(), end_date.timestamp())

    if transactions:
        # Sort transactions by timestamp in descending order
        transactions.sort(key=lambda tx: int(tx["timeStamp"]), reverse=True)

        # Extract the most recent transaction details
        most_recent_tx = transactions[0]
        most_recent_address = most_recent_tx["to"]
        transaction_amount = most_recent_tx["value"]
        total_transactions = len(transactions)

        # Calculate the address age
        oldest_tx_timestamp = int(transactions[-1]["timeStamp"])
        youngest_tx_timestamp = int(most_recent_tx["timeStamp"])
        address_age = youngest_tx_timestamp - oldest_tx_timestamp

        # Update the corresponding columns in the dataframe
        df.at[index, "potential_wallet_address"] = most_recent_address
        df.at[index, "transaction_amount"] = transaction_amount
        df.at[index, "total_transactions"] = total_transactions
        df.at[index, "address_age"] = address_age

# Save the modified dataframe to a new CSV file
df.to_csv("output.csv", index=False)
