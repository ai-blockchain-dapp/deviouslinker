import requests
import networkx as nx
import matplotlib.pyplot as plt

def fetch_transaction_data(address, start_time, end_time):
    url = f"https://api.polygonscan.com/api?module=account&action=txlist&address={address}"
    response = requests.get(url)
    data = response.json()
    return data['result']

def create_directional_graph(transactions):
    graph = nx.DiGraph()
    for tx in transactions:
        sender = tx['from']
        receiver = tx['to']
        amount = float(tx['value']) / 1e18  # Convert value from wei to the appropriate unit
        graph.add_edge(sender, receiver, amount=amount)
    return graph

def visualize_graph(graph):
    plt.figure(figsize=(12, 8))

    pos = nx.spring_layout(graph, k=0.6)

    node_colors = ['red' if node == '0x156A6dF911415CffC6e76eDc05c72134f6828166' else 'lightblue' for node in graph.nodes]
    edge_colors = 'gray'

    # Draw edges
    nx.draw_networkx_edges(graph, pos, alpha=0.5, edge_color=edge_colors)

    # Draw nodes
    nx.draw_networkx_nodes(graph, pos, node_color=node_colors, node_size=800, alpha=0.8)

    # Draw node labels
    node_labels = {node: node[:6] for node in graph.nodes}  # Truncate address labels to the first 6 digits
    nx.draw_networkx_labels(graph, pos, labels=node_labels, font_size=8, font_color='black', verticalalignment='bottom')

    # Remove axis and adjust margins
    plt.axis('off')
    plt.margins(0.1, 0.1)

    plt.tight_layout()
    plt.show()

address = '0x156A6dF911415CffC6e76eDc05c72134f6828166'  # Replace with the address you want to analyze
start_time = 1641427200  # Replace with the start time (UNIX timestamp) of the desired time period
end_time = 1641577348  # Replace with the end time (UNIX timestamp) of the desired time period
transaction_data = fetch_transaction_data(address, start_time, end_time)
graph = create_directional_graph(transaction_data)
visualize_graph(graph)