// var call = {
//     callme : function(n) {
//         return n>0 ? call.callme(n-1) + "a" : "hiy"
//     },
//     calling : function(n){
//         return n>0 ? this.calling(n-1) + "o" : "woooh"
//     }
// }

// console.log(call.callme(4))
// console.log(call.calling(5))


// var x = 1 
// function call(){
//     console.log(x)
//     var x = 12
//     console.log(x)
// }
// call()
// console.log(x++)

// var obj = {
//     value : true,
//     hehe : function() {
//         this.value = !this.value
//     }
// }
// var func = obj.hehe
// func()
// console.log(obj.value);


// call1()
// call2()

// var call2 = function(){
//     console.log("called 2");
// }
// function call1(){
//     console.log("called 1");
// }

function sortByCloset(arr, num){
    return arr.sort((a,b) => Math.abs(num-a) - Math.abs(num-b))
}
function sortByClosetLogical(arr, num){
    let sorted = []
    while(arr.length) {
        let min = arr[0]
        let minIndex = 0
        for(let i=1; i<arr.length; i++) {
            if(Math.abs(num-arr[i]) < Math.abs(num-min)) {
                min = arr[i]
                minIndex = i
            }
        }
        sorted.push(min)
        arr.splice(minIndex, 1)
    }
    return sorted
}


console.log(sortByCloset([2,4,6,8], 5))