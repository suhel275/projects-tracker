import React, { useState, useContext, useEffect } from 'react';
import ProjectContext from '../../context/project/projectContext';

const ProjectForm = () => {
  const projectContext = useContext(ProjectContext);

  const { addProject, updateProject, clearCurrent, current } = projectContext;

  useEffect(() => {
    if (current !== null) {
      setProject(current);
    } else {
      setProject({
        name: '',
        client: '',
        email: '',
        phone: '',
        status: 'uncompleted',
      });
    }
  }, [projectContext, current]);

  const [project, setProject] = useState({
    name: '',
    client: '',
    email: '',
    phone: '',
    status: 'uncompleted',
  });

  const { name, client, email, phone, status } = project;

  const onChange = (e) =>
    setProject({ ...project, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addProject(project);
    } else {
      updateProject(project);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>
        {current ? 'Edit ' : 'Add '}
        <span className='red-text text-lighten-1'>Project</span>
      </h2>
      <div className='input-field'>
        <input
          type='text'
          id='name'
          name='name'
          value={name}
          onChange={onChange}
          placeholder='Project Name'
        />
      </div>
      <div className='input-field'>
        <input
          type='text'
          id='name'
          name='client'
          value={client}
          onChange={onChange}
          placeholder='Client Name'
        />
      </div>
      <div className='input-field'>
        <input
          type='email'
          id='email'
          name='email'
          value={email}
          onChange={onChange}
          placeholder='Client Email'
        />
      </div>
      <div className='input-field'>
        <input
          type='text'
          id='phone'
          name='phone'
          value={phone}
          onChange={onChange}
          placeholder='Client Phone'
        />
      </div>
      <h5 className='red-text text-lighten-1'>Project Status</h5>
      <label>
        <input
          type='radio'
          class='with-gap'
          name='status'
          value='uncompleted'
          checked={status === 'uncompleted'}
          onChange={onChange}
        />
        <span>Uncompleted</span>
      </label>{' '}
      <label>
        <input
          type='radio'
          class='with-gap'
          name='status'
          value='completed'
          checked={status === 'completed'}
          onChange={onChange}
        />
        <span>Completed</span>
      </label>
      <br />
      <br />
      <div>
        <input
          type='submit'
          value={current ? 'Update Project' : 'Add Project'}
          className='btn btn-primary btn-block'
        />
      </div>
      <br />
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ProjectForm;
