exports.decode = function (frase, passo){
  var alfabeto = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  var frase = frase.toLowerCase();

  // var desloc = passo;
  var box = [];
  // console.log(" funcao deu bom"+frase);

  var nFrase = frase.split('');
  nFrase.forEach( function (caractere) {
    console.log(caractere);
    if(caractere != ' '){
      posicao = alfabeto.indexOf(caractere);
      posicaoN = (posicao - passo) % alfabeto.length;
      console.log("POsicao "+ caractere+" - "+ posicaoN);
      if(posicaoN < 0){
        // var n = Math.abs(posicaoN);
        // console.log(n);
        posicaoN = alfabeto.length - Math.abs(posicaoN);
      }
      
      if(posicao < 0){
        console.log("Aqui essa babaça" + caractere);
        box.push(caractere);
      }else{
        console.log("POsicao NNNN - "+ posicaoN);
        letraN = alfabeto[posicaoN];
        console.log("================="+passo+"=================");
        console.log(caractere + " - posicao antiga - "+ posicao);
        console.log("nova posição");
        console.log(caractere + " - posicao nova - "+ letraN);
        console.log("==================================");
        box.push(letraN);
      }
    }else {
      box.push(caractere);
    }
  });

  console.log('box - '+box.join(''));
  return nFrase.join('');

}


// for (var i = 0; i < frase.length; i++)
// {
//  if(frase[i] != ' ')
//  {
//    for (var j = 0; j < alfa.length; j++)
//    {
//      if (frase[i] == alfa[j])
//      {
//        keep[i] = alfa[(j + x) % alfa.length];
//        break;
//      }
//    }
//  }
//  else
//  {
//    keep[i] = ' ';
//  }
// }
// alert(keep.join(""));