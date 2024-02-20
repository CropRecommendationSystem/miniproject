import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
import joblib

# Load your training data from a file
# Replace 'path_to_training_data.csv' with the actual path to your training data file
data = pd.read_csv('C:/Users/DELL/Desktop/mini project/miniproject/Backend/Crop_Recommendation.csv')

# Assuming the last column contains the labels and the rest are features
X = data.iloc[:, :-1]  # Features
y = data.iloc[:, -1]   # Labels

# Handling missing values using SimpleImputer
imputer = SimpleImputer(strategy='mean')
X = imputer.fit_transform(X)

# Splitting the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Creating a decision tree classifier
clf = DecisionTreeClassifier()

# Training the decision tree classifier
clf.fit(X_train, y_train)

# Predicting on the test set
y_pred = clf.predict(X_test)

# Calculating the accuracy of the model
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)

# Save the trained model as a pickle file
joblib.dump(clf, 'decision_tree_model.pkl')
