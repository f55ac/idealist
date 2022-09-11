import {getIdeasAll, addOpinion} from '../config/firebase';
import React from 'react';

export default function Recall(props) {
    const [data, setData] = React.useState(null);
    const [cardNumber, setCardNumber] = React.useState(1);

    React.useEffect(() => {
        getIdeasAll(callbackSetData);
    }, []);

    const processData = (rawData) => {
        let data = Object.values(rawData);
        return data;
    }
    const callbackSetData = (rawData) => {
        const processed = processData(rawData);
        setData(processed);
    };

    const onApproveClick = (uuid) => {
        const epoch = Math.round(new Date().getTime() / 1000);
        addOpinion([uuid, true, epoch]);
    }
    const onDisapproveClick = (uuid) => {
        const epoch = Math.round(new Date().getTime() / 1000);
        addOpinion([uuid, true, epoch]);
    }
         
    
    return (
        <div>
          <h1>Recall</h1>
          <div className="recall-container">
            <div className="idea-card">
                <div>Hmm</div> 
                <div class="recall-buttons">
                    <button className="approve-button">Good idea</button>
                    <button className="disapprove-button">Meh idea</button>
                </div>
            </div>
          </div>
        </div>
    )
}
