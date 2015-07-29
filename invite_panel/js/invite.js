//cross-browser event binding/detachEvent
var EventUtil = {
  addHandler: function (element, type, handler) {
    if (element.addEvnetListener) {
      element.addEvnetListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, handler);
    } else {
      element['on' + type] = handler;
    }
  },
  removeHandler: function (element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, handler);
    } else {
      element['on' + type] = null;
    }
  }
};

//create xhr object
function createXHR() {
  if (typeof XMLHttpRequest != 'undefined') {
    return new XMLHttpRequest();
  } else if (typeof ActiveXObject != 'undefined') {
    if (typeof arguments.callee.activeXString != 'string') {
      var versions = [
        'MSXML2.XMLHttp.6.0',
        'MSXML2.XMLHttp.3.0',
        'MSXML2.XMLHttp'
      ],
      i,
      len;
      for (i = 0, len = versions.length; i < len; i++) {
        try {
          new ActiveXObject(versions[i]);
          arguments.callee.activeXString = versions[i];
          break;
        } catch (ex) {
          //skip
        }
      }
    }
    return new ActiveXObject(arguments.callee.activeXString);
  } else {
    throw new Error('NO XHR object available.');
  }
};

//render the invited list
function listRender(jsonObj) {
  var linklist = document.getElementById('invite-status');
  linklist.innerHTML = '';
  var len = jsonObj['invited'].length;
  switch (len) {
    case 0:
      break;
    case 1:
      var separator1 = document.createTextNode('您已邀请 ');
      linklist.appendChild(separator1);
      var personlink = document.createElement('A');
      personlink.innerHTML = jsonObj['invited'][len - 1]['name'];
      personlink.href = '/index.html';
      linklist.appendChild(personlink);
      break;
    case 2:
      var separator1 = document.createTextNode('您已邀请 ');
      linklist.appendChild(separator1);
      var personlink1 = document.createElement('A');
      personlink1.innerHTML = jsonObj['invited'][len - 2]['name'];
      personlink1.href = '/index.html';
      linklist.appendChild(personlink1);
      var separator2 = document.createTextNode('、 ');
      linklist.appendChild(separator2);
      var personlink2 = document.createElement('A');
      personlink2.innerHTML = jsonObj['invited'][len - 1]['name'];
      personlink2.href = '/index.html';
      linklist.appendChild(personlink2);
      break;
    default:
      var separator1 = document.createTextNode('您已邀请 ');
      linklist.appendChild(separator1);
      var personlink1 = document.createElement('A');
      personlink1.innerHTML = jsonObj['invited'][len - 2]['name'];
      personlink1.href = '/index.html';
      linklist.appendChild(personlink1);
      var separator2 = document.createTextNode('、 ');
      linklist.appendChild(separator2);
      var personlink2 = document.createElement('A');
      personlink2.innerHTML = jsonObj['invited'][len - 1]['name'];
      personlink2.href = '/index.html';
      linklist.appendChild(personlink2);
      var num = ' 等 ' + jsonObj['invited'].length + ' 人';
      var separator3 = document.createTextNode(num);
      linklist.appendChild(separator3);
      break;
  }
};

//render the ul of recommended person
function ulRender(jsonObj) {
  len = jsonObj['recommended'].length;
  var btnlist = document.getElementById('invitelist');
  for (var i = 0; i < len; i++) {
    var inviteli = document.createElement('LI');
    if (i % 2 == 0) {
      inviteli.className = 'personodd';
    } else {
      inviteli.className = 'personeven';
    }
    var introductiondiv = document.createElement('DIV');
    introductiondiv.className = 'person-introduction';
    var imglink = document.createElement('A');
    imglink.href = '/index.html';
    imglink.className = 'avatar';
    var personavatar = document.createElement('IMG');
    personavatar.src = jsonObj['recommended'][i]['avatarUrl'];
    var informationdiv = document.createElement('DIV');
    informationdiv.className = 'person-information';
    var invitebtn = document.createElement('BUTTON');
    invitebtn.className = 'btninvite';
    invitebtn.innerHTML = '邀请回答';
    var namediv = document.createElement('A');
    namediv.href = '/index.html';
    namediv.className = 'name';
    namediv.innerHTML = jsonObj['recommended'][i]['name'];
    var biodiv = document.createElement('DIV');
    biodiv.className = 'bio';
    biodiv.innerHTML = jsonObj['recommended'][i]['bio'];
    informationdiv.appendChild(invitebtn);
    informationdiv.appendChild(namediv);
    informationdiv.appendChild(biodiv);
    imglink.appendChild(personavatar);
    introductiondiv.appendChild(imglink);
    introductiondiv.appendChild(informationdiv);
    inviteli.appendChild(introductiondiv);
    btnlist.appendChild(inviteli);
  }
};

//render the page when you first load this HTML
var refresh = function () {
  var xhr = createXHR();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || xhr.status == 0) {
        jsonObj = eval('(' + xhr.responseText + ')');
        listRender(jsonObj);
        ulRender(jsonObj);
      } else {
        alert('Request was unsuccessful: ' + xhr.status);
      }
    }
  }
  xhr.open('get', 'invite_panel.json', false);
  xhr.send(null);
};

var btnlist = document.getElementById('invitelist');
//(event delegation) render the invited list when you click either button
var inviteByBtn = function (e) {
  e = e || window.event;
  var target = e.target || e.srcElement;
  if (target.nodeName.toLowerCase() == 'button') {
          if (target.className == 'btninvite') {
            target.className = 'btninvited';
            target.innerHTML = '收回邀请';
            len = jsonObj['recommended'].length;
            for (var i = 0; i < len; i++) {
              if (jsonObj['recommended'][i]['name'] == target.nextSibling.innerHTML) {
                var pos = i;
                break;
              }
            }
            jsonObj['invited'].push(jsonObj['recommended'][pos]);
            jsonObj['recommended'].splice(pos, 1);
          } else {
            target.className = 'btninvite';
            target.innerHTML = '邀请回答';
            len = jsonObj['invited'].length;
            for (var i = 0; i < len; i++) {
              if (jsonObj['invited'][i]['name'] == target.nextSibling.innerHTML) {
                var pos = i;
                break;
              }
            }
            jsonObj['recommended'].push(jsonObj['invited'][pos]);
            jsonObj['invited'].splice(pos, 1);
          }
          listRender(jsonObj);
      
  }
};
EventUtil.addHandler(document.getElementsByTagName('body') [0], 'load', refresh);
EventUtil.addHandler(btnlist, 'click', inviteByBtn);
