function getString() {
  return new Promise((resolve, resject) => {
    setTimeout(() => {
      resolve('Hello world!!!')
    }, 2000)
  })
}

async function helloWorld() {
  let string = await getString();
  console.log(string);
}

export default helloWorld