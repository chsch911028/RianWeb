import React, { Component } from "react";
import { connect } from "react-redux";
import ProjectCalendar from "./ProjectCalendar";
import ProjectFile from "./ProjectFile/ProjectFile";
import ProjectTodo from "./ProjectTodo/ProjectTodo";
import MOCK_FILE from "../MockData/MOCK_FILE";
import MOCK_TODO from "../MockData/MOCK_TODO";
import {
  calendarSideChange
} from "../../../actions/CalendarActions";
import "./ProjectHomeMain.css";

@connect(mapState, mapDispatch)
export default class ProjectHomeMain extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      Calendar,
      Project,
      calendarSideChange
    } = this.props;
    return (
      <div className="middle ProjectHomeMain">
        <ProjectCalendar
          Calendar={Calendar}
          calendarSideChange={calendarSideChange}
        />
        <div className="projectInfo">
          <ProjectFile Data={MOCK_FILE} />
          <ProjectTodo Data={MOCK_TODO} />
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    User: state.User,
    Calendar: state.Calendar,
    Project: state.Project
  };
}

function mapDispatch(dispatch) {
  return {
    calendarSideChange: (year, month)=> {
      dispatch(calendarSideChange(year, month));
    }
  }
}
