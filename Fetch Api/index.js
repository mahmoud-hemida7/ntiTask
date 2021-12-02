const url = 'https://jsonplaceholder.typicode.com/';
const apis=[
    {
        title:'posts',
        attr:['userId',"title","body"],
        methods:['GET', 'POST', 'PUT','DELETE']
    },
    {
        title:'todos',
        attr:['userId',"title","completed"],
        methods:['GET', 'POST', 'PUT','DELETE']
    },
    {
        title:'comments',
        attr:["id","email","name","body"],
        methods:['GET', 'POST', 'PUT','DELETE']
    }
]
const createMyOwnElement = (parent, ele, txt = null, classes = null) => {
    let myElement = document.createElement(ele)
    parent.appendChild(myElement)
    if (txt) myElement.textContent = txt
    if (classes) myElement.classList = classes
    return myElement
}
const btnWrapper=document.querySelector('#btnWrapper')
const dataWrapper=document.querySelector('#dataWrapper')
const methodsWrapper=document.querySelector('#methodsWrapper')

apis.forEach(api => {
    let btn=createMyOwnElement(btnWrapper,'button',api.title,'btn btn-primary mx-2')
    btn.addEventListener('click',()=>{
        methodsWrapper.textContent=''
        dataWrapper.textContent=''
        api.methods.forEach(method => {
            let subBtn=createMyOwnElement(methodsWrapper,'button',method,'btn btn-success mx-2')
            subBtn.addEventListener('click',async function(){
                dataWrapper.textContent=''
                let loading;
                if (dataWrapper.textContent=='') loading=createMyOwnElement(dataWrapper,'h2','Loading . . .','text-center')
                let data;
                try{
                    switch(method){
                        case 'GET':
                            data= await (await fetch(`${url}${api.title}`)).json()
                            break;
                        case 'POST':
                        case 'PUT':
                            await fetch(`${url}${api.title}`,{
                                method,
                                body: JSON.stringify({
                                    title: 'foo',
                                    body: 'bar',
                                    userId: 1,                            
                                }),
                                headers: {'Content-Type': 'application/json'}
                            })
                            break;
                        case 'DELETE':
                            await fetch(`${url}${api.title}`,{
                                method
                            })
                            break;
                        default:
                            throw new Error('error fetching data')
                    }
                createMyOwnElement(dataWrapper,'h1',api.title,'text-center')
                if(data){
                    loading.textContent=''
                    const table=createMyOwnElement(dataWrapper,'table','','table table-striped')
                    const thead=createMyOwnElement(table,'thead')
                    api.attr.forEach(item=>{
                        createMyOwnElement(thead,'th',item)
                    })
                    const tbody=createMyOwnElement(table,'tbody')
                    data.forEach(item=>{
                        let tr=createMyOwnElement(tbody,'tr')
                        api.attr.forEach(i=>{
                            createMyOwnElement(tr,'td',item[i])
                        })
                    })
                }else{
                    loading.textContent=''
                    createMyOwnElement(dataWrapper,'h3',`${method} request sent`,'text-center mt-5')
                }
                }
                catch(err){
                    console.error(err.message)
                }
            })
        })
    })
})