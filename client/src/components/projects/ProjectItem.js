import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ProjectContext from '../../context/project/projectContext';

const ProjectItem = ({ project }) => {
  const projectContext = useContext(ProjectContext);
  const { deleteProject, setCurrent, clearCurrent } = projectContext;

  const { _id, name, client, email, phone, status } = project;

  const onDelete = () => {
    deleteProject(_id);
    clearCurrent();
  };

  return (
    <div class='card red lighten-2'>
      <div class='card-content white-text'>
        <span class='card-title'>{name}</span>
        <span
          style={{
            float: 'right',
            'font-weight': 'bold',
            'font-size': 'large',
          }}
          className={
            status === 'completed'
              ? 'grey-text text-lighten-1'
              : 'blue-grey-text'
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
        <ul className='list'>
          {client && (
            <li>
              <i class='fas fa-user' /> {client}
            </li>
          )}
          {email && (
            <li>
              <i className='fas fa-envelope-open' /> {email}
            </li>
          )}
          {phone && (
            <li>
              <i className='fas fa-phone' /> {phone}
            </li>
          )}
        </ul>
      </div>
      <div>
        <a
          class='btn-floating halfway-fab waves-effect waves-light  blue lighten-2'
          onClick={() => setCurrent(project)}
        >
          <i class='material-icons'>edit</i>
        </a>
      </div>
      <div style={{ float: 'right' }}>
        <a
          class='btn-floating waves-effect waves-light teal lighten-2'
          onClick={onDelete}
        >
          <i class='material-icons'>delete</i>
        </a>
      </div>
    </div>
  );
};

ProjectItem.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectItem;
