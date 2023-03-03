// const chai = require('chai');
// const sinon = require('sinon');
// const connection = require('../../../src/models/connection');
// const setupDatabase = require('../../../src/models/db');


// const expect = chai.expect;

// describe('setupDatabase', function() {
//   let queryStub;

//   beforeEach(function() {
//     queryStub = sinon.stub(connection, 'query');
//   });

//   afterEach(function() {
//     queryStub.restore();
//   });

//   it('should create the railway database', async function() {
//     await setupDatabase();
//     expect(queryStub.calledWith('CREATE DATABASE railway')).to.be.true;
//   });

//   it('should create the products table', async function() {
//     await setupDatabase();
//     expect(queryStub.calledWithMatch(/CREATE TABLE railway\.products/)).to.be.true;
//   });

//   it('should create the sales table', async function() {
//     await setupDatabase();
//     expect(queryStub.calledWithMatch(/CREATE TABLE railway\.sales/)).to.be.true;
//   });

//   it('should create the sales_products table', async function() {
//     await setupDatabase();
//     expect(queryStub.calledWithMatch(/CREATE TABLE railway\.sales_products/)).to.be.true;
//   });

//   it('should insert data into the products table', async function() {
//     await setupDatabase();
//     expect(queryStub.calledWithMatch(/INSERT INTO railway\.products/)).to.be.true;
//   });

//   it('should insert data into the sales table', async function() {
//     await setupDatabase();
//     expect(queryStub.calledWithMatch(/INSERT INTO railway\.sales/)).to.be.true;
//   });

//   it('should insert data into the sales_products table', async function() {
//     await setupDatabase();
//     expect(queryStub.calledWithMatch(/INSERT INTO railway\.sales_products/)).to.be.true;
//   });

//   it('should truncate the products table', async function() {
//     await setupDatabase();
//     expect(queryStub.calledWith('TRUNCATE TABLE railway.products')).to.be.true;
//   });

//   it('should truncate the sales table', async function() {
//     await setupDatabase();
//     expect(queryStub.calledWith('TRUNCATE TABLE railway.sales')).to.be.true;
//   });

//   it('should truncate the sales_products table', async function() {
//     await setupDatabase();
//     expect(queryStub.calledWith('TRUNCATE TABLE railway.sales_products')).to.be.true;
//   });

//   it('should end the connection', async function() {
//     const endStub = sinon.stub(connection, 'end');
//     await setupDatabase();
//     expect(endStub.called).to.be.true;
//     endStub.restore();
//   });
// });
