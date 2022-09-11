import SearchBox from '../components/searchbox';
import PaginationBar from '../components/paginationbar';
import {getIdeasAll} from '../config/firebase';
import React from 'react';

export default function Browse(props) {
    const [data, setData] = React.useState(null);
    const [query, setQuery] = React.useState("");
    const [page, setPage] = React.useState(1);
    const [pageLimit, setPageLimit] = React.useState(1);

    React.useEffect(() => {
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
        setPageLimit(Math.ceil(processed.length / 10));
    };

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    }

    const handlePageChange = (newpage) => {
        //setQuery(e.target.value);
        setPage(newpage);
    }

    if (!data) { return; }
    return (
      <div>
        <h1>Browse</h1>
        <SearchBox
          value={query}
          onChange={handleSearchChange}
          placeholder="Search my ideas..."
        />
        <div className="cards-container">
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
          <PaginationBar 
            value={page} 
            limit={pageLimit}
            onChange={handlePageChange} 
          />
        </div>
      </div>
    );
}
