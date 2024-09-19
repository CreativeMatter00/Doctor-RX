import {
	BsFillSkipStartFill,
	BsFillSkipBackwardFill,
	BsFillSkipEndFill,
	BsFillSkipForwardFill,
} from "react-icons/bs";

function Pagination(props) {
	return (
		<div className="pagination">
			<div className="page-show">
				Showing
				<b> {props.page.length}</b> out of <b>{props.data.length}</b> entries
			</div>

			<div className="gotopage">
				<span>Go to Page: </span>
				<input
					type="number"
					defaultValue={props.pageIndex + 1}
					onChange={(e) => {
						const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
						props.gotoPage(pageNumber);
					}}
				/>
			</div>

			<div className="pagination-buttons">
				<button
					onClick={() => props.gotoPage(0)}
					disabled={!props.canPreviousPage}
				>
					<BsFillSkipBackwardFill className="button-icon" />
				</button>
				<button
					onClick={() => props.previousPage()}
					disabled={!props.canPreviousPage}
				>
					<BsFillSkipStartFill className="button-icon" />
				</button>
				<button onClick={() => props.nextPage()} disabled={!props.canNextPage}>
					<BsFillSkipEndFill className="button-icon" />
				</button>
				<button
					onClick={() => props.gotoPage(props.pageCount - 1)}
					disabled={!props.canNextPage}
				>
					<BsFillSkipForwardFill className="button-icon" />
				</button>
			</div>
		</div>
	);
}

export default Pagination;
