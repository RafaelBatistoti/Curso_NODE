const p = Promise.resolve({id:'10'})
p.then(resultado => console.log('Resultado:', resultado))

const pro = Promise.reject(new Error('motivo do erro'))
pro.catch((erro => console.log(erro)))