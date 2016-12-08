import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import ResourcePlanActions from '../../actions/ResourcePlanActions';

class ResourcePlanTable extends React.Component {

  numberOfResources() {
    return this.props.resourcePlans.length;
  }

  handleNameChanged(id, name) {
    ResourcePlanActions.updateResourceName(id, name);
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
          cell={({rowIndex}) => (
            <input type="text"
              value={this.props.resourcePlans[rowIndex].name}
              onChange={(e) => {
                this.handleNameChanged(rowIndex, e.target.value);
              }}/>
          )}
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
