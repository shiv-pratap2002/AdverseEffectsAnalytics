from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pydantic import BaseModel
from utils.modularised_europepmc import from_europepmc
from utils.modularised_metapub import from_pubmed
from utils.twitter import from_twitter

load_dotenv()

app = FastAPI()

# CORS (Cross-Origin Resource Sharing) settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your frontend origin here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class RequestData(BaseModel):
    keyword: str
    source: str
    num_articles: int

@app.post("/adverse-effects")
async def adverse_event(request_data: RequestData):
    keyword = request_data.keyword
    source = request_data.source
    num_articles = request_data.num_articles
    # date_range = request_data['date_range']
    return await from_source(keyword, source, num_articles)

async def from_source(keyword, source, num_articles=20):
    if source == 'Europe_PMC':
        return await from_europepmc(keyword, num_articles)
    elif source == 'Pubmed':
        return await from_pubmed(keyword, num_articles)
    elif source=='Twitter':
        return await from_twitter(keyword,num_articles)
    else:
        raise HTTPException(status_code=400, detail="Invalid source provided")

if __name__ == '__main__':
    import uvicorn

    print('started')
    uvicorn.run("demo_app:app",  port=4000, host='0.0.0.0',reload=True)