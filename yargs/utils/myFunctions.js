const { v4: uuid } = require('uuid'),
    {writeFileSync,readFileSync} = require('fs'),
    chalk = require('chalk'),
    {isEmail} = require('validator');

const write=(users)=>{
    writeFileSync('file.json', JSON.stringify(users))
}
const read =()=>{
    let data;
    try{
        data=JSON.parse(readFileSync('file.json'))
        if(!Array.isArray(data)) throw new Error()
    }
    catch(err) {
        data=[]
    }
    return data
} 
const addNewUser=(userData)=>{
    try{
        let allUsers =read()
        validateEmail(userData.email)
        checkUnique(allUsers, userData.email,'email')
        let user={
            id:uuid(),
            ...userData
        }
        allUsers.push(user)
        write(allUsers)
        console.log(chalk.green('user added'))
    }
    catch(err){
        printError(err)
    }
}
const showAllUsers=()=>{
    try{
        let allUsers =read()
        if(allUsers.length===0) throw new Error('no users yet')
        console.log(chalk.green(`your file has ${allUsers.length} users`))
        console.log(allUsers)
    }
    catch(err){
        printError(err)
    }
}
const showUser=(id)=>{
    try{
        let allUsers =read()
        const index=findUserById(allUsers,id)
        printSingle(allUsers[index])
    }
    catch(err){
        printError(err)
    }
}
const editUser=(id,userData)=>{
    try{
        let allUsers = read()
        let index = findUserById(allUsers, id)
        validateEmail(userData.email)
        // const exist=allUsers.find(u=>u.email==userData.email)
        // if(!exist) throw new Error('email is not found')
        // if(exist.id!=id) throw new Error('wrong email')
        checkUnique(allUsers,userData.email,'email',index)
        for(let item in userData){              
            allUsers[index][item]=userData[item]
        }
        write(allUsers)
        console.log(chalk.green("user updated"))
    }
    catch(err){             
        printError(err)
    }
}
const removeUser=(id)=>{
    try{
        let allUsers =read()
        let index=findUserById(allUsers,id)
        allUsers.splice(index, 1)
        write(allUsers)
        console.log(chalk.green("user deleted"))
    }
    catch(err){
        printError(err)
    }
}
const findUserById = (allUsers, userId)=>{
    let index = allUsers.findIndex(user =>userId == user.id)
    if(index==-1) throw new Error("user not found")
    return index
}
//print single user
const printSingle = (user)=>{
    console.log(chalk.green(`id: ${user.id} - user name: ${user.name} - user email: ${user.email}`))
}
//print error message 
const printError = (e)=>{
    console.log(chalk.red(e.message))
}
//validate email
const validateEmail = (email)=>{
    if(!isEmail(email)) throw new Error('invalid email')
}
const checkUnique=(allUsers,data,attr,index=null)=>{
    const notUnique =allUsers.find((u,i)=>u[attr]==data && i!==index)
    if(notUnique) throw new Error(`${attr} used before`)
}
module.exports = {
    addNewUser,showAllUsers,showUser,editUser,removeUser
}