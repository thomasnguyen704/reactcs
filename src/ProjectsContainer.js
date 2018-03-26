import React from 'react'
import ProjectsTable from './ProjectsTable'
import ProjectsCharts from './ProjectsCharts'

class ProjectsContainer extends React.Component {
    render(){
        return(
            <div>
                <ProjectsTable {...this.props}/>
                <ProjectsCharts />
            </div>
        )
    }
}
export default ProjectsContainer