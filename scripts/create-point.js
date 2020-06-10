function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch ("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then ( res => res.json() ) //forma resumida da Arrow function que só pode ser usada quando tem apenas um valor
    .then ( states => {
        for ( const state of  states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
       
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city")
    const stateInput = document.querySelector("[name=state")

    const ufValue = event.target.value

    const indexOfSeletedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSeletedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then ( cities => {
        for ( const city of cities ){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

document
.querySelector("select[name= uf]")
.addEventListener("change", getCities)


//Itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", HandleSelectedItem)
}


const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function HandleSelectedItem(event){
    const itemLi = event.target

    //adicionar ou remover uma classe javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
    
    //verificar se existem itens selecionados e se sim por no array, se não remover

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId //isso será true or false
        return itemFound
    })

    //se já estiver selecionado
    if (alreadySelected >= 0) {
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId 
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }else {
        selectedItems.push (itemId)
    }

     //atualizar o campo escondido com os itens selecionados
     collectedItems.value = selectedItems
}



