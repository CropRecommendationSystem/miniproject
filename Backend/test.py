import pandas as pd
import joblib
import sys
import json

# Read input data from stdin
input_data_json = sys.stdin.read()



# Parse input data from JSON string to Python dictionary
input_data = json.loads(input_data_json)

# Now you can use the input_data dictionary in your Python code
# For example, print the received input data
# print("Received input data:")
# print(input_data)

# Load the trained model from the pickle file
clf = joblib.load('C:/Users/DELL/Desktop/mini project/miniproject/Backend/decision_tree_model.pkl')

# Convert input dictionary to Pandas DataFrame
new_data  = pd.DataFrame.from_dict(input_data, orient='index').transpose()
# Take input from the user or use predefined values
# You can modify this part to take input in any preferred way
# new_data = pd.DataFrame({
#     'N': [90],
#     'P': [42],
#     'K': [43],
#     'temperature': [20.87],
#     'humidity': [82],
#     'ph': [6.5],
#     'rainfall': [202.93]
# })

# Make predictions using the loaded model

predicted_label = clf.predict(new_data)

# print("Predicted Label:", predicted_label)
out = str(predicted_label[0])
output_data = {"prediction": out}
# print(output_data)
# Serialize output data to JSON string
output_data_json = json.dumps(output_data)


# Print the output data to stdout
print(output_data_json)

# Ensure stdout buffer is flushed to send the output data immediately
sys.stdout.flush()