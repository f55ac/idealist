import { addIdea, getIdeasAll } from '../config/firebase';
import React from 'react';

export default function Add(props) {
    const [data, setData] = React.useState(null);
    const [query, setQuery] = React.useState("");

    React.useEffect(() => {
        // only fetch data first time
        if (!query) getIdeasAll(callbackSetData);
        else callbackSetData(data);
    }, [query]);

    const processData = (rawData) => {
        const data = Object.values(rawData);
        let processed = [];
        if (query) {
            data.forEach((elem) => {
                if (elem.description
                    .toLowerCase()
                    .includes(query)) 
                {
                    console.log(elem.description);
                    processed.push(elem);
                }
            });
        }

        return (processed.length ? processed : data);
    }
    const callbackSetData = (rawData) => {
        const processed = processData(rawData);
        setData(processed);
    };

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    }
    const handleIdeaAdd = (e) => {
        const epoch = Math.round(new Date().getTime() / 1000);
        if (query) addIdea([query, epoch]);
        
        setQuery("");
    }

    let recall_cards = "";
    if (query) {
        recall_cards = (
          <div className="cards-container">
            <div>Similar ideas</div>
            {data.map((idea) => (
              <div 
                key={idea.uuid}
                className="idea-card"
              >
                <div className="card-header">
                  <div id="description">{idea.description}</div>
                  <div id="date">{new Date(idea.epoch*1000).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        );
    }

    return (
      <div>
        <h1>Add</h1>
        <div className="add-bar">
            <textarea className="add-box"
                type="text" placeholder="My idea"
                value={query} onChange={handleQueryChange}
            />
            <button className="add-button"
                onClick={handleIdeaAdd}
            >
            Add
            </button>
        </div>
        {recall_cards}
      </div>
    );
}
