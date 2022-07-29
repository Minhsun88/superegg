'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/manager/login', controller.manager.login);
  router.post('/manager/identify', controller.manager.identify);
  router.get('/member/:page', controller.member.member);
  router.post('/member/regist', controller.member.regist);
  router.post('/member/create', controller.member.create);
  router.post('/member/update', controller.member.update);
  router.post('/member/comfirm', controller.member.comfirm);
  router.post('/member/delete', controller.member.delete);
  router.post('/member/alter', controller.member.alter);
};
