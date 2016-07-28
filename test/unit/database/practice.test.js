/* jshint esversion:6 */
import task1_initModel from '../../../src/database/task1';

describe('practice', () => {
  let models = null;
  beforeEach(async (done) => {
    try {
      models = await task1_initModel();
      done();
    } catch (e) {
      done(e);
    }
  });

  it('在資料庫中 Post table 中新增一個 price 欄位 data types 為 INTEGER', async (done) => {
    try {
      const data = {
        title: 'post a',
        desc: 'post desc',
        price: 100,
      };
      const result = await models.Post.create(data);
      result.toJSON().should.has.keys(
        'id',
        'title',
        'desc',
        'price',
        'createdAt',
        'updatedAt'
      );
      result.price.should.be.eq(data.price);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('使用 sequelize 新增一個 post 使測試 pass', async (done) => {
    try {
      const input = {
        title: 'AAA',
        desc: 'BBB',
        price: 100,
      };

      const result = await models.Post.create(input);

      result.title.should.be.eq('AAA');
      result.desc.should.be.eq('BBB');
      result.price.should.be.eq(100);
      done();
    } catch (e) {
      done(e);
    }
  });

  describe('practice find', () => {
    let modelsSec = null;
    let targetPost = null;
    beforeEach(async (done) => {
      try {
        modelsSec = await task1_initModel();
        const data = {
          title: 'post a',
          desc: 'post desc',
          price: 100,
        };
        targetPost = await modelsSec.Post.create(data);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('使用 sequelize 尋找 targetPost ', async (done) => {
      try {
        const findTarget = await modelsSec.Post.findById(targetPost.id);
        findTarget.id.should.be.eq(targetPost.id);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('使用 sequelize 更新 targetPost 的資料', async (done) => {
      try {
        const input = {
          title: '123',
          desc: '456',
          price: 999,
        };

        let findTarget = await models.Post.create(targetPost);
        findTarget.title = input.title;
        findTarget.desc = input.desc;
        findTarget.price = input.price;
        await findTarget.save();

        findTarget.title.should.be.eq(input.title);
        findTarget.desc.should.be.eq(input.desc);
        findTarget.price.should.be.eq(input.price);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('使用 sequelize 刪除 targetPost', async (done) => {
      try {
        console.log('======使用 sequelize 刪除 targetPost=====');

        const findTarget = await modelsSec.Post.findById(targetPost.id);
        await findTarget.destroy();

        const check = await modelsSec.Post.findAll();
        (check.length === 0).should.be.true;
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
