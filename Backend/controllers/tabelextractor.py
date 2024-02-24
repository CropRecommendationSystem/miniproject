import sys
import pandas as pd
import json
import tabula
import tempfile

def extract_data_from_pdf(pdf_buffer):

    with tempfile.NamedTemporaryFile(delete=False) as temp_pdf_file:
            temp_pdf_file.write(pdf_buffer)
            temp_pdf_file_path = temp_pdf_file.name
    # Read PDF data from buffer
    tables = tabula.read_pdf(temp_pdf_file_path, pages=1, multiple_tables=True)

    # Check if tables are found
    if tables:
        # Assuming you have only one table, you can select the first table
        table_df = tables[0]  # Assuming the first table is the one you want to extract
        
        # Assuming the first column contains parameters and the second column contains values
        parameter_column = table_df.iloc[:, 0].tolist()
        value_column = table_df.iloc[:, 1].tolist()
        
        # Create a dictionary to store parameter-value pairs
        table_dict = {}
        for parameter, value in zip(parameter_column, value_column):
            table_dict[parameter] = value
        
        # Convert dictionary to JSON format
        json_data = json.dumps(table_dict, indent=4)
        
        # Return the extracted data
        return json_data
    else:
        return "No tables found in the first page of the PDF."




# Read PDF file buffer from stdin
pdf_buffer = sys.stdin.buffer.read()

# Read PDF file buffer from stdin
# pdf_buffer = 'controllers/soil_test_report.pdf'

# Extract data from the PDF file buffer
extracted_data = extract_data_from_pdf(pdf_buffer)

# Print the extracted data
print(extracted_data)
