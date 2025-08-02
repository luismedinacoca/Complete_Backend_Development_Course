/*
  var Promise: PromiseConstructor
  new <any>(executor: (resolve: (value: any) => void, reject: (reason?: any) => void) => void) => Promise<any>
 */

function delayFn(time){
  return new Promise((resolve) => { setTimeout(resolve, time)});
}

console.log('Promise lecture starts');
delayFn(2000).then( () => console.log('after TWO seconds promise resolved!'));
console.log('End promise lecture!');

/*
Outcome:
- Promise lecture starts
- End promise lecture!
- after TWO seconds promise resolved!  //after 2 seconds
*/

function divideFn(num1, num2){
  return new Promise((resolve, reject) => {
    if(num2 === 0){
      reject('Can NOT perform division by 0');
    } else {
      resolve(num1/num2);
    }
  })
}

divideFn(10, 5)
  .then( result => console.log(result, "res"))
  .catch(error => console.log(error, "err")); 

divideFn(10, 0)
  .then( result => console.log(result, "res"))
  .catch(error => console.log(error, "err")); 
