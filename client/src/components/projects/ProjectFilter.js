import React, { useContext, useRef, useEffect } from 'react';
import ProjectContext from '../../context/project/projectContext';

const ProjectFilter = () => {
  const projectContext = useContext(ProjectContext);
  const text = useRef('');

  const { filterProjects, clearFilter, filtered } = projectContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterProjects(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <nav style={modalStyle}>
      <div className='nav-wrapper'>
        <form>
          <div class='input-field'>
            <input
              ref={text}
              id='search'
              type='search'
              placeholder='Filter Projects...'
              onChange={onChange}
            />
            <label className='label-icon' htmlFor='search'>
              <i class='material-icons'>search</i>
            </label>
          </div>
        </form>
      </div>
    </nav>
  );
};

const modalStyle = {
  margin: '10px',
  'margin-left': '0px',
};

export default ProjectFilter;
