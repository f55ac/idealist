import './searchbox.css';

export default function SearchBox(props) {
    return (
        <div >
          <input className="search-box"
            type="text" placeholder={props.placeholder}
            value={props.value} onChange={props.onChange}/>
        </div>
    );
}
