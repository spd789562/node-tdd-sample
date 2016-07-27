/* jshint esversion: 6*/
import FacebookHelper from '../../../src/facebook/helper.js';
import task1_initModel from '../../../src/database/task1';

describe.only('facebook-helper', () => {
  let facebookHelper = null;
  let models = null;
  let likeslist = null;
  let lktest = null;
  before(async (done) => {
    const userId = '659260084208505';
    const token = 'EAACEdEose0cBAK5K06qBRSKKy2yhhKtSXdezeOmYmAK8MY7pdGB7PKRlk4gR1kCBqB1AEeQts1yJZCBmPP6D5HNve7CvmiB7olNCaKsFEyi3zzio9bEOvuZBfn6qI4Fesk6jUpvX7ltU1lR5mltekYYbFBBUH2Ywxy9dZBq2gZDZD';
    facebookHelper = new FacebookHelper({ userId, token });

    models = await task1_initModel();

    done();
  });
  // 因為沒朋友只好用自己的所按過的讚
  it('get my likeslist', async (done) => {
    try {
      likeslist = await facebookHelper.getFriends();
      (likeslist != null).should.be.true;
      likeslist.should.be.Array;
      likeslist[0].should.have.keys('name', 'id', 'created_time', 'category');

      console.log(`likselist ${likeslist[3].name}`);

      lktest = await models.Likeslist.bulkCreate(likeslist);

      lktest[0].name.should.be.eq(likeslist[0].name);
      done();
    } catch (e) {
      done(e);
    }
  });
  // 修改某讚的名稱
  it('modify likes name', async (done) => {
    try {
      const newLikesName = 'trunk-studio';
      let result = {};
      result = await models.Likeslist.findOne({
        where: {
          name: '創科資訊 Trunk Studio',
        },
      });
      console.log(`find ${result}`);

      result.name = newLikesName;
      await result.save();

      result.name.should.be.eq(newLikesName);
      done();
    } catch (e) {
      done(e);
    }
  });
  // 刪除
  it('delete likes', async (done) => {
    try {
      let result = {};
      result = await models.Likeslist.findOne({
        where: {
          name: 'trunk-studio',
        },
      });
      console.log(`find ${result}`);
      await result.destroy();
      //  檢測是否正確刪除
      const resultAfter = await models.Likeslist.findOne({
        where: {
          name: 'trunk-studio',
        },
      });
      (resultAfter === null).should.be.true;
      done();
    } catch (e) {
      done(e);
    }
  });
  // 發八七文
  it.skip('publish post', async (done) => {
    try {
      const post = {
        message: 'i\'m got the fire',
      };
      const result = await facebookHelper.publishPost(post);
      done();
    } catch (e) {
      done(e);
    }
  });
});
