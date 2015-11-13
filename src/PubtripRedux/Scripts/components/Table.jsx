import React, { Component, PropTypes } from 'react';

class Table extends Component {

	renderHead({ columns, renderHeader }) {
		return <thead>
			<tr>{
				columns.map(c => {
					return <th key={c}>{renderHeader(c)}</th>;
				})
			}</tr>
		</thead>;
	}

	renderBody(columns, items, itemToKey, renderRow) {
		return items.map(i => {
			return (
				<tr key={itemToKey(i)}>
					{ columns.map(c => <td key={c}>{ renderRow(i, c) }</td>) }
				</tr>
			);
		});
	}

	render() {
		const {
			isFetching,
			loadingLabel,
			items,
			itemToKey,
			emptyLabel,
			columns,
			renderHeader,
			renderRow
		} = this.props;
		
		if (isFetching) {
			return (<h2><i>{loadingLabel}</i></h2>);
		}
		
		if (items.length === 0) {
			return (<h2><i>{emptyLabel}</i></h2>);
		}
		
		var tableHeader = this.renderHead(this.props);
		
		return (
			<table className="table">
				{ tableHeader }
				<tbody>
					{ this.renderBody(columns, items, itemToKey, renderRow) }
				</tbody>
			</table>
		);
	}

}

Table.propTypes = {
	isFetching: PropTypes.bool.isRequired,
	loadingLabel: PropTypes.string.isRequired,
	items: PropTypes.array.isRequired,
	itemToKey: PropTypes.func.isRequired,
	emptyLabel: PropTypes.string.isRequired,
	columns: PropTypes.arrayOf(PropTypes.string).isRequired,
	renderHeader: PropTypes.func.isRequired,
	renderRow: PropTypes.func.isRequired
}

export default Table;