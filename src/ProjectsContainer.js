import React from 'react'
import ProjectsTable from './ProjectsTable'

class ProjectsContainer extends React.Component {
    render(){
        return(
            <div>
                <ProjectsTable {...this.props}/>
            </div>
        )
    }
}
export default ProjectsContainer