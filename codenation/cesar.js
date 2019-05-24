exports.decode = function (frase, passo){
  var alfabeto = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  var frase = frase.toLowerCase();
  var box = [];
  var nFrase = frase.split('');

  nFrase.forEach( function (caractere) {
    posicao = alfabeto.indexOf(caractere);
    if(posicao < 0){
      box.push(caractere);
      return;
    }
    posicaoN = posicao - passo;
    if(posicaoN < 0){
      posicaoN = alfabeto.length - Math.abs(posicaoN);
    }
    console.log("====");
    letraN = alfabeto[posicaoN];
    box.push(letraN);
  });

  return box.join('');

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