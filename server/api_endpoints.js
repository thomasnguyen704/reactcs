const app = require('express')()
const bodyParser = require('body-parser').json()
const knex = require('knex')({
    client: 'sqlite3',
    connection: { filename: './mydb.sqlite' }
})
const https = require('https')
const fs = require('fs')


app.use(bodyParser)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


// Get all projects
app.get('/projects', (req, res)=> {
    return knex.select('id', 'project', 'lead as lead_id', 'username as lead', 'status', 'remediation')
        .from('projects')
        .innerJoin('users', 'lead', 'user')
        .then((results)=> {res.send(results)})
})

const deleteItems = (project_id)=>{
    return Promise.all([
        knex('project_skills')
            .where({project_id})
            .del(),
        knex('project_associates')
            .where({project_id})
            .del()
    ])
}

/* 
CREATE project with project, status, lead, skills req, assoc, remediation. 
This api endpoint will insert to multiple tables: projects, skills, project_associates, project_skills
*/
const insertProject = (project, lead, status, remediation, skills, associates)=> {
    return knex('projects')
    .returning('id')
    .insert([ { project, lead, status, remediation } ])
}
const updateProject = (id, project, lead, status, remediation, skills, associates)=> {
    return knex('projects')
    .where({id})
    .update({ project, lead, status, remediation })
}
const insertSkills = (skills)=> {
    return Promise.all(
        skills.map( skill=> (
            knex.raw( 'replace into skills(skill) values(?)', [skill] )
        ))
    )
}
const insertProjectAssociates = (id, associates)=> {
    if(associates.length > 0){
        return knex.select('user').from('users').whereIn('username', associates).then( ids=>{
            return knex('project_associates')
            .insert( ids.map( associate=> ({ project_id: id, associate: associate.user }) ) )
        }) 
    } else {
            return Promise.resolve()
    }
}
const insertProjectSkills = (id, skills)=> {
    if (skills.length > 0){
        return knex.select('id').from('skills').whereIn('skill', skills).then( ids=>{
            return knex('project_skills')
            .insert( ids.map( skill=> ({ project_id: id, skill_id: skill.id }) ) )
        })
    } else {
        return Promise.resolve()
    }
}

// Insert of update project
app.post('/create_project', (req, res)=>{
    const { id, project, lead, status, remediation, skills, associates } = req.body
    let someId
    ( 
        id? updateProject(id, project, lead, status, remediation, skills, associates)
        : insertProject(project, lead, status, remediation, skills, associates) 
    )
    .then( newId=> {
        someId = id || newId[0]
        return deleteItems(someId)
    })
    .then( 
        ()=>{
            return insertSkills(skills)
        }
    )
    .then(
        ()=>{
            return Promise.all([
                insertProjectAssociates(someId, associates),
                insertProjectSkills(someId, skills)
            ])
        }
    )
    .then(
        ()=>{
            res.send({message: 'success'})
        }
    )
    .catch(
        (err)=>{
            res.send({err})
        }
    )
})


// READ Projects all projects by project id
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
            .where('project_id', projectId),
        knex.select(
            'project_skills.project_id', 
            knex.raw(
                `case 
                    when sum(
                        case when surveys.skill_id is null then 1 else 0 end
                    ) > 0 then "Yes" else "No" 
                end as skillGap`
            ))
            .from('project_skills')
            .leftJoin('surveys', 'project_skills.skill_id', 'surveys.skill_id')
            .where('project_id', projectId)
            .groupBy('project_skills.project_id')
    ]).then(results=> {
        // results is an array: project, skill, associates, requirement gap
        if(results[0].length===0){
            throw new Error ('No projects for that ID')
        } else {
            res.send({ 
                ...results[0][0], 
                skills: results[1], 
                associates: results[2], 
                skillGap: results[3]
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

// READ user and skills from survey table
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

// POST Surveys by user
app.post('/surveys/:user', (req, res)=> {
    const { project_skill, checked } = req.body
        return (checked? knex('surveys')
        .insert( {skill_id: project_skill, user: req.params.user}) 
        : knex('surveys').where({skill_id: project_skill, user: req.params.user })
        .del())
        .then(()=>{res.send({message: 'success'})})
        .catch(err=> res.send({err}))
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

// Self signed certs and server stuff
if (process.env.NODE_ENV === 'production'){
    https.createServer({
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
      }, app).listen(3001)
} else {
    app.listen(3001, ()=> console.log('Server listening on 3001'))
}