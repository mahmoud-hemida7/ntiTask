var Product = /** @class */ (function () {
    function Product(name, price, pSize, pCategory) {
        this.sizes = [];
        this.categories = [];
        this.pName = name;
        this.pPrice = price;
        this.pSize = pSize;
        this.pCategory = pCategory;
        Product.count++;
    }
    Product.prototype.addCategory = function (singleCategory) {
        this.categories.push(singleCategory);
    };
    Product.prototype.countCatgs = function () {
        console.log(this.categories.length);
    };
    Product.prototype.addSize = function (singleSize) {
        this.sizes.push(singleSize);
    };
    Product.prototype.deleteSize = function (size) {
        this.sizes = this.sizes.filter(function (s) { return s.size != size; });
    };
    Product.countProducts = function () {
        console.log("Products count : ".concat(this.count));
    };
    Product.count = 0;
    return Product;
}());
var p1 = new Product('mobile', 5000, "m", "phones");
var p2 = new Product('tv', 8000, "l", "tvs");
var p3 = new Product('labtop', 9500, "l", "labtops");
p1.addCategory({ category: "phones" });
p2.addCategory({ category: "tvs" });
p1.addSize({ size: "m", q: 2 });
p2.addSize({ size: "s", q: 4 });
p2.addSize({ size: "m", q: 5 });
p1.countCatgs();
p2.countCatgs();
p3.countCatgs();
Product.countProducts();
p2.deleteSize('m');
console.log('p1', p1);
console.log('p2', p2);
