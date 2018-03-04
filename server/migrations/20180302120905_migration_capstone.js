
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table)=> {
        table.string('user', 32).notNull().primary()
        table.string('username', 50).notNull()
    }).then( ()=>{
        return knex.schema.createTable('projects', (table)=> {
            table.increments('id').primary()
            table.string('project', 50).notNull()
            table.string('lead', 32).notNull()
            table.string('status', 32).notNull().defaultTo('Draft')
            table.string('remediation', 32).notNull().defaultTo('None')
            table.foreign('lead').references('users.user')
        })
    }).then( ()=>{
        return knex.schema.createTable('skills', (table)=> {
            table.increments('id').primary()
            table.string('skill').notNull()
        })
    }).then( ()=>{
        return knex.schema.createTable('surveys',(table)=> {
            table.increments('id').primary()
            table.integer('skill_id').notNull()
            table.string('user').notNull()
            table.unique(['skill_id', 'user'])
            table.foreign('skill_id').references('skills.id')
            table.foreign('user').references('users.user')
        })
    }).then( ()=>{
        return knex.schema.createTable('project_associates', (table)=> {
            table.integer('project_id').notNull()
            table.string('associate').notNull()
            table.unique(['project_id', 'associate'])
            table.foreign('project_id').references('projects.id')
            table.foreign('associate').references('users.user')
        })
    }).then( ()=>{
        return knex.schema.createTable('project_skills', (table)=> {
            table.integer('skill_id').notNull()
            table.integer('project_id').notNull()
            table.unique(['skill_id', 'project_id'])
            table.foreign('skill_id').references('skills.id')
            table.foreign('project_id').references('projects.id')
        })
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('project_skills'
    ).then( ()=> {
        return knex.schema.dropTable('project_associates')
    }).then( ()=>{
        return knex.schema.dropTable('surveys')
    }).then( ()=>{
        return knex.schema.dropTable('skills')
    }).then( ()=> {
        return knex.schema.dropTable('projects')
    }).then( ()=> {
        return knex.schema.dropTable('users')
    })
}