import React from 'react';
import Projects from '../projects/Projects';
import ProjectForm from '../projects/ProjectForm';
import ProjectFilter from '../projects/ProjectFilter';

const Home = () => {
  return (
    <div className='row'>
      <div className='col s6'>
        <ProjectFilter />
        <Projects />
      </div>
      <div className='col s6'>
        <ProjectForm />
      </div>
    </div>
  );
};

export default Home;
