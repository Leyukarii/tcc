export async function getItensReceita(){

    let cadastros = [
        {id: '1', name: 'Medicamento A', descricao: 'Tomar de uma em uma hora' ,qtd:'10'  },
        {id: '2', name: 'Medicamento B', descricao: '10 gotas por dia', qtd:'10' },
    ]

    return cadastros
}

export async function addItensReceita(params) {
    
}