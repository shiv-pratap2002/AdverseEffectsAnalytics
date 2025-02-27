from sentence_transformers import SentenceTransformer
import pandas as pd
import os
import pickle
print('sbert')
sbert_model = SentenceTransformer('FremyCompany/BioLORD-2023')
ext_side_effects = pd.read_csv('backend_fastapi/utils/ExtensiveAdverseEffectsList.csv').LLT.to_list()
if not os.path.exists('embeddings.pkl'):
    standard_effects_embedding = sbert_model.encode(ext_side_effects,convert_to_tensor=True)

    with open("embeddings.pkl", "wb") as fOut:
        pickle.dump({"sentences": ext_side_effects, "standard_effects_embedding": standard_effects_embedding},
                    fOut, protocol=pickle.HIGHEST_PROTOCOL)
else:
    print("Loading pre-computed embeddings from disc")
    with open('embeddings.pkl', "rb") as fIn:
        cache_data = pickle.load(fIn)
        corpus_sentences = cache_data['sentences']
        corpus_embeddings = cache_data['standard_effects_embedding']

    standard_effects_embedding = corpus_embeddings