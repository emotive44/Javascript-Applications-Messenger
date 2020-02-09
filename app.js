function attachEvents() {
    document.getElementById('submit').addEventListener('click', send);
    document.getElementById('refresh').addEventListener('click', show);
    document.getElementById('delete').addEventListener('click', deleted);
}

const url = 'https://messanger-1739d.firebaseio.com/.json';

function send() {
    let name = document.getElementById('author');
    let content = document.getElementById('content');
    let message = {
        'author': name.value,
        'content': content.value
    }
    if(name.value.length < 1 || content.value.length < 1) {
        return;
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
    .then(res => res.json())
    .then(() => {name.value = ''; content.value = ''})
    .then(show)
}


function show() {
    fetch(url)
        .then(res => res.json())
        .then(loadMessage)
        
}

function loadMessage(data) {
    let result = document.getElementById('messages');
    let str = '';
    Object.entries(data).map(x => {
        str += `${x[1].author}:  ${x[1].content}\n`
    });
    result.value = str;
}

function deleted() {
    fetch(url, {
        method: 'delete',
      })
      .then(response => response.json())
      .then(() => document.getElementById('messages').value = '');
}

attachEvents();
