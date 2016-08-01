import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component{
  render() {
   return (
     <div>
       <h1>TO DOS</h1>
       <Link to="/toDos/outstanding" className="btn btn-success">SEE TASKS -></Link>
     </div>
   );
  }
}

export default HomePage;
