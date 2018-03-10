exports.seed = (knex, Promise)=> {
	// Deletes ALL existing entries
	return knex('users').del().then( ()=> {
		// Inserts seed entries
		return knex('users').insert([
			{ user: 'thomasnguyen', username: 'Thomas Nguyen' },
			{ user: 'danielstahl', username: 'Daniel Stahl' }
		])
	}).then( ()=> {
		return knex('projects').del()
	}).then( ()=> {
		return knex('projects').insert([
			{ project: 'CECL', lead: 'danielstahl', status: 'Complete', remediation: 'Training' },
			{ project: 'Compliance', lead: 'thomasnguyen', status: 'Draft', remediation: 'None' }
		])
	}).then( ()=>{
		return knex('skills').del()
	}).then( ()=> {
		return knex('skills').insert([
			{ skill: 'SAS' },
			{ skill: 'ALLL' },
			{ skill: 'FASB Topic 326' }
		])
	}).then( ()=>{
		return knex('project_skills').del()
	}).then( ()=> {
		return knex('project_skills').insert([
			{ skill_id: 1, project_id: 1 },
			{ skill_id: 1, project_id: 2 },
			{ skill_id: 2, project_id: 2 }
		])
	}).then( ()=>{
		return knex('project_associates').del()
	}).then( ()=>{
		return knex('project_associates').insert([
			{ project_id: 1, associate: 'thomasnguyen' },
			{ project_id: 1, associate: 'danielstahl' },
			{ project_id: 2, associate: 'danielstahl' }
		])
	}).then( ()=>{
		return knex('surveys').del()
	}).then( ()=>{
		return knex('surveys').insert([
			{ id: 1, skill_id: 1, user: 'thomasnguyen' },
			{ id: 2, skill_id: 1, user: 'danielstahl' },
			{ id: 3, skill_id: 2, user: 'danielstahl' }
		])
	})
}