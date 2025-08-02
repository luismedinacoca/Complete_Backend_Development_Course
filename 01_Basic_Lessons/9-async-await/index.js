function delayFn(time){
  return new Promise( (resolve) => {
    setTimeout(resolve, time)
    console.log(`setTimeout - ${time}! - in Promise`)
  })
};
async function delayedGreet(name){
  await delayFn(2000);
  console.log(name);
}

delayedGreet('Luiggie'); 

async function division(num1, num2){
  try{
    if(num2 === 0) throw new Error('Can not divide ny 0');
    return num1 / num2;
  }catch(err) {
    console.error('error', err);
    return null;
  }
}

async function mainFn(){
  console.log("await division(10, 2)")
  console.log(await division(10, 2));
  console.log("await division(10, 0)")
  console.log(await division(10, 0));
}

mainFn();