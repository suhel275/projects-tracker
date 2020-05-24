import React, { useReducer } from 'react';
import axios from 'axios';
import ProjectContext from './projectContext';
import projectReducer from './projectReducer';
import {
  GET_PROJECTS,
  ADD_PROJECT,
  DELETE_PROJECT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_PROJECT,
  FILTER_PROJECTS,
  CLEAR_PROJECTS,
  CLEAR_FILTER,
  PROJECT_ERROR,
} from '../types';

const ProjectState = (props) => {
  const initialState = {
    projects: null,
    current: null,
    filtered: null,
    error: null,
  };
  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Get Projects
  const getProjects = async () => {
    try {
      const res = await axios.get('/api/projects');

      dispatch({
        type: GET_PROJECTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROJECT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add Project
  const addProject = async (project) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/projects', project, config);

      dispatch({
        type: ADD_PROJECT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROJECT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Delete Project
  const deleteProject = async (id) => {
    try {
      await axios.delete(`/api/projects/${id}`);

      dispatch({
        type: DELETE_PROJECT,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: PROJECT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Update Project
  const updateProject = async (project) => {
    console.log(`project = ${project}`);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `/api/projects/${project._id}`,
        project,
        config
      );

      dispatch({
        type: UPDATE_PROJECT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROJECT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Clear Projects
  const clearProjects = () => {
    dispatch({ type: CLEAR_PROJECTS });
  };

  // Set Current Project
  const setCurrent = (project) => {
    dispatch({ type: SET_CURRENT, payload: project });
  };

  // Clear Current Project
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Projects
  const filterProjects = (text) => {
    dispatch({ type: FILTER_PROJECTS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addProject,
        deleteProject,
        setCurrent,
        clearCurrent,
        updateProject,
        filterProjects,
        clearFilter,
        getProjects,
        clearProjects,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
