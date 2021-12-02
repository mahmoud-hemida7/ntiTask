interface ISizes{
    size:string
    q:number
}
interface ICategories{
    category:string
}
class Product{
    static count=0
    pName:string
    pPrice:number
    pSize:string
    pCategory:string
    sizes:ISizes[]=[]
    categories:ICategories[]=[]
    constructor(name:string,price:number,pSize:string,pCategory:string){
        this.pName=name
        this.pPrice=price
        this.pSize=pSize
        this.pCategory=pCategory
        Product.count++
    }
    addCategory(singleCategory:ICategories){
        this.categories.push(singleCategory)
    }
    countCatgs():void{
        console.log(this.categories.length)
    }
    addSize(singleSize:ISizes){
        this.sizes.push(singleSize)
    }
    deleteSize(size:string){
        this.sizes=this.sizes.filter(s => s.size!=size)
    }
    static countProducts():void{
        console.log(`Products count : ${this.count}`)
    }
}
const p1=new Product('mobile',5000,"m","phones")
const p2=new Product('tv',8000,"l","tvs")
const p3=new Product('labtop',9500,"l","labtops")
p1.addCategory({category:"phones"})
p2.addCategory({category:"tvs"})
p1.addSize({size:"m",q:2})
p2.addSize({size:"s",q:4})
p2.addSize({size:"m",q:5})
p1.countCatgs()
p2.countCatgs()
p3.countCatgs()
Product.countProducts()
p2.deleteSize('m')
console.log('p1',p1)
console.log('p2',p2)