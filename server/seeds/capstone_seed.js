exports.seed = (knex, Promise)=> {
	// Deletes ALL existing entries
	return knex('users').del().then( ()=> {
		// Inserts seed entries
		return knex('users').insert([
			{ user: 'thomasnguyen', username: 'thomas nguyen' },
			{ user: 'danielstahl', username: 'daniel stahl' }
		])
	}).then( ()=> {
		return knex('projects').del()
	}).then( ()=> {
		return knex('projects').insert([
			{ project: 'CECL', lead: 'danielstahl', status: 'complete', remediation: 'training' },
			{ project: 'Compliance', lead: 'thomasnguyen', status: 'draft', remediation: 'none' }
		])
	}).then( ()=>{
		return knex('skills').del()
	}).then( ()=> {
		return knex('skills').insert([
			{ skill: 'SAS' },
			{ skill: 'ALLL' },
			{ skill: 'FASB Topic 326' }
		])
	}).then( ()=> {
		return knex('project_skills').del()
	}).then( ()=> {
		return knex('project_skills').insert([
			{ skill_id: 1, project_id: 1 },
			{ skill_id: 1, project_id: 2 },
			{ skill_id: 2, project_id: 2 }
		])
	}).then( ()=> {
		return knex('project_associates').del()
	}).then( ()=>{
		return knex('project_associates').insert([
			{ project_id: 1, associate: 'thomasnguyen' },
			{ project_id: 1, associate: 'danielstahl' },
			{ project_id: 2, associate: 'danielstahl' }
		])
	})
}