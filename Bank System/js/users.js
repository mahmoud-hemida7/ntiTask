import {
    getCurrentUserFromLocalStorage,
    createMyOwnElement,
    transactionProcess,
    showUsers,
    addUser
} from './myFunctions.js'

const addUserForm = document.querySelector("#addUser"),
    userName = document.querySelector("#profileName"),
    userAdress = document.querySelector("#profileAdress"),
    userAccNumber = document.querySelector("#accNumber"),
    userBalance = document.querySelector("#userBalance"),
    transactions = document.querySelector("#transactions"),
    addedBalanceForm = document.querySelector('#addBalance'),
    withdrawBalanceForm = document.querySelector('#withdrawBalance'),
    allUsersTable = document.querySelector("#users");

//show all users
if (allUsersTable) {
    showUsers(allUsersTable)
}
//adding user
if (addUserForm) {
    addUserForm.addEventListener('submit', function (e) {
        e.preventDefault()
        const user = {
            id: Date.now(),
            userName: this.elements.userName.value,
            adress: {
                city: this.elements.city.value,
                street: this.elements.street.value,
                building: this.elements.building.value,
            },
            balance: this.elements.balance.value,
            transactions: []
        }
        addUser(user)  //line 65 in myFunctions
        this.reset()
        window.location.replace("index.html");
    })
}
//showing user
if (userName) {
    try {
        let user = getCurrentUserFromLocalStorage("user") 
        userName.innerHTML = user.userName
        userAdress.innerHTML = `${user.adress.city} , ${user.adress.street} , Building No ${user.adress.building}`;
        userBalance.innerHTML = ` $ ${user.balance}`
        userAccNumber.innerHTML = user.id;
        user.transactions.forEach(t => {
            const tr = createMyOwnElement(transactions, "tr",null,t.type == 'Add' ? 'greenborder' : 'redborder')
            createMyOwnElement(tr, "td", t.type, t.type == 'Add' ? 'green' : 'red')
            createMyOwnElement(tr, "td", t.amount, 'text-center')  
            createMyOwnElement(tr, "td", t.date)
        })
        localStorage.removeItem('user')
    } catch (err) {
        console.error(err)
        alert('faied to show user')
    }
}
//add transaction
if (addedBalanceForm) {
    let user = getCurrentUserFromLocalStorage("user")
    try {
        transactionProcess(addedBalanceForm, 'Add', user.id)  
    } catch (err) {
        console.error(err)
    }
}
if (withdrawBalanceForm) {
    let user = getCurrentUserFromLocalStorage("user")
    withdrawBalanceForm.elements.balance.setAttribute('max', user.balance)
    try {
        transactionProcess(withdrawBalanceForm,'Withdraw', user.id)
    } catch (err) {
        console.error(err)
    }
}
else{
    console.error('page not found')
}