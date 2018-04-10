const app = require('express')()
const bodyParser = require('body-parser').json()
const knex = require('knex')({
    client: 'sqlite3',
    connection: { filename: './mydb.sqlite' }
})

app.use(bodyParser)

// Get all projects
app.get('/projects', (req, res)=> {
    return knex.select('id', 'project', 'lead as lead_id', 'username as lead', 'status', 'remediation')
        .from('projects')
        .innerJoin('users', 'lead', 'user')
        .then((results)=> {res.send(results)})
})

/* 
CREATE: post new project with project, status, lead, skills req, assoc, remediation. 
This api endpoint will insert to multiple tables: projects, skills, project_associates, project_skills
*/
const insertProject = (project, lead, status, remediation, skills, associates)=> {
    return Promise.all([
        knex('projects')
        .returning('id')
        .insert([ 
            { project, lead, status, remediation } 
        ]).then(
            (value)=> {
                knex('project_associates').insert( 
                    associates.map( associate=> ({ project_id: value.id, associate }) ) 
                )
            }
        ),
        knex('skills').insert( 
            skills.map( skill=> ({ skill }) )
        )
    ]).then(
        ()=> { res.send({message: 'post'}) }
    ).catch(
        err=> { res.send({message: err}) }
    )
}
/* 
UPDATE: Update project with project, status, lead, skills req, assoc, remediation. 
This api endpoint will update to multiple tables: projects, skills, project_associates, project_skills
*/
const updateProject = (id, project, lead, status, remediation, skills, associates)=> {
    return Promise.all([
        knex('projects')
        .where({ id })
        .update([{ project, lead, status, remediation }]),

        Promise.all(
            skills.map( skill=> (
                knex.raw(
                    'replace into skills(skill) values(?)',
                    [skill]
                )
            ))
        ),

        Promise.all(
            associates.map( associate=> (
                knex.raw(
                    'replace into project_associates(project_id, associate) values(?,?)',
                    [id, associate]
                )
            ))
        )

    ]).then(
        ()=> { res.send({message: 'update'}) }
    ).catch(
        err=> { res.send({message: err}) }
    )
}
app.post('/create_project', (req, res)=>{
    const { id, project, lead, status, remediation, skills, associates, projectSkills } = req.body
    console.log(id)
    if (id){
        updateProject(
            id, project, lead, status, remediation, skills, associates
        )
    } else {
        insertProject(
            project, lead, status, remediation, skills, associates
        )
    }
})

// READ Projects: Get all projects by project id
app.get('/projects/:id', (req, res)=> {
    const projectId = req.params.id
    const results = Promise.all([
        knex.select('id','project', 'status', 'lead', 'username as lead_name', 'remediation')
            .from('projects')
            .innerJoin('users', 'lead', 'user')
            .where({id:projectId}),
        knex.select('skill')
            .from('project_skills')
            .innerJoin('skills', 'skills.id', 'skill_id')
            .where('project_id', projectId),
        knex.select('username as associate')
            .from('project_associates')
            .innerJoin('users', 'user', 'associate')
            .where('project_id', projectId)
    ]).then(results=> {
        // results is an array: first item is the project, second is skill, third is associates
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

// get skills from skills table
app.get('/skills', (req, res)=> {
    return knex.select('id', 'skill', 'status').from('skills')
    .then(results=> {res.send(results)})
})

// get associates from users table
app.get('/users', (req,res)=>{
    return knex.select('user', 'username')
    .from('users')
    .then(results=> {res.send(results)})
})

// get lead from projects table
app.get('/leads', (req,res)=>{
    return knex.select('username')
    .from('projects')
    .innerJoin('users', 'user', 'lead')
    .then(results=> {res.send(results)})
})

// READ: Get user and skills from survey table
app.get('/surveys/:user', (req, res)=> {
    const results = 
        knex.select( 'user', 'skill', 'skills.id as skill_id', knex.raw('case when surveys.id is not null then 1 else 0 end as skill_exist'))
        .from( 'skills' )
        .leftJoin( 'surveys', 'surveys.skill_id', 'skills.id' )
        .where( 'user', req.params.user )
        .orWhere( 'user', null )
        .groupBy('skill')
    .then(results=> {
        if(results[0].length===0){
            throw new Error( 'User not found' )
        } else {
            res.send(results)
        }
    })
})

// Chart: Projects by leasd
app.get('/charts/active_lead', (req, res)=> {
    return knex('projects')
    .select(knex.raw('count(id) as assigned, username'))
    .innerJoin('users', 'user', 'projects.lead')
    .whereNot('status', 'Complete')
    .groupBy('lead')
    .then(results=> {res.send(results)})
})

// Chart: Projects by status
app.get('/charts/active_status', (req, res)=> {
    return knex('projects')
    .select(knex.raw('count(id) as count, status'))
    .whereNot('status', 'Complete')
    .groupBy('status')
    .then(results=> {res.send(results)})
})

app.listen(3001, ()=> console.log('Server listening on 3001'))