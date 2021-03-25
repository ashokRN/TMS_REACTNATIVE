export const reducer = (state, action) => {
  switch (action.type) {
    case 'AUTH':
      return {...state, Auth: true, user: action.user};

    case 'ALL_PROJECTS' : 
    return {...state, projects: action.projects}
    case 'LOGOUT':
      return {...state, Auth: false, user: {}};
    case 'INPROGREES_PROJECTS' : return {...state, inprogScreen: action.name};

    default:
      throw new Error('Action type must be defined');
  }
};
