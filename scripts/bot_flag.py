import csv
import requests
import datetime
from tqdm import tqdm

# PolygonScan API endpoint
api_url = "https://api.polygonscan.com/api"

# PolygonScan API key
api_key = "I1ABHF2Z7QKPARYT5YZ1X46WWVE2ENEUT1"

# Input CSV file path
input_file = "input.csv"

# Output CSV file path
output_file = "output.csv"

# Start and end dates for transaction history
start_date = int(datetime.datetime(2022, 1, 6).timestamp())
end_date = int(datetime.datetime(2022, 2, 28).timestamp())

# Helper function to query PolygonScan API
def get_transaction_history(address):
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

    if data["status"] == "1":
        return data["result"]
    else:
        return None

# Read input CSV file
with open(input_file, "r") as csv_file:
    reader = csv.DictReader(csv_file)
    addresses = [row["from"] for row in reader]

# Process addresses
results = []

for address in tqdm(addresses, desc="Processing addresses", unit="address"):
    transaction_history = get_transaction_history(address)

    if transaction_history:
        consecutive_receiving = 0
        previous_address = address

        for transaction in transaction_history:
            timestamp = int(transaction["timeStamp"])

            # Check if the transaction falls within the specified date range
            if start_date <= timestamp <= end_date:
                if transaction["to"] == previous_address:
                    consecutive_receiving += 1
                else:
                    consecutive_receiving = 0

                if consecutive_receiving >= 3:
                    result = {
                        "Original Address": address,
                        "Second Address": transaction["to"]
                    }
                    results.append(result)
                    break

                previous_address = transaction["to"]

# Write output CSV file
with open(output_file, "w", newline="") as csv_file:
    fieldnames = ["Original Address", "Second Address"]
    writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(results)
