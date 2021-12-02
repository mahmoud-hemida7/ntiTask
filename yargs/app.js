const yargs = require('yargs'),
    {
        editUser,
        removeUser,
        addNewUser,
        showAllUsers,
        showUser
    } = require('./utils/myFunctions');

yargs.command({
    command: 'addUser',
    description: 'adding user',
    builder: {
        name: {
            type: 'string',
            demandedOption: true
        },
        email: {
            type: 'string',
            demandedOption: true
        },
    },
    handler: function (argv) {
        let user = {
            name: argv.name,
            email: argv.email
        };
        addNewUser(user)
    }
})
yargs.command({
    command: 'showAllUser',
    description: 'showing all users',
    builder: {},
    handler: function () {
        showAllUsers()
    }
})
yargs.command({
    command: 'editUser',
    description: 'editing user',
    builder: {
        id:{type: 'string',demandedOption: true},
        name:{type: 'string'},
        email:{type: 'string'}
    },
    handler: function (argv) {
        let mainData=['name','email']
        let userData={}
        mainData.forEach(e=>{
            if(argv[e]) userData[e]=argv[e]
        })
        editUser(argv.id,userData)
    }
})
yargs.command({
    command: 'removeUser',
    description: 'removing user',
    builder: {
        id:{type: 'string',demandedOption: true},
    },
    handler: function (argv) {
        removeUser(argv.id)
    }
})
yargs.command({
    command: 'showUser',
    description: 'showing user',
    builder: {
        id:{type: 'string',demandedOption: true},
    },
    handler: function (argv) {
        showUser(argv.id)
    }
})
yargs.argv
