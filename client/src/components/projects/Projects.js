import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ProjectItem from './ProjectItem';
import Preloader from '../layout/Preloader';
import ProjectContext from '../../context/project/projectContext';

const Projects = () => {
  const projectContext = useContext(ProjectContext);

  const { projects, filtered, getProjects, loading } = projectContext;

  useEffect(() => {
    getProjects();
    // eslint-disable-next-line
  }, []);

  if (projects !== null && projects.length === 0 && !loading) {
    return <h4>Please add a project</h4>;
  }

  return (
    <Fragment>
      {projects !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((project) => (
                <CSSTransition
                  key={project._id}
                  timeout={500}
                  classNames='item'
                >
                  <ProjectItem project={project} />
                </CSSTransition>
              ))
            : projects.map((project) => (
                <CSSTransition
                  key={project._id}
                  timeout={500}
                  classNames='item'
                >
                  <ProjectItem project={project} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Preloader />
      )}
    </Fragment>
  );
};

export default Projects;
