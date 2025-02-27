import requests
from openai import OpenAI
import json
from collections import defaultdict 
import os
from dotenv import load_dotenv
import asyncio
from sentence_transformers import util
from utils.sbert_instance import sbert_model,standard_effects_embedding,ext_side_effects
load_dotenv()

extensive_categories = {'Neurological Issues', 'Cardiovascular Issues', 'Gastrointestinal Issues', 'Respiratory Issues',
                        'Mental Health and Behavior', 'Infectious Diseases', 'General Symptoms', 'Pain and Discomfort', 'Digestive Issues', 'Dermatological Issues',
                        'Musculoskeletal Problems', 'Vision and Hearing', 'Psychiatric Disorders', 'Cancers', 'Allergies',
                        'Endocrine and Metabolic Disorders', 'Injuries'}


async def search_articles(query, max_results=5):
    base_url = "https://www.ebi.ac.uk/europepmc/webservices/rest/searchPOST"

    params = {
        "query": query,
        "resultType": "core",
        "pageSize": max_results,
        "format": "json"
    }

    response = requests.post(base_url, data=params)
    
    if response.status_code == 200:
        data = response.json()
        articles = []

        for result in data['resultList']['result']:
            print(result)
            title = result['title']
            abstract = result.get('abstractText', '')
            url = result['fullTextUrlList']['fullTextUrl'][0]['url']
            articles.append({
                "Title": title,
                "Abstract": abstract,
                "URL":url
            })
        return articles
    else:
        print(f"Error: {response.status_code}")
        return None

async def get_effects_dict(articles, client):
    # Maintain a count dict of number of abstracts where certain side effect mentioned
    final_count_dict = defaultdict(lambda : 0)
    id_articles=0
    abstract_list = list()
    #for each abstract in the list of extracted abstracts
    for article in articles:
        # This prompt checks if abstract is negative, if so then the effects discussed are 
        # stored and are categorised according to organ they target
        abstract = article['Abstract']
        if abstract:
            prompt_effects = f"""{abstract}
                after reading the above passage accurately output a json with the format:
                - "effecttype" - single word either 'yes' or 'no' telling whether the passage above includes detail of negative side effects
                - "effects" - a unique list of negative side effects are discussed in the article
                -"categories" - categorize the effects mentioned above using the list below into an ordered list
                {extensive_categories} 
                the output shouldnt be expressed in any way other than the format described above."""
            completion = client.chat.completions.create(model="gpt-4", messages=[{"role": "user", "content": prompt_effects}], temperature=0)
            local_out=completion.choices[0].message.content
            # Output is put into dict data structure
            print(local_out)
            try:
                local_dict = json.loads(local_out)
            except Exception as e:
                continue
            #If abstract is in negative light then
            if local_dict['effecttype'].lower() == 'yes':
                id_articles+=1
                count_dict = defaultdict(lambda:0)
                #For each effect listed
                for effect in local_dict['effects']:
                    count_dict[effect] += 1
                local_effects_embedding = sbert_model.encode(local_dict['effects'],convert_to_tensor=True)
                
                mapped_output = util.semantic_search(local_effects_embedding,standard_effects_embedding,top_k=1)
                print(mapped_output)
                mapped_dict=defaultdict(lambda : '')
                for idx,i in enumerate(local_dict['effects']):
                    mapped_dict[i]=ext_side_effects[mapped_output[idx][0]['corpus_id']]
                abstract_list.append({'title':article['Title'],'URL':article['URL'],'side_effects':list(mapped_dict.values())})
                print(mapped_dict)
                for i in mapped_dict.keys():
                    final_count_dict[mapped_dict[i]] += count_dict[effect]
            
    return {'side_effects':final_count_dict,'identified_articles':id_articles,'abstract_table':abstract_list}

# search_query = "vicodin"  # Replace with your desired search query
# max_results = 5  # Specify the maximum number of results to retrieve
async def from_europepmc(search_query,max_results):
    articles = await search_articles(search_query, max_results)

    if articles:
        client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        print(f"Top {max_results} Articles for '{search_query}':")
        effects_dict = await get_effects_dict(articles, client)
        return effects_dict
    else:
        return None

# print(from_europepmc('aspirin',20))