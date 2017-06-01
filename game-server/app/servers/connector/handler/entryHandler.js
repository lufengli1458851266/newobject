module.exports = function(app) {
	console.log('aaaaaaaaaaaaa');
  return new Handler(app);
};

var Handler = function(app) {
	console.log('bbbbbbbbb');
  this.app = app;
};

/**
 * New client entry.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.entry = function(msg, session, next) {
	var sessionService = this.app.get('sessionService');
	session.bind(msg.uid);  //用户注册
    var s = sessionService.getByUid(msg.uid);
    console.log(s);
    this.channelService = this.app.get('channelService');  
    let channel = this.channelService.getChannel('chat1', true);//得到channel
	
	let sid = this.app.get('serverId');
	//s[0].uid==msg.uid;
	channel.add(msg.uid, sid);//注册uid
	var param = {  
            route: 'onChat',  
            msg: {code: 200, msg: '你已上线'}  
    };  

	channel.pushMessage(param);  

    //let sid = this.app.get('serverId'); 
    //console.log(sid); 
    // for(let key in s[0]){
    // 	console.log(key);
    // }
    // console.log('id:'+s[0].id);
    // console.log('uid'+s[0].uid);

    //sessionService.sendMessage(s[0].id,{code: 200, msg: '你已上线'});
    
    //sessionService.sendMessageByUid(s[0].uid,{code: 200, msg: '你已上线'})
    //session.on('closed', onUserLeave.bind(null, this.app));

	console.log('收到:'+msg);
	
  //next(null, {code: 200, msg: 'game 服务 is ok.'});
};

/**
 * Publish route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.publish = function(msg, session, next) {
	console.log('ddddddddd');
	var result = {
		topic: 'publish',
		payload: JSON.stringify({code: 200, msg: 'publish message is ok.'})
	};
  next(null, result);
};

/**
 * Subscribe route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.subscribe = function(msg, session, next) {
	console.log('eeeeeeeee');
	var result = {
		topic: 'subscribe',
		payload: JSON.stringify({code: 200, msg: 'subscribe message is ok.'})
	};
  next(null, result);
};
