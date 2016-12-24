import React from 'react';
import {Table, ColumnGroup, Column, Cell} from 'fixed-data-table';
import ResourcePlanActions from '../../actions/ResourcePlanActions';
import {calculateWeeks} from '../../utils/ResourcePlanUtils';

class ResourcePlanTable extends React.Component {

  numberOfResources() {
    return this.props.resourcePlans.length;
  }

  numberOfWeeks() {
    return this.props.resourcePlans[0].allocations.length;
  }

  handleNameChanged(resourcePlanId, resourceName) {
    ResourcePlanActions.updateResourceName(resourcePlanId, resourceName);
  }

  handleWeeklyAllocationChanged(resourcePlanId, weekId, hours) {
    console.log(resourcePlanId + '/' + weekId + '/' + hours);
  }

  renderWeeklyAllocationColumns() {
    const numberOfWeeks = this.numberOfWeeks();
    const headers = calculateWeeks(this.props.startDate, numberOfWeeks);
    let weekColumns = [];

    for (let weekId = 0; weekId < numberOfWeeks; weekId++) {
      weekColumns.push(
        <Column
          key={weekId}
          header={<Cell>{headers[weekId].weekStarting.format('DD-MMM-YYYY')}</Cell>}
          width={105}
          align="center"
          cell={({rowIndex}) => (
            <input type="text"
              className="center-align"
              value={this.props.resourcePlans[rowIndex].allocations[weekId]}
              onChange={(e) => {
                this.handleWeeklyAllocationChanged(rowIndex, weekId, e.target.value);
              }}/>
          )}
        />
      );
    }

    return weekColumns;
  }

  render() {
    const numberOfResources = this.numberOfResources();
    const weekColumns = this.renderWeeklyAllocationColumns();

    return (
      <Table
        headerHeight={50}
        rowsCount={numberOfResources}
        rowHeight={90}
        groupHeaderHeight={50}
        width={800}
        maxHeight={600}>
        <ColumnGroup
          fixed={true}
          header={<Cell>Resource</Cell>}>
          <Column
            fixed={true}
            header={<Cell>#</Cell>}
            width={40}
            cell={({rowIndex}) => (rowIndex + 1)}
          />
          <Column
            fixed={true}
            header={<Cell>Name</Cell>}
            width={220}
            cell={({rowIndex}) => (
              <input type="text"
                value={this.props.resourcePlans[rowIndex].name}
                onChange={(e) => {
                  this.handleNameChanged(rowIndex, e.target.value);
                }}
              />
            )}
          />
        </ColumnGroup>
        <ColumnGroup
          header={<Cell>Allocations</Cell>}>
          {weekColumns}
        </ColumnGroup>
      </Table>
    );
  }
}

ResourcePlanTable.propTypes = {
  startDate: React.PropTypes.instanceOf(Date),
  resourcePlans: React.PropTypes.array
};

export default ResourcePlanTable;
