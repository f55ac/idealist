import { useNavigate } from 'react-router-dom';

export default function Sidebar(props) {
    const navigate = useNavigate();
    const onPageClick = (pagename) => {
        props.onChange(pagename);
    };

    return (
        <div className="sidebar">
            <a onClick={()=>navigate("/add")}>Add</a>
            <a onClick={()=>navigate("/browse")}>Browse</a>
        </div>
    );
}
