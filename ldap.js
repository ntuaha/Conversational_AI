const ldap = require('ldapjs');
//const assert = require('assert');

const user = '<user>'
const password = '<pwd>'

const ldap_config = {
	url: '<uri>',
	tlsOptions: {
		'rejectUnauthorized': false
	}
}

function get_ldap() {
	var _ldap = ldap.createClient(ldap_config);
	_ldap.on('error', (err) => {
		console.log(err);
		_ldap.unbind();
	})
	return _ldap;
}

const client = get_ldap();

client.bind('<dn>', '<dn_pwd>', (err) => {
	if (err) {

		console.log(err);
		client.unbind();
	} else {
		console.log('ok');
		client.search('<base>', {
			filter: `(sAMAccountName=${user})`,
			sizeLimit: 1,
			scope: 'sub'
		}, (err, res) => {
			if (err) {
				console.log('res error' + err);
				client.unbind();
				return;
			}
			res.on('searchRequest', (searchRequest) => {
				console.log('serchRequest: ', searchRequest.messageID);
			})
			res.on('searchEntry', (entry) => {
				console.log('entry: ' + JSON.stringify(entry.object));
				login(entry.object.dn);
			})
			res.on('searchReference', (referral) => {
				console.log('referral: ' + referral.uris.join());
			})
			res.on('error', (err) => {
				console.error('error: ' + err.message);
			})
			res.on('end', (result) => {
				console.log('end: ' + result.status);
				client.unbind()
			})

		})
	}
})


function login(dn) {
	var _client = get_ldap();
	_client.bind(dn, password, (err) => {
		_client
		if (err) {
			console.log('dn: ' + dn)
			console.log('login err: ' + err);
			_client.unbind()
			return
		}
		console.log('congratuation: ' + dn);
		_client.unbind()
	})
}
