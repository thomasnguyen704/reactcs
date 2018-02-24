import React from 'react'
import ProjectsTable from './ProjectsTable'
import ProjectsCharts from './ProjectsCharts'

class ProjectsContainer extends React.Component {
    render(){
        return(
            <div>
                <ProjectsTable />
                <ProjectsCharts />
            </div>
        )
    }
}
export default ProjectsContainer