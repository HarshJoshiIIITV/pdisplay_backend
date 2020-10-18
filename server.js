const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');


const db = knex({
	client: 'pg',
	rejectUnauthorized: false,
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	},
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.options('/data', cors());

app.get('/', (req, res) => {
	db.select('*').from('posts').then((posts)=>{
		if (posts.length) {
			res.send(posts);
		  } else {
			res.status(400).json('Not found')
		  }
	}).catch((err)=>{
		res.send("error occur")
	})
});

app.post('/data', (req, res) => {
	const { title, description,image } = req.body;
	db('posts').insert({title_db: title,description_db:description,image_db:image})
});


// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
});
