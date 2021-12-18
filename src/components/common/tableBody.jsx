import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path) || column.content;
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item, id) => (
          <tr key={id}>
            {columns.map((column, id) => (
              <td key={id}>{this.renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
