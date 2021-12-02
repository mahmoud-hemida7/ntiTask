// -------------------------------------Local storage functions----------------------------------------//

export const readLocalStaorageData = () => {
    let data
    try {
        data = JSON.parse(localStorage.getItem('users'))
        if (!data || !Array.isArray(data)) throw new Error()
    } catch (e) {
        data = []
    }
    return data
}
export const writeDataToLocalStorage = (data) => {
    localStorage.setItem("users", JSON.stringify(data))
}
export const getCurrentUserFromLocalStorage=(key) =>{
    let userId=JSON.parse(localStorage.getItem(key))
    let allUsers=readLocalStaorageData()
    return allUsers.find(u =>u.id===userId)
}
// -------------------------------------creating customized element----------------------------------------//

export const createMyOwnElement = (parent, ele, txt = null, classes = null) => {
    let myElement = document.createElement(ele)
    parent.appendChild(myElement)
    if (txt) myElement.textContent = txt
    if (classes) myElement.classList = classes
    return myElement
}
//-------------------------------------showing all users----------------------------------------//

export const showUsers = (uesrsTable) => {
    localStorage.removeItem('user')
    let users = readLocalStaorageData()
    users.forEach((user) => {
        const tr = createMyOwnElement(uesrsTable,"tr")
        createMyOwnElement(tr, "td", user.id)
        createMyOwnElement(tr, "td", user.userName)
        const td = createMyOwnElement(tr, "td", null, 'd-flex justify-content-between')
        const showBtn = createMyOwnElement(td, "button", "Show Details", "btn btn-primary mx-2 showBtn")
        showBtn.addEventListener("click", () => showUserPage(user.id))
        const addBtn = createMyOwnElement(td, "button", "Add Balance", "btn btn-success mx-2")
        addBtn.addEventListener("click", () => addBalancePage(user.id))
        const withdrawBtn = createMyOwnElement(td, "button", "Withdraw Balance", "btn btn-warning mx-2")
        withdrawBtn.addEventListener('click', () => withdrawPage(user.id))
    })
}
//-------------------------------------navigation functions------------------------------------//

export const showUserPage = (id) => {
    localStorage.setItem("user", JSON.stringify(id))
    window.location.replace('showUser.html')
}
export const addBalancePage=(id) =>{
    localStorage.setItem("user", JSON.stringify(id))
    window.location.replace('addBalance.html')
}
export const withdrawPage=(id) =>{
    localStorage.setItem("user", JSON.stringify(id))
    window.location.replace('withdrawBalance.html')
}

//--------------------------------------------add user--------------------------------//

export const addUser = (user) => {
    let data = readLocalStaorageData();
    data.push(user)
    writeDataToLocalStorage(data)
}

//-----inserting transaction and change balance >>runs the next 2 functions------------//

export function transactionProcess(form,type,id){
    form.addEventListener('submit', function (e) {
        e.preventDefault()
        const transaction = {
            type,
            amount:type == 'Add' ? '+'+this.elements.balance.value : '-'+this.elements.balance.value, 
            date: new Date().toDateString()
        }
        addTransaction(transaction,id)
        changeBalance(transaction.amount,id)
        this.reset()
        window.location.replace("showUser.html");
    })
}

//-----------------------inserting transaction into transaction history---------------------//

export const addTransaction=(transaction,id) =>{
    let allUsers=readLocalStaorageData()
    let currentUser=allUsers.find(u =>u.id==id)
    currentUser.transactions.push(transaction)
    writeDataToLocalStorage(allUsers)
}

//-------------------------------------change user balance----------------------//

export const changeBalance=(amount,id)=>{
    let allUsers=readLocalStaorageData()
    let user=allUsers.find(u =>u.id===id)
        user.balance=parseInt(user.balance) + parseInt(amount)
    writeDataToLocalStorage(allUsers)
}

