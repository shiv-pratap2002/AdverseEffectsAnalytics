# Adverse Effects Detection and Analysis Readme

This repository provides a comprehensive solution to extract adverse effects information from medical articles available on PubMed and Europe PMC, also it has been extended to extract discussions on Twitter as well. The process involves querying these APIs, extracting abstracts and conclusions, passing the text through ChatGPT to identify negative side effects, and finally displaying the results in a bar chart.

Much thanks to Prakhar Dhama for the frontend. 

## Demos
![alt text](https://github.com/shiv-pratap2002/AdverseEffectsAnalytics/blob/public_master/demo/Screenshot%202025-02-28%20000910.png)
![alt text](https://github.com/shiv-pratap2002/AdverseEffectsAnalytics/blob/public_master/demo/Screenshot%202025-02-28%20001002.png)
![alt text](https://github.com/shiv-pratap2002/AdverseEffectsAnalytics/blob/public_master/demo/Screenshot%202025-02-28%20001022.png)

## Requirements

- Python 3.x
- Jupyter Notebook
- Necessary Python packages (install using `pip install -r requirements.txt`)

## Usage

### 1. Data Collection

#### Querying PubMed and Europe PMC

- Utilize `metapub` and `europepmc` Python libraries to query the PubMed and Europe PMC APIs. For twitter a 3rd-Party API was used - scraper API

### 2. Text Extraction

#### Extracting Abstracts and Conclusions

- Extract relevant information such as abstracts and conclusions from the retrieved articles.

### 3. ChatGPT Interaction

#### Analyzing for Negative Side Effects

- Utilize ChatGPT to analyze the text and identify negative side effects.

### 4. Data Analysis

#### Counting and Displaying Results

- Count the occurrences of unique side effects and display the results using a bar chart.

## Using Metapub and Europe PMC APIs

### Metapub

1. **Install metapub:**

```bash
pip install metapub
```

2. **Example Usage:**

```python
from metapub import PubMedFetcher

pm_fetch = PubMedFetcher()
pubmed_results = pm_fetch.query("Your Keyword Here")
```

### Europe PMC

1. **Install requests:**

```bash
pip install requests
```

2. **Example Usage:**

```python
 base_url = "https://www.ebi.ac.uk/europepmc/webservices/rest/searchPOST"

params = {
        "query": query,
        "resultType": "core",
        "pageSize": max_results,
        "format": "json"
    }

response = requests.post(base_url, data=params)
```

Ensure you have the necessary API keys and permissions for accessing these APIs.

Feel free to modify and extend this repository to fit your specific requirements and integrate it into your workflow for adverse effects analysis in medical literature.
