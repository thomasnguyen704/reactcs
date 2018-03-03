const app = require('express')()
const bodyParser = require('body-parser').json()
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./mydb.sqlite"
    }
})

app.use(bodyParser)

const getProjects = ()=> {
    return knex.select('id', 'project', 'lead', 'status', 'remediation').from('projects')
}
const getSkills = ()=> {
    return knex.select('id', 'skill').from('skills')
}
const getSurveys = ()=> {
    return knex.select('id', 'skill_id', 'user').from('surveys')
}
const getProjectAssociates = ()=> {
    return knex.select('project_id', 'associate').from('project_associates')
}
const getProjectSkills = ()=> {
    return knex.select('skill_id', 'project_id').from('project_skills')
}

/* table: get all projects by project id */
app.get('/projects/:id', (req, res)=> {
    if (req.params.id){
        getProjects().leftJoin(
            'projects_skills', 'projects.id', 'project_skills.project_id' // join project_skills and associates
        ).leftJoin (
            'project_associates', 'projects.id', 'project_assocites.project_id'
        ).where (
            'projects.id', req.params.id
        ).then (
            res.send
        )
    } else {
        getProjects().then(res.send)
    }
})


/*
    exiting form: get a project by project id
    this will include assigned assoc
*/

/*
    new form: post a project form
    this will create a new project id (auto inc)
    this will include assigned assoc
    this will include assigned skills
*/

/*
    get skills from skills table
*/

/*
    get lead from users table
    get associates from users table
*/

/*
    get an associate from user/survey table
    get skills by associate from surveys table
*/

/*
    post skill by associate to the survey table
*/