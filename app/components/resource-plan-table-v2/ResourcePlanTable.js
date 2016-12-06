import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';

class ResourcePlanTable extends React.Component {

  numberOfResources() {
    return this.props.resourcePlans.length;
  }

  render() {
    const numberOfResources = this.numberOfResources();

    return (
      <Table
        headerHeight={50}
        rowsCount={numberOfResources}
        rowHeight={50}
        width={800}
        maxHeight={600}>
        <Column
          header={<Cell>#</Cell>}
          width={40}
          cell={({rowIndex}) => (rowIndex + 1)}
        />
        <Column
          header={<Cell>Name</Cell>}
          width={220}
          cell={({rowIndex}) => (this.props.resourcePlans[rowIndex].name)}
        />
      </Table>
    );
  }
}

ResourcePlanTable.propTypes = {
  startDate: React.PropTypes.instanceOf(Date),
  resourcePlans: React.PropTypes.array
};

export default ResourcePlanTable;
