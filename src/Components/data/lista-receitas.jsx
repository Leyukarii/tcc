export async function getReceitas(){

    let cadastros = [
        {
            id: '1', name: 'Nome A', cpf:'000.000.000-00',nomeMedico:"Doutor 01",CRM:"1515", data:'01/01/2024',local:'Campo Largo',
            itens:[
                {id:1, nomeRemedio:"Remédio 01",qtd:10,descricao:"descrição do remédio 1"},
                {id:2, nomeRemedio:"Remédio 02",qtd:5,descricao:"descrição do remédio 2"},
                {id:3, nomeRemedio:"Remédio 03",qtd:2,descricao:"descrição do remédio 3"},
                {id:4, nomeRemedio:"Remédio 03",qtd:2,descricao:"descrição do remédio 3"},
                {id:5, nomeRemedio:"Remédio 03",qtd:2,descricao:"descrição do remédio 3"},
                {id:6, nomeRemedio:"Remédio 03",qtd:2,descricao:"descrição do remédio 3"},
                {id:7, nomeRemedio:"Remédio 03",qtd:2,descricao:"descrição do remédio 3"},
                {id:8, nomeRemedio:"Remédio 01",qtd:10,descricao:"descrição do remédio 1"},
                {id:9, nomeRemedio:"Remédio 02",qtd:5,descricao:"descrição do remédio 2"},
                {id:10, nomeRemedio:"Remédio 03",qtd:2,descricao:"descrição do remédio 3"},
                
            ]
        },
        
    ]

    return cadastros
}
// {id: '2', name: 'Nome B', cpf:'000.000.000-00' , data:'01/01/2024'},
//         {id: '3', name: 'Nome C', cpf:'000.000.000-00' , data:'01/05/2024'},
//         {id: '4', name: 'Nome D', cpf:'000.000.000-00' , data:'01/01/2024'},
//         {id: '5', name: 'Nome E', cpf:'000.000.000-00' , data:'01/05/2024'},
//         {id: '6', name: 'Nome F', cpf:'000.000.000-00' , data:'01/01/2024'},
//         {id: '7', name: 'Nome G', cpf:'000.000.000-00' , data:'15/02/2024'},
//         {id: '9', name: 'Nome H', cpf:'000.000.000-00' , data:'01/01/2024'},
//         {id: '8', name: 'Nome I', cpf:'000.000.000-00' , data:'15/02/2024'},
//         {id: '10', name: 'Nome J', cpf:'000.000.000-00' , data:'01/05/2024'},
//         {id: '11', name: 'Nome K', cpf:'000.000.000-00' , data:'15/02/2024'},
//         {id: '12', name: 'Nome L', cpf:'000.000.000-00' , data:'15/02/2024'},
//         {id: '5', name: 'Nome E', cpf:'000.000.000-00' , data:'15/02/2024'},
//         {id: '6', name: 'Nome F', cpf:'000.000.000-00' , data:'15/02/2024'},
//         {id: '7', name: 'Nome G', cpf:'000.000.000-00' , data:'01/01/2024'},
//         {id: '9', name: 'Nome H', cpf:'000.000.000-00' , data:'15/02/2024'},
//         {id: '8', name: 'Nome I', cpf:'000.000.000-00' , data:'01/01/2024'},
//         {id: '10', name: 'Nome J', cpf:'000.000.000-00' , data:'15/02/2024'},
//         {id: '11', name: 'Nome K', cpf:'000.000.000-00' , data:'30/03/2024'},
//         {id: '12', name: 'Nome L', cpf:'000.000.000-00' , data:'30/03/2024'}