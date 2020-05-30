const user = "5ece9c2ccfc90f416048bbfe"
const friend = "5ece9c39cfc90f416048bbff"
    
// if( user > friend ){
//     console.log('hee');
//     console.log(friend.concat(user));
    
// }
// else{
//     console.log('hoo')
//     console.log(user.concat(friend))
// }

const chatId = (user>friend)?  friend.concat(user):  user.concat(friend);
console.log(chatId)