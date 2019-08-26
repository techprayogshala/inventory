const supertest = require('supertest');
const bodyParser = require('body-parser');
const express = require('express');
const connect = require('../../connect');

describe('AssetRoute', () => {
  let app;
  const db = connect.getDbInstance();

  beforeEach(() => {
    app = express();
    app.use(bodyParser.json());
    app.use('/shopping-centre', require('./assetsRouter'));
  });

  describe('#getAssets', () => {
    it('should get all asset', async () => {
      spyOn(db, 'all').and.callFake((query, params, callback) => {
        expect(query).toBeDefined();
        expect(params.length).toBe(0);
        callback(null, [{ assetId: '01' }]);
      });

      const response = await supertest(app)
        .get('/shopping-centre/assets/')
        .expect(200);

      expect(JSON.parse(response.text)).toEqual([{ assetId: '01' }]);
    });

    it('should get specific shopping asset ', async () => {
      spyOn(db, 'all').and.callFake((query, params, callback) => {
        expect(query).toBeDefined();
        expect(params[0]).toBe('asset-01');
        callback(null, { assetId: '01' });
      });

      const response = await supertest(app)
        .get('/shopping-centre/assets/asset-01')
        .expect(200);

      expect(JSON.parse(response.text)).toEqual({ assetId: '01' });
    });

    it('should handle error when add asset fails', async () => {
      spyOn(db, 'all').and.callFake((query, params, callback) => {
        callback('err');
      });

      await supertest(app)
        .post('/shopping-centre/centre-01/assets/add')
        .send({ assetId: 'asset-id-01', name: 'name', dimension: 'dimension', status: 'status' })
        .expect(500);
    });
  });

  describe('#addAsset', () => {
    it('should add asset', async () => {
      spyOn(db, 'run').and.callFake((query, params, callback) => {
        expect(query).toBeDefined();
        expect(params.length).toBe(6);
        callback(null, { status: 'success' });
      });

      const response = await supertest(app)
        .post('/shopping-centre/centre-01/assets/add')
        .send({ assetId: 'asset-id-01', name: 'name', dimension: 'dimension', status: 'status' })
        .expect(200);

      expect(JSON.parse(response.text).status).toBe('success');
    });

    it('should handle error when add asset fails', async () => {
      spyOn(db, 'run').and.callFake((query, params, callback) => {
        callback('err');
      });

      await supertest(app)
        .post('/shopping-centre/centre-01/assets/add')
        .send({ assetId: 'asset-id-01', name: 'name', dimension: 'dimension', status: 'status' })
        .expect(500);
    });
  });

  describe('#updateAsset', () => {
    it('should update asset', async () => {
      spyOn(db, 'run').and.callFake((query, params, callback) => {
        expect(query).toBeDefined();
        expect(params.length).toBe(3);
        callback(null, { status: 'success' });
      });

      const response = await supertest(app)
        .put('/shopping-centre/centre-01/assets/asset-01')
        .send({ status: 'active' })
        .expect(200);

      expect(JSON.parse(response.text).status).toBe('success');
    });

    it('should handle error when update asset operation fails', async () => {
      spyOn(db, 'run').and.callFake((query, params, callback) => {
        callback('err');
      });

      await supertest(app)
        .put('/shopping-centre/centre-01/assets/asset-02')
        .send({ assetId: 'asset-id-01', name: 'name', dimension: 'dimension', status: 'status' })
        .expect(500);
    });
  });

  describe('#removeAsset', () => {
    it('should remove asset', async () => {
      spyOn(db, 'run').and.callFake((query, params, callback) => {
        expect(query).toBeDefined();
        expect(params.length).toBe(1);
        callback(null, { status: 'success' });
      });

      const response = await supertest(app)
        .delete('/shopping-centre/centre-01/assets/asset-01')
        .expect(200);

      expect(JSON.parse(response.text).status).toBe('success');
    });

    it('should handle error when remove asset operation fails', async () => {
      spyOn(db, 'run').and.callFake((query, params, callback) => {
        callback('err');
      });

      await supertest(app)
        .delete('/shopping-centre/centre-01/assets/asset-02')
        .expect(500);
    });
  });
});
