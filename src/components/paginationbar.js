import './paginationbar.css';

export default function PaginationBar(props) {
    const onPreviousPage = () => {
        if (props.value <= 0 || props.value > props.limit)
            props.onChange(props.value-1);
    };
    const onNextPage = () => {
        if (props.value <= 0 || props.value > props.limit)
            props.onChange(props.value+1);
    };

    return (
        <div className="pagination-bar">
            <button onClick={onPreviousPage} title="previous">{"<"}</button>
            {props.value}
            <button onClick={onNextPage} title="next">{">"}</button>
        </div>
    );
}
