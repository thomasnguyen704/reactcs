
exports.seed = (knex, Promise)=> {
	// Deletes ALL existing entries
	return knex('users').del().then( ()=> {
		// Inserts seed entries
		return knex('users').insert([
			{
				user: 'thomasnguyen', 
				username: 'thomas nguyen'
			},
			{
				user: 'danielstahl', 
				username: 'daniel stahl'
			}
		])
	}).then( ()=> {
		return knex('projects').del()
	}).then( ()=> {
		return knex('projects').insert([
			{
				project: 'CECL', 
				lead: 'danielstahl', 
				status: 'complete', 
				remediation: 'training'
			},
			{
				project: 'Compliance', 
				lead: 'thomasnguyen', 
				status: 'draft', 
				remediation: 'none'
			}
		])
	})
}