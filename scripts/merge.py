import pandas as pd

# Read the CSV files
df_b = pd.read_csv('output.csv')
df_a = pd.read_csv('flag.csv')

# Check for existence of 'from' values in 'original columns' column
df_b['bot_flag'] = df_b['from'].isin(df_a['original_address']).astype(int)

# Save the updated CSV B with the new column
df_b.to_csv('csv_b_with_flag.csv', index=False)