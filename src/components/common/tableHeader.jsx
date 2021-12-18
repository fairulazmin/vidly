import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;

    return sortColumn.order === "asc" ? (
      <i className="fa fa-sort-up ml-2" />
    ) : (
      <i className="fa fa-sort-down ml-2" />
    );
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column, id) => (
            <th
              className="clickable"
              key={id}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
