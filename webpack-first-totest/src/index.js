
if(module && module.hot) {
    module.hot.accept()
}
import './index.less';
class Animal {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
console.log(DEV)
const dog = new Animal('dog');
console.log('accaannnddfsrssdsssrrssssf');

fetch("/api/user")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));

fetch("/login/account",{
    method: 'POST',
    body: JSON.stringify({password: '888888', username: 'admin'}),
    headers: new Headers({
    'Content-Type': 'application/json'
    })
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
document.getElementById('btn').onclick = function() {
    import('./handle').then(fn => fn.default());
}
