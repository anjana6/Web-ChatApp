const users = [];

const userJoin = (id,username,room) => {
    const user = {id,username,room};
    console.log(user);

    users.push(user);

    return user;


}

const getCurrentUser = () =>{
    return users.find(user => user.id === id);
}

module.exports = {userJoin,getCurrentUser};