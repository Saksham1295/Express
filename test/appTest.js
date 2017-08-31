const supertest = require('supertest');
const expect = require('chai').expect;
const userData = require('../model/schema');
const sinon = require('sinon');
const app = require('../app');
const url = 'localhost:3000';
let sinonInsert = sinon.stub(userData, 'create');
let sinonUpdate = sinon.stub(userData, 'update');
let sinonStub = sinon.stub(userData, 'find');
let sinonDelete = sinon.stub(userData,'remove');
describe('GET/ hello', () => {
	it('Respond from get ', (done) => {
		supertest(url)
		.get('/')
		.expect(200)
		//.send('hello world')
		.end((err, res) => {
			if (err) 
				return done(err);
			else{
				expect(res.text).to.be.equal("hello world");
				done();
			}
		});
	});
});

describe('UserData', () => {
	it('should be invalid if name is empty', (done) => {
		const user = new userData();
		user.validate((err) => {
			expect(err.errors.name).to.equal(err.errors.name);
			expect(err.errors.age).to.equal(err.errors.age);
			expect(err.errors.address).to.equal(err.errors.address);
			//expect(err.errors.salary).to.equal(err.errors.salary);
			done();
		});
	});
});

describe('CRUD validation',() =>{
	before(() => {
		sinonStub.yields(null, [{name: 'nihit',age: 20,address : "noida"}]);
	});
	it('Find validation',(done) => {
		supertest(url)
		.get('/find')
		.expect(200)
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.end((err, res) => {
			if (err) return done(err);
			expect(res.body[0].name).to.equal("nihit");
			expect(res.body[0].age).to.equal(20);
			sinonStub.restore();
			done();
		});
	});
});

describe('CRUD validation',() =>{
	before(() => {
		sinonInsert.yields(null, [{name: 'nihit',age: 20,address : "noida"}]);
	});
	it('Insert Validation',(done) => {
		let user = { name : 'nihit', age : 20};
		supertest(url)
		.post('/insert')
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200)
		.send(user)
		.end((err, res) => {
			if (err) return done(err);
			expect(res.body[0].name).to.equal("nihit");
			done();
		});
	});
});
/*start update validation*/
describe('Update Testing',(done) =>{
	beforeEach(() => {
		sinonUpdate
		.yields(null, { name : 'saksham',$set : {name: 'nihit',age: 20, address: "noida"},ok: 1, nModified: 0, n: 0});
		
	});
	it('Update data',(done) => {
		supertest(url)
		.put('/update/:saksham')
    .expect("Content-Type", /json/)
    .expect(200)
    .send({name: 'nihit', age: 20, address: "noida"})
    .end((err, res) => {
    		if(err) return done(err);
    		console.log(res.body);
        expect(res.body.ok).to.equal(1);
        expect(res.body.nModified).to.equal(0);
     		expect(res.body.n).to.equal(0);
      	done();
      });
   	});
});/*end update validation*/

describe('Delete Testing',(done) =>{
        beforeEach(() => {
        sinonDelete.withArgs({ name : "nihit" }).yields(null, {ok:1, nRemoved: 1, n:1}); 
        });

    it('Delete data',(done) => {
        supertest(url)
            .delete('/delete')
            //.set('Accept', 'application/json')
            //.expect("Content-Type", /json/)
            .send({ name: "nihit"})
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.ok).to.equal(1);    
                expect(res.body.nRemoved).to.equal(1);

                expect(res.body.n).to.equal(1);
                
                done();
            
                
            });
          
             
        });
    });
