import React from 'react';
import ResourcePlanStore from '../../stores/ResourcePlanStore';
import Nav from './Nav';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = ResourcePlanStore.getAll();

    this.onDataChange = this.onDataChange.bind(this);
  }

  componentDidMount() {
    ResourcePlanStore.addChangeListener(this.onDataChange);
  }

  componentWillUnmount() {
    ResourcePlanStore.removeChangeListener(this.onDataChange);
  }

  onDataChange() {
    this.setState(ResourcePlanStore.getAll());
  }

  render() {
    return (
      <div>
        <Nav />
        {this.props.children &&
         React.cloneElement(this.props.children, {
           startDate: this.state.startDate,
           resourcePlans: this.state.resourcePlans
         })}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.any
};

export default App;
