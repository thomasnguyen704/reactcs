const app = require('express')()
const bodyParser = require('body-parser').json()
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./mydb.sqlite"
    }
})

app.use(bodyParser)

/*
const getProjects = ()=> { return knex.select('id', 'project', 'lead', 'status', 'remediation').from('projects') }
const getSkills = ()=> { return knex.select('id', 'skill').from('skills') }
const getSurveys = ()=> { return knex.select('id', 'skill_id', 'user').from('surveys') }
const getProjectAssociates = ()=> { return knex.select('project_id', 'associate').from('project_associates') }
const getProjectSkills = ()=> { return knex.select('skill_id', 'project_id').from('project_skills') }
*/

// table: get all projects
app.get('/projects', (req, res)=> {
    return knex.select('id', 'project', 'lead', 'status', 'remediation')
        .from('projects')
        .then(results=> {res.send(results)})
})

// table: get all projects by project id
// exiting form: get a project by project id this will include assigned assoc
app.get('/projects/:id', (req, res)=> {
    const projectId = req.params.id
    const results = Promise.all([
        knex.select('project', 'lead', 'status', 'remediation')
            .from('projects')
            .where({id:projectId}),
        knex.select('skill_id', 'skill')
            .from('project_skills')
            .innerJoin('skills', 'skills.id', 'project_skills.skill_id')
            .where('project_skills.project_id', projectId),
        knex.select('associate', 'username')
            .from('project_associates')
            .innerJoin('users', 'users.user', 'project_associates.associate')
            .where('project_associates.project_id', projectId)
    ]).then(results=> {
        // results is an array, first item is the project, second is skill, third is associates
        if(results[0].length===0){
            throw new Error ('No projects for that ID')
        } else {
            res.send({ 
                ...results[0][0], skills: results[1], associates: results[2]
            })
        }
    }).catch(error=>{
        res.send({error: error.message}) 
    })
})

/*
    new form: post a project form
    this will create a new project id (auto inc)
    this will include assigned assoc
    this will include assigned skills
*/
app.post('/projects/:id', (req, res)=> {
    req.body()
})

// get skills from skills table
app.get('/skills', (req, res)=> {
    return knex.select('id', 'skill')
    .from('skills')
    .then(results=> {res.send(results)})
})

// get lead from users table
app.get('/leads', (req, res)=> {
    return knex.select('lead')
    .from('projects')
    .then(results=> {res.send(results)})
})

// get associates from users table
app.get('/users', (req,res)=>{
    return knex.select('user')
    .from('users')
    .then(results=> {res.send(results)})
})

// get an associate from user/survey table
app.get('/surveys:user', (req, res)=> {
    return knex.select('id', 'skill_id', 'user')
    .from('surveys')
    .where('user', req.params.user)
    .then(results=> {res.send(results)})
})

// get skills by associate from surveys table
app.get('')

/*
    post skill by associate to the survey table
*/


app.listen(3001, ()=> console.log('Server listening on 3001'))