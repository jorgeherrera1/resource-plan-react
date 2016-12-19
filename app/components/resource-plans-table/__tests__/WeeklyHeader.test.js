import React from 'react';
import {shallow} from 'enzyme';
import WeeklyHeader from '../WeeklyHeader';
import moment from 'moment';

it('should render header', () => {
  const weeks = [
    {weekStarting: moment('2016-12-04'), weekEnding: moment('2016-12-10')},
    {weekStarting: moment('2016-12-11'), weekEnding: moment('2016-12-17')},
    {weekStarting: moment('2016-12-18'), weekEnding: moment('2016-12-24')}
  ];

  const weeklyHeader = shallow(
    <WeeklyHeader
      weeks={weeks} />
  );

  expect(weeklyHeader.type()).toBe('tr');
  expect(weeklyHeader.children().length).toBe(6);
  expect(weeklyHeader.childAt(0).html()).toBe(
    '<th class="rp-resource-id-col">#</th>'
  );
  expect(weeklyHeader.childAt(1).html()).toBe(
    '<th class="rp-resource-name-col">Resource</th>'
  );
  expect(weeklyHeader.find('.rp-week-col').at(0).html()).toBe(
    '<th class="rp-week-col center-align">04-Dec-2016<br/>10-Dec-2016</th>'
  );
  expect(weeklyHeader.find('.rp-week-col').at(1).html()).toBe(
    '<th class="rp-week-col center-align">11-Dec-2016<br/>17-Dec-2016</th>'
  );
  expect(weeklyHeader.find('.rp-week-col').at(2).html()).toBe(
    '<th class="rp-week-col center-align">18-Dec-2016<br/>24-Dec-2016</th>'
  );
  expect(weeklyHeader.children().last().html()).toBe(
    '<th class="rp-resource-totals-col center-align">Total</th>'
  );
});
