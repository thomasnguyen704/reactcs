exports.seed = (knex, Promise)=> {
	return knex('users').del().then( ()=> {
		return knex('users').insert([
			{ user: 'thomasnguyen', username: 'Thomas Nguyen' },
			{ user: 'danielstahl', username: 'Daniel Stahl' },
			{ user: 'chriskennedy', username: 'Chris Kennedy' },
			{ user: 'aaronbridgers', username: 'Aaron Bridgers'}
		])
	}).then( ()=> {
		return knex('projects').del()
	}).then( ()=> {
		return knex('projects').insert([
			{ id: 1, project: 'CECL', lead: 'danielstahl', status: 'Draft', remediation: 'Training' },
			{ id: 2, project: 'Compliance', lead: 'thomasnguyen', status: 'Pending', remediation: 'In Source' },
			{ id: 3, project: 'ALLL', lead: 'aaronbridgers', status: 'Approved', remediation: 'Out Source' },
			{ id: 4, project: 'SAS BSA/AML', lead: 'chriskennedy', status: 'Cancelled', remediation: 'None' }
		])
	}).then( ()=>{
		return knex('skills').del()
	}).then( ()=> {
		return knex('skills').insert([
			{ id: 1, skill: 'SAS' },
			{ id: 2, skill: 'ALLL' },
			{ id: 3, skill: 'FASB' },
			{ id: 4, skill: 'Know Your Customer' },
			{ id: 5, skill: 'Bank Secrecy Act' },
			{ id: 6, skill: 'Anti Money Laundring' },
			{ id: 7, skill: 'Advanced Statistics' }
		])
	}).then( ()=>{
		return knex('project_skills').del()
	}).then( ()=> {
		return knex('project_skills').insert([
			{ project_id: 1, skill_id: 1 },
			{ project_id: 2, skill_id: 1 },
			{ project_id: 2, skill_id: 2 },
			{ project_id: 3, skill_id: 1 },
			{ project_id: 3, skill_id: 7 },
			{ project_id: 4, skill_id: 1 },
			{ project_id: 4, skill_id: 2 },
			{ project_id: 4, skill_id: 4 },
			{ project_id: 4, skill_id: 5 },
			{ project_id: 4, skill_id: 6 },
			{ project_id: 4, skill_id: 7 }
		])
	}).then( ()=>{
		return knex('project_associates').del()
	}).then( ()=>{
		return knex('project_associates').insert([
			{ project_id: 1, associate: 'thomasnguyen' },
			{ project_id: 1, associate: 'danielstahl' },
			{ project_id: 2, associate: 'chriskennedy' },
			{ project_id: 3, associate: 'danielstahl' },
			{ project_id: 3, associate: 'aaronbridgers' },
			{ project_id: 3, associate: 'thomasnguyen' },
			{ project_id: 4, associate: 'danielstahl' },
			{ project_id: 4, associate: 'aaronbridgers' },
			{ project_id: 4, associate: 'chriskennedy' }
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