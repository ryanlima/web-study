class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null ){
                return false
            }
        }
        return true
    }
}

class BD {

    constructor(){
//        let id = 
        //console.log(id)
        if(!localStorage.hasOwnProperty('id')){
            localStorage.setItem('id', 0)
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
        
    }

    gravar(d){
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }
}

let bd = new BD()


function cadastrarDespesa(){
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    //console.log(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)
    let despesa = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
    )

    if(despesa.validarDados()){
        bd.gravar(despesa)
        // dialog de sucesso
        exibeModal(
            'sucesso',
            'Despesa Salva Com Sucesso', 
            'Despesa foi cadastrada com sucesso!', 
            'Voltar')
        
    } else{
        //dialog de erro
        exibeModal(
            'erro',
            'Erro na Gravação', 
            'Existem campos obrigatórios que não foram preenchidos', 
            'Voltar e Corrigir')
    }
}

function exibeModal(tipo, titulo, descricao, descricao_button ){
    console.log(tipo, titulo, descricao, descricao_button )
    document.getElementById('modal_titulo').innerHTML = titulo
    document.getElementById('modal_body').innerHTML = descricao
    document.getElementById('modal_button').innerHTML = descricao_button
    if(tipo === 'sucesso'){
        document.getElementById('modal_button').className = 'btn btn-success'
        document.getElementById('modal_header').className = 'modal-header text-success'
    }else if(tipo === 'erro'){
        document.getElementById('modal_button').className = 'btn btn-danger'
        document.getElementById('modal_header').className = 'modal-header text-danger'
    }else{
        console.log('resultado não conhecido')
        return false
    }
    $('#modalRegistraDepesa').modal('show')
}
