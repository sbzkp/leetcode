var number = 5;
var obj = {
    number: 10,
    fn: (function () {
        var number;
        this.number *= 2;
        number = number * 2;
        number = 40;
        console.log(number)
        return function () {
            var num = this.number;
            // console.log(num)
            console.log(number)

            this.number *= 2;
           // console.log(this.number);
            number *= 3;
            console.log(number);
        }
    })()
}

var myFun = obj.fn;
myFun()


num = 10;
window.number = 20
number = 120

obj.fn();

this.number = 10;

num = 10;
this.number = 20;
number =120 












console.log(window.number);

[
    {
        key: one,
        value: "one"
    },
    {
        key: two,
        value: [
            { key: student }
        ]
    },
    {
        key: three,
        value: "one"
    },
    {
        key: four,
        value: "one"
    }
]

var iterator = (arr)=>{

    const innerFunction = ()=>{

    }


}