var pubsub = {};
(function (pubsub){
	// 静态私有变量
	var topics = {};
	var subUid = -1;
	pubsub.subscribe = function (topic, func){
		if (!topics[topic]) {
			topics[topic] = [];
		}
		var token = (++subUid).toString();
		topics[topic].push({
			token: token,
			func: func
		});
		return token;
	}
	pubsub.unsubscribe = function (token){
		for(var m in topics){
			for(var i = 0, len = topics[m].length; i < len; i++){
				if(topics[m][i].token === token){
					 topics[m][i].splice(i, 1);
					 return;
				}

			}
		}
	}

	pubsub.publish = function (topic){
		var args = Array.prototype.slice.call(arguments, 1);
		if (!topics[topic]) return false;
		for(var i = 0, len = topics[topic].length; i < len; i++){
			topics[topic][i].apply(this, args);
		}
		return this;
	}
	return pubsub;

})(pubsub)