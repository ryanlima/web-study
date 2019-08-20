class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null ) {
                return false
            }
        }
        return true
    }
}

class BD {

    constructor(){
        // let id = 
        let id = localStorage.getItem('id')
        //console.log(id)
        if(id === null){
            localStorage.setItem('id', 0)
        }
        // if(!localStorage.hasOwnProperty('id')){
        //     localStorage.setItem('id', 0)
        // }
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

    recuperarTodosRegistros(){

        // array de despesas 
        let despesas = Array()

        let id = localStorage.getItem('id')
        //recupera todas as despesas cadastradas em localStorage
        for(let i = 1; i <= id; i++){
            //recupera a despesa
            let despesa = JSON.parse(localStorage.getItem(i))

            //existe a possibilidade de haver indices que foram removidos
            // nestes casos nós vamos pular esses indices
            if(despesa === null){
                continue
            }
            console.log(i)
            despesa.id = i
            despesas.push(despesa)
        }

        return despesas
    }

    pesquisar(despesa){
        let despesasFiltradas = Array()
        
        despesasFiltradas = this.recuperarTodosRegistros()
       
        console.log(despesa)
        console.log(despesasFiltradas)
        //ano
        if(despesa.ano != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        //mes
        if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }
        //despesasFiltradas.filter(d => d.mes == despesa.mes)
        //dia
        if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }
        //tipo
        if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }
        //descricao
        if(despesa.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }
        //valor
        if(despesa.valor != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }
        return despesasFiltradas
    }

    remover(id){
        localStorage.removeItem(id)
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

    console.log(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)
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

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
        console.log('depois - '+ ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)            
        console.log('depois - '+ dia,descricao, valor)            
    } else{
        //dialog de erro
        exibeModal(
            'erro',
            'Erro na Gravação', 
            'Existem campos obrigatórios que não foram preenchidos', 
            'Voltar e Corrigir')
    }
}


function carregaListaDespesas(despesas = Array(), filtro = false){
    
    if(despesas.length == 0 && filtro == false){
        despesas = bd.recuperarTodosRegistros()
    }
    
    // <tr>
    //     <td>15/03/2018</td>
    //     <td>Alimentação</td>
    //     <td>Compras</td>
    //     <td>300</td>
    // </tr> 
    //pecorrer o array despesas, luistando cada despesa de forma dinâmica
    //selecionando elemento tbody
    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''
    despesas.forEach(function(d){
        //criando o tr
        var linha = listaDespesas.insertRow()

        linha.insertCell(0) .innerHTML = `${d.dia}/${d.mes}/${d.ano}` 
        //ajustar tipo
        switch(d.tipo){
            case '1': d.tipo = 'Alimentação'
                break
                case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
            break
            case '4': d.tipo = 'Saúde'
                break
                case '5': d.tipo = 'Transporte'
                break
            }
        // criar as colunas
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
        //criar botao de exclusão
        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function(){
            let id = this.id.replace('id_despesa_', '')
            bd.remover(id)
            window.location.reload()
            
            }
        linha.insertCell(4).append(btn)
        console.log(d)
    })
}

function pesquisarDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value
    
    let despesa = new Despesa(ano,mes,dia,tipo, descricao, valor)
    
    let despesas = bd.pesquisar(despesa)
    
    this.carregaListaDespesas(despesas, true)
}

function exibeModal(tipo, titulo, descricao, descricao_button ){
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