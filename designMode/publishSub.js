var pubsub = {};
(function (myObject){
	var topics = {};
	var subUid = -1;
	myObject.publish = function (topic, args){
		if (!topics[topic]) {
			return false;
		}
		for(var i = 0, len = topics[topic].length; i < len; i++){
			topics[topic].func(topic, args);
		}
		return this;
	}
	myObject.subscribe = function (topic, func){
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
	myObject.unsubscribe = function (token){
		for(var m in topics){
			if(topics[m]){
				for(var i = 0, len = topcis[m].length; i < len; i++){
					if (topics[m][i].token == token ) {
						topcis[m].splice(i, 1);
						return token;
					}
				}
			}
		}
		return this;
	}
})(pubsub)