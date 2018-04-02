const app = require('express')()
const bodyParser = require('body-parser').json()
const knex = require('knex')({
    client: 'sqlite3',
    connection: { filename: './mydb.sqlite' }
})

app.use(bodyParser)

// table: get all projects
app.get('/projects', (req, res)=> {
    return knex.select('id', 'project', 'lead as lead_id', 'username as lead', 'status', 'remediation')
        .from('projects')
        .innerJoin('users', 'lead', 'user')
        .then((results)=> {res.send(results)})
})

// table: get all projects by project id
// exiting form: get a project by project id this will include assigned assoc
app.get('/projects/:id', (req, res)=> {
    const projectId = req.params.id
    const results = Promise.all([
        knex.select('project', 'status', 'lead', 'username as lead_name', 'remediation')
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

// get an user and skills from survey table
app.get('/surveys/:user', (req, res)=> {
    const results = 
        knex.select(
            'user', 
            'skill', 
            'skills.id as skill_id', 
            knex.raw('case when surveys.id is not null then 1 else 0 end as skill_exist')
        )
        .from('skills')
        .leftJoin('surveys', 'surveys.skill_id', 'skills.id')
        .where('user', req.params.user)
        .orWhere('user', null)
    .then(results=> {
        if(results[0].length===0){
            throw new Error('User not found')
        } else {
            res.send(results)
        }
    })
})

/*
    new form: post a project form
    this will create a new project id (auto inc)
    this will include assigned assoc
    this will include assigned skills
*/

app.post('/projects/:id', (req, res)=> {
})

// post skill by associate to the survey table

app.get('/charts/active_lead', (req, res)=> {
    return knex('projects')
    .select(knex.raw('count(id) as assigned, username'))
    .innerJoin('users', 'user', 'projects.lead')
    .whereNot('status', 'Complete')
    .groupBy('lead')
    .then(results=> {res.send(results)})
})

app.get('/charts/active_status', (req, res)=> {
    return knex('projects')
    .select(knex.raw('count(id) as count, status'))
    .whereNot('status', 'Complete')
    .groupBy('status')
    .then(results=> {res.send(results)})
})

app.insert('/createUser', (req, res)=> {
     knex.('users')
    .insert(
        knex.raw( 'INSERT or IGNORE INTO users(user, username) VALUES("thomasnguyen", "Tommy Nguyen")' )
    )
})


app.listen(3001, ()=> console.log('Server listening on 3001'))