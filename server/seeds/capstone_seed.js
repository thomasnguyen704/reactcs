exports.seed = (knex, Promise)=> {
	return knex('users').del().then( ()=> {
		return knex('users').insert([
			{ user: 'capstonehcrtestuser@gmail.com', username: 'Test User' },
			{ user: 'AaronTBridgers@gmail.com', username: 'Aaron Bridgers' },
			{ user: 'chris_Kennedy@kenan-flagler.unc.edu', username: 'Chris Kennedy' },
			{ user: 'danstahl1138@gmail.com', username: 'Daniel Stahl' },
			{ user: 'jen@jenkramer.org', username: 'Jen Kramer'},
			{ user: 'thomasnguyen704@gmail.com', username: 'Tommy Nguyen' }
		])
	}).then( ()=> {
		return knex('projects').del()
	}).then( ()=> {
		return knex('projects').insert([
			{ id: 1, project: 'CECL', lead: 'danstahl1138@gmail.com', status: 'Draft', remediation: 'Training' },
			{ id: 2, project: 'Compliance', lead: 'thomasnguyen704@gmail.com', status: 'Pending', remediation: 'In Source' },
			{ id: 3, project: 'ALLL', lead: 'AaronTBridgers@gmail.com', status: 'Complete', remediation: 'Out Source' },
			{ id: 4, project: 'SAS BSA/AML', lead: 'thomasnguyen704@gmail.com', status: 'Complete', remediation: 'Training' }
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
			{ id: 6, skill: 'Anti Money Laundering' },
			{ id: 7, skill: 'Advanced Statistics' }
		])
	}).then( ()=>{
		return knex('project_skills').del()
	}).then( ()=> {
		return knex('project_skills').insert([
			{ project_id: 1, skill_id: 1 },
			{ project_id: 1, skill_id: 3 },
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
			{ project_id: 1, associate: 'thomasnguyen704@gmail.com' },
			{ project_id: 1, associate: 'danstahl1138@gmail.com' },
			{ project_id: 2, associate: 'chris_Kennedy@kenan-flagler.unc.edu' },
			{ project_id: 3, associate: 'danstahl1138@gmail.com' },
			{ project_id: 3, associate: 'AaronTBridgers@gmail.com' },
			{ project_id: 3, associate: 'thomasnguyen704@gmail.com' },
			{ project_id: 4, associate: 'danstahl1138@gmail.com' },
			{ project_id: 4, associate: 'AaronTBridgers@gmail.com' },
			{ project_id: 4, associate: 'chris_Kennedy@kenan-flagler.unc.edu' }
		])
	}).then( ()=>{
		return knex('surveys').del()
	}).then( ()=>{
		return knex('surveys').insert([
			{ id: 1, skill_id: 1, user: 'thomasnguyen704@gmail.com' },
			{ id: 2, skill_id: 1, user: 'danstahl1138@gmail.com' },
			{ id: 3, skill_id: 2, user: 'danstahl1138@gmail.com' },
			{ id: 4, skill_id: 1, user: 'AaronTBridgers@gmail.com' },
			{ id: 5, skill_id: 7, user: 'AaronTBridgers@gmail.com' },
			{ id: 6, skill_id: 4, user: 'chris_Kennedy@kenan-flagler.unc.edu' },
			{ id: 7, skill_id: 5, user: 'chris_Kennedy@kenan-flagler.unc.edu' }
		])
	})
}